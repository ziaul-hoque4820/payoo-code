// Input value
export const getValueFromInput = (id) => {
    const input = document.getElementById(id);
    const value = input.value;
    return value;
}

// user Balance 
export const getBalance = () => {
    const balanceElement = document.getElementById("balance");
    const balance = balanceElement.innerText;
    return Number(balance);
}

// set user balance
export const setBalance = (value) => {
    const balanceElement = document.getElementById("balance");
    balanceElement.innerText = value;
}