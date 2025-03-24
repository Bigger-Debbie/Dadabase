const reset_form = document.querySelector(".login_form form");
const token = reset_form
  .querySelector(".login_submit")
  .getAttribute("data-token");

async function resetPassword(pass, passConfirm) {
  console.log(`http://127.0.0.1:8000/api/user/resetPassword/${token}`);
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/resetPassword/${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: pass,
        passwordConfirm: passConfirm,
      }),
    }
  );
  console.log(response);

  // Parse the JSON response
  const data = await response.json();
  return data.status;
}

reset_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pass = reset_form.querySelector(".login_pass");
  const passConfirm = reset_form.querySelector(".login_pass_confirm");
  const status = await resetPassword(pass.value, passConfirm.value);

  if (status === "success") {
    window.location.href = "http://127.0.0.1:8000/";
  } else console.log("Invalid login...");

  pass.value = "";
  passConfirm.value = "";
});
