export const income = (advertising, purchaseRatio, inAppPurchase, i, n) => advertising * purchaseRatio * inAppPurchase * (n*(n+1)/2) / Math.pow(1 + i/12, n);
export const expense = (advertising, i, n, startExpense) => advertising * (Math.pow(1 + i/12, n) - 1) / (Math.pow(1 + i/12, n) * i/12) + startExpense;

export function calcProfit(n = 1, purchaseRatio = 0.05, startExpense = 185, advertising = 60, inAppPurchase = 5, i = 0.035, userRatio = 0.7) {
    const incomeData = income(advertising, purchaseRatio, inAppPurchase, i, n)
    const expenseData = expense(advertising, i, n, startExpense);

    console.log(
        'Total Income:', incomeData.toFixed(2),
        'Total Epense:', expenseData.toFixed(2),
        'You are in the ' + n + 'th month.',
        'Total User Count:', advertising * userRatio * n,
    );

    if (incomeData >= expenseData) {
        return n;
    }

    return calcProfit(n + 1, purchaseRatio, startExpense, advertising, inAppPurchase, i, userRatio);
}
