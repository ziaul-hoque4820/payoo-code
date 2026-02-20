import { getBalance, getValueFromInput } from "./utils.js";

document.getElementById("cashout-btn").addEventListener('click', (event) => {
    event.preventDefault();

    // 1. get all input value
    const agentNumber = getValueFromInput("cashout-number").trim();
    const amountStr = getValueFromInput("cashout-amount").trim();
    const pin = getValueFromInput("cashout-pin").trim();

    // 2. check all input required
    if (!agentNumber || !amountStr || !pin) {
        alert("Please fill in all inputs correctly.");
        return;
    }

    // 3. agent number and pin length valid
    if (agentNumber !== 11 || pin !== 4) {
        alert("Agent Number must be 11 characters and Pin must be 4 digits.");
        return;
    }

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