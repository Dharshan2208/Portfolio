document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            form.reset();
            clearErrors();
        }
    });

    function clearErrors() {
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
    }

    function validateName() {
        const nameValue = nameInput.value.trim();
        const formGroup = nameInput.parentElement;

        if (nameValue.length < 3) {
            formGroup.classList.add('error');
            return false;
        } else {
            formGroup.classList.remove('error');
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const formGroup = emailInput.parentElement;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            formGroup.classList.add('error');
            return false;
        } else {
            formGroup.classList.remove('error');
            return true;
        }
    }

    function validateMessage() {
        const messageValue = messageInput.value.trim();
        const formGroup = messageInput.parentElement;

        if (messageValue.length < 10) {
            formGroup.classList.add('error');
            return false;
        } else {
            formGroup.classList.remove('error');
            return true;
        }
    }
});
