async function loadComponent(id, file) {
  const response = await fetch(file);
  const data = await response.text();
  document.getElementById(id).innerHTML = data;

  if (id === "common-header") {
    adjustNavLinks();
    setActiveNav();
  }

  if (id === "common-footer") {
    setYear();
  }
}

function getNavPrefix() {
  const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
  if (path.includes("/grammar/") || path.includes("/practice/") || path.includes("/vocabulary/") || path.includes("/site/")) {
    return "../";
  }
  return "";
}

function getIncludePrefix() {
  const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
  if (path.includes("/grammar/") || path.includes("/practice/") || path.includes("/vocabulary/") || path.includes("/site/")) {
    return "../";
  }
  return "";
}

function adjustNavLinks() {
  const prefix = getNavPrefix();
  if (!prefix) {
    return;
  }

  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("/") || href.startsWith("http") || href.startsWith("./") || href.startsWith("../")) {
      return;
    }
    link.setAttribute("href", prefix + href);
  });
}

function setActiveNav() {
  const current = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const target = href.split("/").pop();
    if (target === current || (current === "" && target === "index.html")) {
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

loadComponent("common-header", getIncludePrefix() + "includes/header.html");
loadComponent("common-footer", getIncludePrefix() + "includes/footer.html");
