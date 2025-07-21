// script.js

// OTP Generation and Order Confirmation Logic
document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const otpInput = document.getElementById("otp");
    const generateOTPButton = document.getElementById("generateOTP");
    const confirmOrderButton = document.getElementById("confirmOrder");
    const confirmationMessage = document.getElementById("confirmationMessage");
    let generatedOTP = "";

    // Generate OTP
    generateOTPButton.addEventListener("click", function () {
        generatedOTP = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
        alert(`Your OTP is: ${generatedOTP}`);
        otpInput.disabled = false;
        confirmOrderButton.disabled = false;
    });

    // Confirm Order
    document.getElementById("orderForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const enteredOTP = otpInput.value;

        if (enteredOTP === generatedOTP) {
            confirmationMessage.classList.add("visible");
            document.getElementById("orderForm").reset();
            otpInput.disabled = true;
            confirmOrderButton.disabled = true;
        } else {
            alert("Invalid OTP. Please try again.");
        }
    });
});