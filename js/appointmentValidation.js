document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const errorDiv = document.getElementById('formErrors');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorDiv.innerHTML = '';
        let errors = [];

        // Validate First Name and Last Name
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        if (firstName === '') errors.push('First Name is required');
        if (lastName === '') errors.push('Last Name is required');

        // Validate Date of Birth
        const dob = document.getElementById('dob').value;
        if (dob === '') errors.push('Date of Birth is required');

        // Validate Gender
        const gender = document.getElementById('gender').value;
        if (gender === '') errors.push('Please select a Gender');

        // Validate Phone Number
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) errors.push('Please enter a valid phone number in the format (000) 000-0000');

        // Validate Email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) errors.push('Please enter a valid email address');

        // Validate Applied Before
        const appliedBefore = document.querySelector('input[name="applied_before"]:checked');
        if (!appliedBefore) errors.push('Please indicate if you have applied before');

        // Validate Department
        const department = document.getElementById('department').value.trim();
        if (department === '') errors.push('Department is required');

        // Validate Procedure
        const procedure = document.getElementById('procedure').value;
        if (procedure === '') errors.push('Please select a Procedure');

        // Validate Appointment Date
        const appointmentDate = document.getElementById('appointmentDate').value;
        if (appointmentDate === '') errors.push('Preferred Appointment Date is required');

        // Display errors or submit form
        if (errors.length > 0) {
            errors.forEach(error => {
                const errorP = document.createElement('p');
                errorP.textContent = error;
                errorDiv.appendChild(errorP);
            });
        } else {
            alert('Form submitted successfully!');
            form.submit();
        }
    });
});
