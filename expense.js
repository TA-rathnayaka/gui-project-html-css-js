$(document).ready(() => {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const form = $("#transactionForm");
  const transactionTableBody = $("#transactionTableBody");

  let transactionCounter = 1;
  form.on("submit", function (event) {
    event.preventDefault();

    const amount = $("#amount").val();
    const description = $("#description").val();

    if (amount && description) {
      const newRow = $("<tr>").html(`
    <th scope="row">${transactionCounter}</th>
    <td>${amount}</td>
    <td>${description}</td>
    <td>
      <button type="button" class="btn btn-danger btn-sm remove-button">Remove</button>
    </td>
  `);
      transactionCounter++;
      transactionTableBody.append(newRow);

      form[0].reset();

      const newTransaction = {
        amount: Number(amount),
        description: description,
      };
      transactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  });

  $(document).on("click", ".remove-button", function () {
    const row = $(this).closest("tr");
    const index = row.index();

    row.remove();

    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  });

  transactions.forEach((transaction) => {
    const newRow = $("<tr>").html(`
        <th scope="row">${transactionCounter}</th>
        <td>${transaction.amount}</td>
        <td>${transaction.description}</td>
        <td>
          <button type="button" class="btn btn-danger btn-sm remove-button">Remove</button>
        </td>
      `);

    transactionCounter++;
    transactionTableBody.append(newRow);
  });
});
