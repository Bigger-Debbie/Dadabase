const login_form = document.querySelector(".login_form form");
const forgot_btn = document.querySelector(".login_submition a");
const submit_btn = document.querySelector(".login_submit");
const vert_div = login_form.querySelector(".vert__divider");
let forgot = false;

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

async function forgotPassword(email) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/user/forgotPassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  // Parse the JSON response
  const data = await response.json();
  return data.status;
}

login_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector(".login_email");
  const pass = document.querySelector(".login_pass");

  if (forgot) {
    const status = await forgotPassword(email.value);
    const text = document.querySelector(".status");

    vert_div.style.display = "block";
    text.style.display = "block";

    if (status === "success") {
      text.innerText = "Email Sent";
    } else {
      text.innerText = "No Account Found";
    }
  } else {
    const status = await login(email.value, pass.value);
    if (status === "success") {
      window.location.href = "http://127.0.0.1:8000/";
    } else console.log("Invalid login...");

    pass.value = "";
  }
});

forgot_btn.addEventListener("click", (e) => {
  const pass_label = login_form.querySelector(".pass_label");
  const pass = login_form.querySelector(".login_pass");

  pass_label.style.display = "none";
  pass.style.display = "none";
  pass.removeAttribute("required");
  forgot_btn.style.display = "none";
  vert_div.style.display = "none";
  submit_btn.value = "Send Email";
  forgot = true;
});
