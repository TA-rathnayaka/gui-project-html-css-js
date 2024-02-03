$(document).ready(() => {
  const storedLabels = JSON.parse(localStorage.getItem("incomeLabels")) || [];
  const storedData = JSON.parse(localStorage.getItem("incomeData")) || [];
  const initialColors = [
    "rgba(97, 103, 122, 1)",
    "rgba(216, 217, 218, 1)",
    "rgba(185, 212, 241, 1)",
  ];

  incomeChart = new Chart($("#myChart"), {
    type: "bar",
    data: {
      labels: storedLabels,
      datasets: [
        {
          data: storedData,
          backgroundColor: initialColors,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  });

  const incomeForm = $("#incomeForm");
  const incomeTableBody = $("#incomeTableBody");

  const updateTableFromStorage = () => {
    incomeTableBody.empty();
    storedLabels.forEach((label, i) => {
      const newRow = `<tr>
                        <th scope="row">${i + 1}</th>
                        <td>${storedData[i]}</td>
                        <td>${label}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="removeEntry(${i})">Remove</button></td>
                      </tr>`;
      incomeTableBody.append(newRow);
    });
  };

  updateTableFromStorage();

  incomeForm.on("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat($("#income-amount").val());
    const source = $("#income-source").val();

    if (!incomeChart.data.labels.includes(source)) {
      incomeChart.data.labels.push(source);
      incomeChart.data.datasets[0].data.push(amount);
    } else {
      let index = incomeChart.data.labels.indexOf(source);
      let existingAmount = incomeChart.data.datasets[0].data[index];
      let updatedAmount = parseInt(existingAmount) + parseInt(amount);

      incomeChart.data.datasets[0].data[index] = updatedAmount;
    }

    const newRow = `<tr>
                      <th scope="row">${incomeChart.data.labels.length}</th>
                      <td>${amount}</td>
                      <td>${source}</td>
                      <td><button class="btn btn-danger btn-sm" onclick="removeEntry(${
                        incomeChart.data.labels.length - 1
                      })">Remove</button></td>
                    </tr>`;
    incomeTableBody.append(newRow);

    localStorage.setItem(
      "incomeLabels",
      JSON.stringify(incomeChart.data.labels)
    );
    localStorage.setItem(
      "incomeData",
      JSON.stringify(incomeChart.data.datasets[0].data)
    );

    incomeChart.update();
  });

  window.removeEntry = (index) => {
    incomeChart.data.labels.splice(index, 1);
    incomeChart.data.datasets[0].data.splice(index, 1);

    localStorage.setItem(
      "incomeLabels",
      JSON.stringify(incomeChart.data.labels)
    );
    localStorage.setItem(
      "incomeData",
      JSON.stringify(incomeChart.data.datasets[0].data)
    );

    updateTableFromStorage();

    incomeChart.update();
  };
});
