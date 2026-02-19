import { getValueFromInput } from "./utils.js";

document.getElementById('add-money-btn').addEventListener('click', (event) => {
    event.preventDefault();
    // 1. get bank account 
    const bankAccount = getValueFromInput("add-money-bank");
    console.log(bankAccount);

    // 2. get bank account number
    const accno = getValueFromInput("add-money-number").trim();
    console.log(accno);

    // 3. get add amount
    const amountStr = getValueFromInput("add-money-amount").trim();
    console.log(amount);

    // 4. get pin number 
    const pin = getValueFromInput("add-money-pin").trim();
    console.log(pin);

    // 5. form validation
    if (bankAccount === "Select a Bank" || !accno || !amountStr || !pin) {
        alert("Please fill in all inputs correctly and select a bank.");
        return;
    }
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }
    if (accno.length !== 11 || pin.length !== 4) {
        alert("Account Number must be 11 characters and Pin must be 4 digits.");
        return;
    }
})