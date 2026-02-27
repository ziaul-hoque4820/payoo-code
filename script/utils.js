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