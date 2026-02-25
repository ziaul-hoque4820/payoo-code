import { getBalance, getValueFromInput, setBalance } from "./utils.js";

document.getElementById('pay-bill-btn').addEventListener('click', (event) => {
    event.preventDefault();

    // 1. Get all input values
    const billerTarget = getValueFromInput("pay-bill-target");
    const billerNumber = getValueFromInput("pay-bill-number").trim();
    const amountStr = getValueFromInput("pay-bill-amount").trim();
    const pin = getValueFromInput("pay-bill-pin").trim();

    // 2. Check if any field is empty or bank is not selected
    if (billerTarget === "Select back" || !billerNumber || !amountStr || !pin) {
        alert("Please fill in all inputs correctly and select a biller.");
        return;
    }

    // 3. Validate Account Number and Pin length
    if (billerNumber.length !== 11 || pin.length !== 4) {
        alert("Biller Account Number must be 11 characters and Pin must be 4 digits.");
        return;
    }

    // 4. Validate Amount and Balance
    const amount = parseFloat(amountStr);
    const currentBalance = getBalance();

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    if (amount > currentBalance) {
        alert("You do not have enough balance to pay this bill.");
        return;
    }

});
