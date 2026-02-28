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

// ─── Transaction Icons ────────────────────────────────────────
const txIcons = {
    addmoney: { icon: "fa-building-columns", color: "text-green-500", bg: "bg-green-100" },
    cashout: { icon: "fa-money-bill-wave", color: "text-red-500", bg: "bg-red-100" },
    sendmoney: { icon: "fa-paper-plane", color: "text-blue-500", bg: "bg-blue-100" },
    bonus: { icon: "fa-gift", color: "text-yellow-500", bg: "bg-yellow-100" },
    paybill: { icon: "fa-file-invoice", color: "text-purple-500", bg: "bg-purple-100" },
};

// ─── Render Transactions ──────────────────────────────────────
export const renderTransactions = () => {
    const list = document.getElementById("tx-list");
    if (!list) return;

    const transactions = getTransactions();

    if (transactions.length === 0) {
        list.innerHTML = `
            <div class="text-center py-10 text-gray-400">
                <i class="fa-solid fa-clock-rotate-left text-4xl mb-3 block"></i>
                <p>No transactions yet</p>
            </div>`;
        return;
    }

    list.innerHTML = transactions.map((tx) => {
        const { icon, color, bg } = txIcons[tx.type] || { icon: "fa-circle", color: "text-gray-500", bg: "bg-gray-100" };
        const amountColor = tx.sign === "+" ? "text-green-600" : "text-red-500";

        return `
        <div class="flex items-center justify-between bg-base-100 p-4 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
            <div class="flex items-center gap-4">
                <div class="${bg} p-3 rounded-full">
                    <i class="fa-solid ${icon} ${color} text-lg w-6 text-center"></i>
                </div>
                <div>
                    <h3 class="font-bold text-neutral">${tx.label}</h3>
                    <p class="text-xs text-gray-400">${tx.time}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="font-bold ${amountColor}">${tx.sign}${tx.amount} ৳</p>
            </div>
        </div>`;
    }).join("");
};