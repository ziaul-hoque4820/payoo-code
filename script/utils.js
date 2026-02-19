// Input value
const getValueFromInput = (id) => {
    const input = document.getElementById(id);
    const value = input.value;
    console.log(id, value);
    return value;
}

// user Balance 
const getBalance = () => {
    const balanceElement = document.getElementById("balance");
    const balance = balanceElement.innerText;
    console.log("current balance", Number(balance));
    return Number(balance);
}

// set user balance
const setBalance = (value) => {
    const balanceElement = document.getElementById("balance");
    balanceElement.innerText = value;
}