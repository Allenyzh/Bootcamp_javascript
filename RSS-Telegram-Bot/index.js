// 加载 .env 文件中的变量
require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const Parser = require("rss-parser");
const parser = new Parser();

// 从 .env 文件中获取变量
const token = process.env.TELEGRAM_BOT_TOKEN;
const yourChatId = process.env.TELEGRAM_CHAT_ID;
const rssUrl = process.env.RSS_URL;

// 创建 Telegram 机器人
const bot = new TelegramBot(token, { polling: true });

// 存储已发送的文章，避免重复发送
let sentArticles = [];

// 当用户发送 "/start" 命令时，返回欢迎信息并发送所有现有的 RSS 消息
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Hi there! I will send you updates from the RSS feed."
  );
  sendExistingRSSFeed(chatId); // 发送当前 RSS 源的所有消息
});

// 当用户发送 "/id" 命令时，返回聊天 ID
bot.onText(/\/id/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Your Chat ID is: ${chatId}`);
});

// 监听所有消息，并返回聊天 ID（用于调试或直接查看）
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(`Chat ID: ${chatId}`);
  bot.sendMessage(chatId, `Chat ID: ${chatId}`);
});

// 定义一个函数，检查 RSS Feed 并发送所有文章
async function sendExistingRSSFeed(chatId) {
  try {
    const feed = await parser.parseURL(rssUrl);
    feed.items.forEach((item) => {
      bot.sendMessage(chatId, `Article: ${item.title}\nLink: ${item.link}`);
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
}

// 定义一个函数，定期检查 RSS Feed 并发送新文章
async function checkRssFeed() {
  try {
    const feed = await parser.parseURL(rssUrl);
    feed.items.forEach((item) => {
      if (!sentArticles.includes(item.link)) {
        bot.sendMessage(
          yourChatId, // 发送到你的聊天 ID
          `New Article: ${item.title}\nLink: ${item.link}`
        );
        sentArticles.push(item.link); // 将文章链接存储起来，避免重复发送
      }
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
}

// 每隔 1 小时检查一次 RSS Feed
setInterval(checkRssFeed, 60 * 60 * 1000);
