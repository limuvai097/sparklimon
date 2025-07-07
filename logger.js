const axios = require("axios");

// BotFather থেকে পাওয়া Bot Token বসাও
const botToken = "8184541746:AAFBqmyBiRPELqm8FnYefSNi0XzRIJcLbnA";

// তোমার Telegram chat id বসাও
const chatId = "6675812027";

function notifyTelegram(message) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  axios.post(url, {
    chat_id: chatId,
    text: message,
  }).catch((err) => {
    process.stderr.write("Telegram notification failed: " + err.message + "\n");
  });
}

// Override console.log
console.log = (...args) => {
  const message = `ℹ️ Log: ${args.join(" ")}`;
  notifyTelegram(message);
  process.stdout.write(message + "\n");
};

// Override console.error
console.error = (...args) => {
  const message = `❗ Error: ${args.join(" ")}`;
  notifyTelegram(message);
  process.stderr.write(message + "\n");
};

module.exports = notifyTelegram;
