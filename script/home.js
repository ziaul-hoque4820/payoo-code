import {
    getBalance, setBalance, initBalance,
    getValueFromInput,
    addTransaction, renderTransactions, getTransactions,
    showToast
} from "./utils.js";

// ─── View Navigation ──────────────────────────────────────────
const views = document.querySelectorAll("[id^='view-']");

const showView = (targetId) => {
    views.forEach(v => v.classList.add("hidden"));
    const target = document.getElementById(targetId);
    if (target) {
        target.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Full tx list render when view open
    if (targetId === "view-transactions") renderFullTransactions();
};

// Service buttons (home menu + "View All")
document.querySelectorAll(".service-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        if (target) showView(target);
    });
});

// Back buttons
document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => showView("view-home"));
});

// ─── Full Transaction Render ──────────────────────────────────
const renderFullTransactions = () => {
    const list = document.getElementById("tx-list-full");
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
    list.innerHTML = transactions.map(tx => {
        const icons = {
            addmoney: { icon: "fa-building-columns", color: "text-green-500", bg: "bg-green-100" },
            cashout: { icon: "fa-money-bill-wave", color: "text-red-500", bg: "bg-red-100" },
            sendmoney: { icon: "fa-paper-plane", color: "text-blue-500", bg: "bg-blue-100" },
            bonus: { icon: "fa-gift", color: "text-yellow-500", bg: "bg-yellow-100" },
            paybill: { icon: "fa-file-invoice", color: "text-purple-500", bg: "bg-purple-100" },
        };
        const { icon, color, bg } = icons[tx.type] || { icon: "fa-circle", color: "text-gray-500", bg: "bg-gray-100" };
        const amountColor = tx.sign === "+" ? "text-green-600" : "text-red-500";
        return `
        <div class="flex items-center justify-between bg-base-100 p-4 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex items-center gap-4">
                <div class="${bg} p-3 rounded-full">
                    <i class="fa-solid ${icon} ${color} text-lg w-6 text-center"></i>
                </div>
                <div>
                    <h3 class="font-bold text-neutral">${tx.label}</h3>
                    <p class="text-xs text-gray-400">${tx.time}</p>
                </div>
            </div>
            <p class="font-bold ${amountColor}">${tx.sign}${tx.amount} ৳</p>
        </div>`;
    }).join("");
};

// ─── Init ─────────────────────────────────────────────────────
initBalance();
renderTransactions(); // home preview

// ─── Add Money ────────────────────────────────────────────────
document.getElementById("add-money-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const bank = getValueFromInput("add-money-bank");
    const accno = getValueFromInput("add-money-number").trim();
    const amountStr = getValueFromInput("add-money-amount").trim();
    const pin = getValueFromInput("add-money-pin").trim();

    if (bank === "Select a Bank" || !accno || !amountStr || !pin) {
        return showToast("Please fill in all fields.", "error");
    }
    if (accno.length !== 11 || pin.length !== 4) {
        return showToast("Account must be 11 digits, Pin must be 4 digits.", "error");
    }
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
        return showToast("Enter a valid amount.", "error");
    }
    if (pin !== "1234") return showToast("Invalid Pin!", "error");

    const newBalance = getBalance() + amount;
    setBalance(newBalance);
    addTransaction({ type: "addmoney", label: `Add Money (${bank})`, amount, sign: "+" });
    showToast(`৳${amount} added from ${bank}!`);

    document.getElementById("add-money-number").value = "";
    document.getElementById("add-money-amount").value = "";
    document.getElementById("add-money-pin").value = "";
    document.getElementById("add-money-bank").selectedIndex = 0;
});

