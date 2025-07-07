const axios = require("axios");

// BotFather থেকে পাওয়া Bot Token .env ফাইলে রাখাই নিরাপদ
const botToken = process.env.BOT_TOKEN || "8184541746:AAFBqmyBiRPELqm8FnYefSNi0XzRIJcLbnA";

// তোমার Telegram chat id
const chatId = "6675812027";

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

// Override console.log
console.log = (...args) => {
  const message = `ℹ️ Log: ${args.join(" ")}`;
  notifyTelegram(message);
  originalLog(...args);
};

// Override console.error
console.error = (...args) => {
  const message = `❗ Error: ${args.join(" ")}`;
  notifyTelegram(message);
  originalError(...args);
};

module.exports = notifyTelegram;
