$(document).ready(function () {
  const form = $("#login-form");

  form.on("submit", function (event) {
    if (form[0].checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.addClass("was-validated");
  });

  // Reset validation classes on input change
  form.find("input").on("input", function () {
    $(this).removeClass("is-invalid is-valid");
    form.removeClass("was-validated");
  });
});
