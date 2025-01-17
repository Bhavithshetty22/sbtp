<script>
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.querySelector("form");
        const emailInput = form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[name="password"]');
        const confirmPasswordInput = form.querySelector('input[name="confirm_password"]');

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting by default

            const email = emailInput.value.trim(); // Trim to remove any whitespace
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Email validation
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return; // Stop form submission if validation fails
            }

            // Password validation
            if (!validatePassword(password)) {
                alert("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
                return; // Stop form submission if validation fails
            }

            // Confirm password validation
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please confirm your password.");
                return; // Stop form submission if passwords do not match
            }

            // Store data in localStorage (or send it to the server)
            const userData = {
                first_name: form.querySelector('input[name="first_name"]').value.trim(),
                last_name: form.querySelector('input[name="last_name"]').value.trim(),
                username: form.querySelector('input[name="username"]').value.trim(),
                email: email,
                password: password
            };

            // Store user data in localStorage (for demonstration purposes)
            localStorage.setItem("userData", JSON.stringify(userData));

            alert("Registration successful!");

            // Optionally, redirect to another page or reset form fields
            form.reset();
        });

        // Function to validate email format
        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        // Function to validate password format
        function validatePassword(password) {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return passwordPattern.test(password);
        }
    });
</script>

