$(document).ready(() => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const storedLabels = JSON.parse(localStorage.getItem("incomeLabels")) || [];
  const storedData = JSON.parse(localStorage.getItem("incomeData")) || [];
  let totalExpense = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  let totalIncome = storedData.reduce((a, b) => a + b, 0);

  $("#total-expense").text(`$${totalExpense}`);
  $("#total-income").text(`$${totalIncome}`);
  $("#remainder").text(`$${totalIncome - totalExpense}`);
  const initialColors = [
    "rgba(97, 103, 122, 1)",
    "rgba(216, 217, 218, 1)",
    "rgba(185, 212, 241, 1)",
  ];
  new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: ["Total Expense", "Total income", "Remainder"],
      datasets: [
        {
          label: "Amount ($) ",
          backgroundColor: initialColors,
          data: [totalExpense, totalIncome, totalIncome - totalExpense],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Amount in $",
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        aspectRatio: 1,
      },
    },
  });
});
