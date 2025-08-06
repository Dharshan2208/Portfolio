document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    mobileMenuToggle.textContent = mobileMenu.classList.contains("active")
      ? "✕"
      : "☰";
    mobileMenuToggle.setAttribute(
      "aria-expanded",
      mobileMenu.classList.contains("active")
    );
  });
});
