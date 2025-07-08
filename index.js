const TelegramBot = require('node-telegram-bot-api');

const token = '7793508677:AAGO05PY191gZt1_EEDw0V_tTQ1bDsQzGY0';

const bot = new TelegramBot(token, {polling: true});

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я бот, созданный для прохождения практики. Можешь посмотреть мои команды через /help.');
});

// Команда /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Список команд:\n/start - начать общение\n/help - показать список команд\n/site - ссылка на сайт Октагона\n/creator - информация о создателе бота');
});

// Команда /site
bot.onText(/\/site/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Сайт Октагона: [https://octagon-students.ru/](https://octagon-students.ru/)', { parse_mode: 'Markdown' }); 
});

// Команда /creator
bot.onText(/\/creator/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Создатель бота: Кутявина Екатерина Сергеевна');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(`Получено сообщение от ${msg.from.username}: ${msg.text}`);
});

console.log('Бот запущен!');



