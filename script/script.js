document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const loanAmountInput = document.getElementById('loan-amount');
    const loanTermInput = document.getElementById('loan-term');
    const fileInputs = document.querySelectorAll('input[type="file"]');

    // 1. Configuration for Validation
    const MAX_FILE_SIZE_MB = 10; // Limit files to 10MB each

    form.addEventListener('submit', (event) => {
        let isValid = true;
        let errorMessage = "";

        // 2. Validate Loan Amount (Must be greater than 0)
        if (parseFloat(loanAmountInput.value) <= 0) {
            isValid = false;
            errorMessage += "Requested Loan Amount must be greater than $0.\n";
            loanAmountInput.style.borderColor = "red";
        } else {
            loanAmountInput.style.borderColor = "";
        }

        // 3. Validate Loan Term (Must be at least 1 month)
        if (parseInt(loanTermInput.value) <= 0) {
            isValid = false;
            errorMessage += "Loan Term must be at least 1 month.\n";
            loanTermInput.style.borderColor = "red";
        } else {
            loanTermInput.style.borderColor = "";
        }

        // 4. File Validation (Size check)
        fileInputs.forEach(input => {
            const files = input.files;
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                    isValid = false;
                    errorMessage += `File "${files[i].name}" exceeds the ${MAX_FILE_SIZE_MB}MB limit.\n`;
                }
            }
        });

        // 5. Final Decision
        if (!isValid) {
            event.preventDefault(); // Stop form submission
            alert("Please correct the following errors:\n\n" + errorMessage);
        } else {
            // Optional: Change button state to show "Processing"
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.textContent = "Processing Application...";
            submitBtn.disabled = true;
        }
    });

    // 6. Real-time feedback for file selection
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileCount = this.files.length;
            const helpText = this.parentElement.querySelector('.file-help');
            
            if (fileCount > 0 && helpText) {
                helpText.textContent = `${fileCount} file(s) selected`;
                helpText.style.color = "green";
            }
        });
    });
});