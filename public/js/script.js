const send_req = document.querySelector(".send_req");

async function getJoke() {
  const response = await fetch("http://127.0.0.1:8000/api/joke", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Parse the JSON response
  const data = await response.json();
  return data;
}

send_req.addEventListener("click", async (e) => {
  e.preventDefault();

  const joke = await getJoke();
  const response = document.querySelector(".response_container pre code");

  response.textContent = JSON.stringify(joke, null, 2);
});
