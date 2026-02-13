async function loadComponent(id, file) {
  const response = await fetch(file);
  const data = await response.text();
  document.getElementById(id).innerHTML = data;

  if (id === "common-header") {
    setActiveNav();
  }

  if (id === "common-footer") {
    setYear();
  }
}

function setActiveNav() {
  const current = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}

function setYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

loadComponent("common-header", "includes/header.html");
loadComponent("common-footer", "includes/footer.html");
