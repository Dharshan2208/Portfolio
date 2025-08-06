document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Modal logic
  const contactModal = document.getElementById("contactModal");
  const openModalBtn = document.querySelector(".contact-button");
  const closeModalBtn = document.getElementById("closeModal");

  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
  });

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

  // Form input validation events
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  // Now using formsubmit so not required
  // form.addEventListener("click", function (event) {
  //   if (event.target.classList.contains("button")) {
  //     event.preventDefault();

  //     const isNameValid = validateName();
  //     const isEmailValid = validateEmail();
  //     const isMessageValid = validateMessage();

  //     if (isNameValid && isEmailValid && isMessageValid) {
  //       alert("Message sent successfully!");
  //       form.reset();
  //       clearErrors();
  //     }
  //   }
  // });

  // Submit with FormSubmit + custom popup
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      const formData = new FormData(form);

      fetch("https://formsubmit.co/ajax/d0c001615bc1f3f217ebeb458fb4f604", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            showPopup();
            form.reset();
            clearErrors();
          } else {
            alert("Failed to send. Please try again later.");
          }
        })
        .catch(() => {
          alert("Failed to send. Please check your connection.");
        });
    }
  });

  // Success popup
  function showPopup() {
    const popup = document.getElementById("successPopup");
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }

  // Validation + error highlighting
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

  function clearErrors() {
    const formGroups = form.querySelectorAll(".form-group");
    formGroups.forEach((group) => {
      group.classList.remove("error");
    });
  }
});
