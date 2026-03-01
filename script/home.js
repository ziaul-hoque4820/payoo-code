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

