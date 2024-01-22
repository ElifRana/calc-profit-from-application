import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
    calcProfit,
    income,
    expense,
} from './calcProfit';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      //text: 'Chart.js Line Chart',
    },
  },
};

export default function App() {
    const [purchaseRatio, setPurchaseRatio] = useState(0.05);
    const [startExpense, setStartExpense] = useState(185);
    const [advertising, setAdvertising] = useState(60);
    const [inAppPurchase, setInAppPurchase] = useState(5);
    const [i, setI] = useState(0.035);
    const [userRatio, setUserRatio] = useState(0.7);

    const profitPeriod = calcProfit(1, purchaseRatio, startExpense, advertising, inAppPurchase, i, userRatio);

    const labels = new Array(profitPeriod + 5).fill().map((x, i) => i+1);

    const incomeAndExpense = {
      labels,
      datasets: [
        {
          label: 'Gider',
          data: labels.map(period => expense(advertising, i, period, startExpense)),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Gelir',
          data: labels.map(period => income(advertising, purchaseRatio, inAppPurchase, i, period)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    const total = {
      labels,
      datasets: [
        {
          label: 'Kazanç',
          data: labels.map(period => income(advertising, purchaseRatio, inAppPurchase, i, period) - expense(advertising, i, period, startExpense)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };

    const interestVsTrading = {
      labels,
      datasets: [
        {
          label: 'Kazanç',
          data: labels.map(period => income(advertising, purchaseRatio, inAppPurchase, i, period) - expense(advertising, i, period, startExpense)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Faiz\'e Yatırılsaydı',
          data: labels.map(period => startExpense * Math.pow(1+i/12, period) + advertising * (Math.pow(1+i/12, period) - 1) / (i/12)),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    };

    const userCount = {
      labels,
      datasets: [
        {
          label: 'Kullanıcı Sayısı',
          data: labels.map(period => userRatio * advertising * period),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };

    return (
        <div className='container pt-5'>
            <p className="mt-5 mb-5 alert alert-primary">
              Bu site ile herhangi bir "uygulama içi satım" yapan uygulamaların satış kazanç senaryosu yapılabilir.
            </p>
            
            <div className="row">
                <div className="col-4">
                  <div class="mb-3">
                    <label class="form-label">Başlangıç Maliyeti</label>
                    <input
                        defaultValue={startExpense}
                        onChange={(e) => parseFloat(e.target.value) > 0 ? setStartExpense(parseFloat(e.target.value)) : void(0)}
                        class="form-control"/>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Verilen reklama göre o ay uygulama için satın alım yapan kullanıcı oranı</label>
                    <input
                        class="form-control"
                        defaultValue={purchaseRatio}
                        onChange={(e) => parseFloat(e.target.value) > 0.009 ? setPurchaseRatio(parseFloat(e.target.value)) : void(0)}/>
                  </div>
                </div>
                <div className="col-4">
                  <div class="mb-3">
                    <label class="form-label">Aylık verilen reklam ücreti</label>
                    <input
                        class="form-control"
                        defaultValue={advertising}
                        onChange={(e) => parseFloat(e.target.value) > 0 ? setAdvertising(parseFloat(e.target.value)) : void(0)}/>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Uygulama içerisinde satılacak ürünün fiyatı</label>
                    <input
                        defaultValue={inAppPurchase}
                        onChange={(e) => parseFloat(e.target.value) > 0 ? setInAppPurchase(parseFloat(e.target.value)) : void(0)}
                        class="form-control"/>
                  </div>
                </div>
                <div className="col-4">
                  <div class="mb-3">
                    <label class="form-label">Yıllık banka faizi</label>
                    <input
                        class="form-control"
                        defaultValue={i}
                        onChange={(e) => parseFloat(e.target.value) > 0.001 ? setI(parseFloat(e.target.value)) : void(0)}/>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Verilen reklama göre o ay indiren kullanıcı oranı</label>
                    <input
                        defaultValue={userRatio}
                        onChange={(e) => parseFloat(e.target.value) > 0.01 ? setUserRatio(parseFloat(e.target.value)) : void(0)}
                        class="form-control"/>
                  </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <div className="card">
                    <div class="card-body">
                      <h5 className="card-title">
                       Gelir ve Gider
                      </h5>
                    </div>
                    <div className="card-text">
                      <Line options={options} data={incomeAndExpense} />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <div className="card">
                    <div class="card-body">
                      <h5 className="card-title">
                        Kazanç
                      </h5>
                      <div className="card-text">
                        <Line options={options} data={total} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <div className="card">
                    <div class="card-body">
                      <h5 className="card-title">
                        Kazanç Bar
                      </h5>
                      <div className="card-text">
                        <Bar options={options} data={total} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <div className="card">
                    <div class="card-body">
                      <h5 className="card-title">
                        Faiz ile karşılaştırması
                      </h5>
                      <div className="card-text">
                        <Line options={options} data={interestVsTrading} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <div className="card">
                    <div class="card-body">
                      <h5 className="card-title">
                        Kullanıcı Sayısı
                      </h5>
                      <div className="card-text">
                        <Line options={options} data={userCount} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <nav class="navbar bg-light">
              <div class="container-fluid">
                Bu site 2022 - Mühendislik Ekonomisi dersi için yapılmıştır. Emeği geçenler:
                <a href="https://github.com/ElifRana">Elif Rana YILANCI</a>
                <a href="https://github.com/abdurrahmanekr">Abdurrahman Eker</a>
              </div>
            </nav>
        </div>
    );
}
