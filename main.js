document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
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

  // Form validation
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  form.addEventListener("click", function (event) {
    if (event.target.classList.contains("button")) {
      event.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        alert("Message sent successfully!"); // Replace with actual submission logic
        form.reset();
        clearErrors();
      }
    }
  });

  function clearErrors() {
    const formGroups = form.querySelectorAll(".form-group");
    formGroups.forEach((group) => {
      group.classList.remove("error");
    });
  }

  function validateName() {
    const nameValue = nameInput.value.trim();
    const formGroup = nameInput.parentElement;

    if (nameValue.length < 4) {
      formGroup.classList.add("error");
      return false;
    } else {
      formGroup.classList.remove("error");
      return true;
    }
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const formGroup = emailInput.parentElement;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      formGroup.classList.add("error");
      return false;
    } else {
      formGroup.classList.remove("error");
      return true;
    }
  }

  function validateMessage() {
    const messageValue = messageInput.value.trim();
    const formGroup = messageInput.parentElement;
    const wordCount = messageValue
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    if (wordCount < 10) {
      formGroup.classList.add("error");
      return false;
    } else {
      formGroup.classList.remove("error");
      return true;
    }
  }
});