// ─── Cashout ──────────────────────────────────────────────────
document.getElementById("cashout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const agentNum = getValueFromInput("cashout-number").trim();
    const amountStr = getValueFromInput("cashout-amount").trim();
    const pin = getValueFromInput("cashout-pin").trim();

    if (!agentNum || !amountStr || !pin) {
        return showToast("Please fill in all fields.", "error");
    }
    if (agentNum.length !== 11 || pin.length !== 4) {
        return showToast("Agent number must be 11 digits, Pin must be 4 digits.", "error");
    }
    const amount = parseFloat(amountStr);
    const currentBalance = getBalance();
    if (isNaN(amount) || amount <= 0) return showToast("Enter a valid amount.", "error");
    if (amount > currentBalance) return showToast("Insufficient balance!", "error");
    if (pin !== "1234") return showToast("Invalid Pin!", "error");

    setBalance(currentBalance - amount);
    addTransaction({ type: "cashout", label: `Cashout to ${agentNum}`, amount, sign: "-" });
    showToast(`৳${amount} cashed out successfully!`);

    document.getElementById("cashout-amount").value = "";
    document.getElementById("cashout-pin").value = "";
});

// ─── Send Money ───────────────────────────────────────────────
document.getElementById("sendmoney-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const userNum = getValueFromInput("sendmoney-number").trim();
    const amountStr = getValueFromInput("sendmoney-amount").trim();
    const pin = getValueFromInput("sendmoney-pin").trim();

    if (!userNum || !amountStr || !pin) {
        return showToast("Please fill in all fields.", "error");
    }
    if (userNum.length !== 11 || pin.length !== 4) {
        return showToast("Number must be 11 digits, Pin must be 4 digits.", "error");
    }
    const amount = parseFloat(amountStr);
    const currentBalance = getBalance();
    if (isNaN(amount) || amount <= 0) return showToast("Enter a valid amount.", "error");
    if (amount > currentBalance) return showToast("Insufficient balance!", "error");
    if (pin !== "1234") return showToast("Invalid Pin!", "error");

    setBalance(currentBalance - amount);
    addTransaction({ type: "sendmoney", label: `Send Money to ${userNum}`, amount, sign: "-" });
    showToast(`৳${amount} sent to ${userNum}!`);

    document.getElementById("sendmoney-number").value = "";
    document.getElementById("sendmoney-amount").value = "";
    document.getElementById("sendmoney-pin").value = "";
});

// ─── Bonus ────────────────────────────────────────────────────
document.getElementById("get-cupon-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const coupon = getValueFromInput("bonus-cuopn").trim();

    if (!coupon) return showToast("Please enter a coupon code.", "error");

    let bonusAmount = 0;
    if (coupon === "ZIAUL.DEV") bonusAmount = 1000;
    else if (coupon === "DEVELOPER_ZIAUL") bonusAmount = 500;
    else return showToast("Invalid Coupon Code!", "error");

    const newBalance = getBalance() + bonusAmount;
    setBalance(newBalance);
    addTransaction({ type: "bonus", label: `Bonus Coupon (${coupon})`, amount: bonusAmount, sign: "+" });
    showToast(`🎉 ৳${bonusAmount} bonus added!`);

    document.getElementById("bonus-cuopn").value = "";
});

// ─── Pay Bill ─────────────────────────────────────────────────
document.getElementById("pay-bill-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const billType = getValueFromInput("pay-bill-target");
    const billNum = getValueFromInput("pay-bill-number").trim();
    const amountStr = getValueFromInput("pay-bill-amount").trim();
    const pin = getValueFromInput("pay-bill-pin").trim();

    if (billType === "Select bill type" || !billNum || !amountStr || !pin) {
        return showToast("Please fill in all fields.", "error");
    }
    if (billNum.length !== 11 || pin.length !== 4) {
        return showToast("Account must be 11 digits, Pin must be 4 digits.", "error");
    }
    const amount = parseFloat(amountStr);
    const currentBalance = getBalance();
    if (isNaN(amount) || amount <= 0) return showToast("Enter a valid amount.", "error");
    if (amount > currentBalance) return showToast("Insufficient balance!", "error");
    if (pin !== "1234") return showToast("Invalid Pin!", "error");

    setBalance(currentBalance - amount);
    addTransaction({ type: "paybill", label: `${billType} Bill`, amount, sign: "-" });
    showToast(`৳${amount} paid for ${billType} bill!`);

    document.getElementById("pay-bill-number").value = "";
    document.getElementById("pay-bill-amount").value = "";
    document.getElementById("pay-bill-pin").value = "";
    document.getElementById("pay-bill-target").selectedIndex = 0;
});