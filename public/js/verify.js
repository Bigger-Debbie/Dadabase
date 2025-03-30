const container = document.querySelector(".verify_container");
const email = container.getAttribute("email");
const verifyNum = container.getAttribute("verification");

async function verify(email, verifyNum) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/verify/${verifyNum}/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

(async () => {
  const verfStatus = await verify(email, verifyNum);
  if (verfStatus.status === "success") {
    document.querySelector(".verify_container p").innerText =
      "Email Verified Successfully - Redirecting...";

    setTimeout(() => {
      window.location.href = "http://127.0.0.1:8000/";
    }, 3000);
  }
})();
