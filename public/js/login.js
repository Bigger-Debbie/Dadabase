const login_form = document.querySelector(".login_form form");

async function login(email, pass) {
  const response = await fetch("http://127.0.0.1:8000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: pass,
    }),
  });

  // Parse the JSON response
  const data = await response.json();
  return data.status;
}

login_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector(".login_email");
  const pass = document.querySelector(".login_pass");

  const status = await login(email.value, pass.value);
  if (status === "success") {
    window.location.href = "http://127.0.0.1:8000/";
  } else console.log("Invalid login...");

  pass.value = "";
});
