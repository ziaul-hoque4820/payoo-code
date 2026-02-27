// ─── Input Helpers ───────────────────────────────────────────
export const getValueFromInput = (id) => {
    return document.getElementById(id)?.value ?? "";
};

// ─── Balance (LocalStorage) ───────────────────────────────────
const BALANCE_KEY = "payoo_balance";
const DEFAULT_BALANCE = 45000;

export const getBalance = () => {
    const stored = localStorage.getItem(BALANCE_KEY);
    return stored !== null ? Number(stored) : DEFAULT_BALANCE;
};

export const setBalance = (value) => {
    localStorage.setItem(BALANCE_KEY, value);
    document.getElementById("balance").innerText = value;
};

export const initBalance = () => {
    const balance = getBalance();
    document.getElementById("balance").innerText = balance;
};

// ─── Transactions (LocalStorage) ─────────────────────────────
const TX_KEY = "payoo_transactions";

export const getTransactions = () => {
    return JSON.parse(localStorage.getItem(TX_KEY) || "[]");
};

export const addTransaction = ({ type, label, amount, sign }) => {
    const transactions = getTransactions();
    const newTx = {
        id: Date.now(),
        type,
        label,
        amount,
        sign, // "+" or "-"
        time: new Date().toLocaleString("en-BD", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            day: "2-digit",
            month: "short",
        }),
    };
    transactions.unshift(newTx); // newest first
    localStorage.setItem(TX_KEY, JSON.stringify(transactions));
    renderTransactions();
};