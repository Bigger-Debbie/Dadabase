const send_req = document.querySelector(".send_req");
const categories = [
  {
    arrow: document.querySelector(".auth ion-icon"),
    content: document.querySelector(".auth_content"),
    isOpen: false,
  },
  {
    arrow: document.querySelector(".jokes ion-icon"),
    content: document.querySelector(".jokes_content"),
    isOpen: false,
  },
  {
    arrow: document.querySelector(".admin ion-icon"),
    content: document.querySelector(".admin_content"),
    isOpen: false,
  },
];

// Add new endpoints array
const endpoints = [
  {
    arrow: document.querySelector(".sign_up ion-icon"),
    content: document.querySelector(".sign_up_endpoint"),
    isOpen: false,
  },
  {
    arrow: document.querySelector(".login ion-icon"),
    content: document.querySelector(".login_endpoint"),
    isOpen: false,
  },
  {
    arrow: document.querySelector(".forgot ion-icon"),
    content: document.querySelector(".forgot_endpoint"),
    isOpen: false,
  },
  {
    arrow: document.querySelector(".reset ion-icon"),
    content: document.querySelector(".reset_endpoint"),
    isOpen: false,
  },
];

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

function toggleCategory(category) {
  categories.forEach((cat) => {
    if (cat !== category) {
      cat.arrow.style.transform = "rotate(0deg)";
      cat.content.style.display = "none";
      cat.isOpen = false;
    }
  });

  if (category.isOpen) {
    category.arrow.style.transform = "rotate(0deg)";
    category.content.style.display = "none";
    category.isOpen = false;
  } else {
    category.arrow.style.transform = "rotate(90deg)";
    category.content.style.display = "flex";
    category.isOpen = true;
  }
}

// Modify the toggle function for endpoints to allow multiple open at once
function toggleEndpoint(endpoint) {
  if (endpoint.isOpen) {
    endpoint.arrow.style.transform = "rotate(0deg)";
    endpoint.content.style.display = "none";
    endpoint.isOpen = false;
  } else {
    endpoint.arrow.style.transform = "rotate(90deg)";
    endpoint.content.style.display = "flex";
    endpoint.isOpen = true;
  }
}

send_req.addEventListener("click", async (e) => {
  e.preventDefault();

  const joke = await getJoke();
  const response = document.querySelector(".response_container pre code");

  response.textContent = JSON.stringify(joke, null, 2);
});

categories.forEach((category) => {
  category.arrow.addEventListener("click", (e) => {
    e.preventDefault();
    toggleCategory(category);
  });
});

// Add new event listeners for endpoints
endpoints.forEach((endpoint) => {
  if (endpoint.arrow) {
    // Check if arrow exists before adding listener
    endpoint.arrow.addEventListener("click", (e) => {
      e.preventDefault();
      toggleEndpoint(endpoint);
    });
  }
});
