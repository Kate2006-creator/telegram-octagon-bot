const TelegramBot = require('node-telegram-bot-api');

const token = '7793508677:AAGO05PY191gZt1_EEDw0V_tTQ1bDsQzGY0';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет, Октагон!");
});


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log("Получено сообщение от : ");
});

console.log("Бот запущен!");
