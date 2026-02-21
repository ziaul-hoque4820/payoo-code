import { getBalance, getValueFromInput } from "./utils.js";

document.getElementById("sendmoney-btn").addEventListener('click', (event) => {
    event.preventDefault();

    // 1. get all input value
    const userAccNumber = getValueFromInput('sendmoney-number').trim();
    const amountStr = getValueFromInput("sendmoney-number").trim();
    const pin = getValueFromInput("sendmoney-pin").trim();

    // 2. check all input required
    if (!userAccNumber || !amountStr || !pin) {
        alert("Please fill in all inputs correctly.");
        return;
    }

    // 3. agent number and pin length valid
    if (userAccNumber.length !== 11 || pin.length !== 4) {
        alert("User Number must be 11 characters and Pin must be 4 digits.");
        return;
    }

    // 4. valid amount 
    const amount = parseFloat(amountStr);
    const currentBalance = getBalance();
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.")
        return;
    }

    if (amount > currentBalance) {
        alert("You do not have enough balance.")
        return;
    }
})