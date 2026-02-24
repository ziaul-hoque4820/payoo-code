import { getBalance, getValueFromInput, setBalance } from "./utils.js";

document.getElementById("get-cupon-btn").addEventListener('click', (event) => {
    event.preventDefault();

    // 1. get all input value
    const couponCode = getValueFromInput("bonus-cuopn").trim();

    if (!couponCode) {
        alert("Please enter a coupon code.");
        return;
    }

    let bonusAmount = 0;

    if (couponCode === "ZIAUL.DEV") {
        bonusAmount = 1000;
    } else if (couponCode === "DEVELOPER_ZIAUL") {
        bonusAmount = 500;
    } else {
        alert("Invalid Coupon Code.");
        return;
    }

    const currentBalance = getBalance();
    const newBalance = currentBalance + bonusAmount;

    setBalance(newBalance);
    alert(`Coupon Applied Successfully! You've received ${bonusAmount} bonus. Your new balance is ${newBalance}.`);

    document.getElementById("bonus-cuopn").value = "";
})