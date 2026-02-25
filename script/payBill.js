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

    // 5. Pin verification and Balance update
    if (pin === "1234") {
        const newBalance = currentBalance - amount;
        setBalance(newBalance);

        alert(`Success! Your ${billerTarget} bill of ${amount} TK has been paid.`);

        // 6. Reset input fields after successful payment
        document.getElementById('pay-bill-number').value = "";
        document.getElementById('pay-bill-amount').value = "";
        document.getElementById('pay-bill-pin').value = "";
        document.getElementById('pay-bill-target').selectedIndex = 0; // Reset Select box
    } else {
        alert("Invalid Pin Number!");
    }

});
