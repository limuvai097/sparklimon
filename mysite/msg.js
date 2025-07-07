const axios = require("axios");

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const originalLog = console.log;
const originalError = console.error;

function notifyTelegram(message) {
  const MAX_LENGTH = 4000;
  const safeMessage = message.length > MAX_LENGTH
    ? message.slice(0, MAX_LENGTH) + "..."
    : message;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  axios.post(url, {
    chat_id: chatId,
    text: safeMessage,
  }).catch((err) => {
    originalError("Telegram notification failed:", err.message);
  });
}

console.log = (...args) => {
  const message = `ℹ️ Log: ${args.join(" ")}`;
  notifyTelegram(message);
  originalLog(...args);
};

console.error = (...args) => {
  const message = `❗ Error: ${args.join(" ")}`;
  notifyTelegram(message);
  originalError(...args);
};

module.exports = notifyTelegram;
