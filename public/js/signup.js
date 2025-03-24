const signupForm = document.querySelector(".signup_form form");

async function signup(name, email, pass, passConfirm) {
  const response = await fetch("http://127.0.0.1:8000/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password: pass,
      passwordConfirm: passConfirm,
    }),
  });

  const data = await response.json();
  return data.status;
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector(".signup_name");
  const email = document.querySelector(".signup_email");
  const pass = document.querySelector(".signup_pass");
  const passConfirm = document.querySelector(".signup_pass_confirm");

  const status = await signup(
    name.value,
    email.value,
    pass.value,
    passConfirm.value
  );
  if (status === "success") {
    window.location.href = "http://127.0.0.1:8000/";
  } else console.log("Invalid login...");

  pass.value = "";
  passConfirm.value = "";
});
