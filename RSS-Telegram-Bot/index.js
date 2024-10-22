const TelegramBot = require("node-telegram-bot-api");
const Parser = require("rss-parser");
const parser = new Parser();

// 替换成你从 @BotFather 获取的 Token
const token = "1311882390:AAGyI9ZNBAbtRM6BPxD0qvz2vQd1YyRNHIo";

// 创建 Telegram 机器人
const bot = new TelegramBot(token, { polling: true });

// 你的 Telegram Chat ID（获取后替换）
const yourChatId = "841121769";

// RSS 订阅的 URL
const rssUrl =
  "https://jobs-emplois.cse-cst.gc.ca/en/careers-carrieres/professionals-professionnels/opportunities/rss";

// 存储已发送的文章，避免重复发送
let sentArticles = [];

// 当用户发送 "/start" 命令时，返回欢迎信息
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Hi there! I will send you updates from the RSS feed."
  );
  // 当用户发送 /start 时，立即将当前 RSS 源的所有消息发送
  sendExistingRSSFeed(chatId);
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
  // 可以发送聊天 ID 给用户（可选）
  bot.sendMessage(chatId, `Chat ID: ${chatId}`);
});

// 定义一个函数，检查 RSS Feed 并发送所有文章
async function sendExistingRSSFeed(chatId) {
  try {
    const feed = await parser.parseURL(rssUrl);
    feed.items.forEach((item) => {
      // 发送文章标题和链接到 Telegram
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
      // 检查文章是否已经发送过
      if (!sentArticles.includes(item.link)) {
        // 发送文章标题和链接到 Telegram
        bot.sendMessage(
          yourChatId, // 发送到你的聊天 ID
          `New Article: ${item.title}\nLink: ${item.link}`
        );

        // 将文章链接存储起来，避免重复发送
        sentArticles.push(item.link);
      }
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
}

// 每隔 1 小时检查一次 RSS Feed
setInterval(checkRssFeed, 60 * 60 * 1000);
