$(document).ready(function () {
  const transactionForm = $("#transactionForm");
  const transactionTableBody = $("#transactionTableBody");
  let transactionCounter = 1;

  // Retrieve salary and transactions from local storage or initialize them
  let initialSalary = localStorage.getItem("initialSalary") || 0;
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Mock initial data for the chart
  let reportData = {
    labels: transactions.map((transaction) => transaction.description),
    datasets: [
      {
        label: "Monthly Expenses",
        data: transactions.map((transaction) => transaction.amount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Create a bar chart
  const ctx = $("#myChart")[0].getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: reportData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Update the current budget
  updateCurrentBudget();

  // Event listener for salary form
  $("#salaryForm").on("submit", function (event) {
    event.preventDefault();
    initialSalary = $("#salary").val();
    localStorage.setItem("initialSalary", initialSalary);
    updateCurrentBudget();
  });

  // Event listener for transaction form
  transactionForm.on("submit", function (event) {
    event.preventDefault();

    const amount = $("#amount").val();
    const description = $("#description").val();

    if (amount && description) {
      // Update transactions
      const newTransaction = { amount: Number(amount), description };
      transactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      // Update the data for the chart
      reportData.labels.push(description);
      reportData.datasets[0].data.push(Number(amount));

      // Update the chart
      myChart.update();

      const newRow = $("<tr>").html(`
          <th scope="row">${transactionCounter}</th>
          <td>${amount}</td>
          <td>${description}</td>
          <td>
            <button type="button" class="btn btn-danger btn-sm remove-button">Remove</button>
          </td>
        `);

      // Increment the transaction counter
      transactionCounter++;

      // Append the new row to the table
      transactionTableBody.append(newRow);

      // Clear the form fields
      transactionForm[0].reset();

      // Update the current budget
      updateCurrentBudget();
    }
  });

  // Event listener for remove button
  $(document).on("click", ".remove-button", function () {
    const row = $(this).closest("tr");
    const index = row.index();

    // Remove data from transactions and update local storage
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Remove data from the chart
    reportData.labels.splice(index, 1);
    reportData.datasets[0].data.splice(index, 1);

    // Update the chart
    myChart.update();

    row.remove();

    // Update the current budget
    updateCurrentBudget();
  });

  // Function to update the current budget
  function updateCurrentBudget() {
    const totalExpenses = transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    const currentBudget = initialSalary - totalExpenses;
    $("#currentBudget").text(currentBudget);
  }

  // Load initial transactions to the table
  transactions.forEach((transaction) => {
    const newRow = $("<tr>").html(`
        <th scope="row">${transactionCounter}</th>
        <td>${transaction.amount}</td>
        <td>${transaction.description}</td>
        <td>
          <button type="button" class="btn btn-danger btn-sm remove-button">Remove</button>
        </td>
      `);

    // Increment the transaction counter
    transactionCounter++;

    // Append the new row to the table
    transactionTableBody.append(newRow);
  });
});
