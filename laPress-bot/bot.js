import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { singleNews } from "./scraper.js";

// 从 .env 文件中获取 Telegram Bot Token
const token = process.env.TELEGRAM_BOT_TOKEN;

// 创建一个 bot 实例，传入 token，设定 polling 为 true
const bot = new TelegramBot(token, { polling: true });

// 监听消息事件
bot.onText(/\/scrape/, async (msg) => {
  const chatId = msg.chat.id;

  // 告诉用户我们正在爬取内容
  bot.sendMessage(chatId, "正在爬取网页内容，请稍候...");

  try {
    // 调用爬虫函数来获取网页内容
    const scrapedData = await singleNews();

    // 构造回复消息
    let replyMessage = "";

    scrapedData.forEach((item) => {
      replyMessage += `${item.text}\n\n`;
    });

    // 将消息分割成 4096 个字符的块来发送
    const maxMessageLength = 4096;
    for (let i = 0; i < replyMessage.length; i += maxMessageLength) {
      const messageChunk = replyMessage.substring(i, i + maxMessageLength);
      await bot.sendMessage(chatId, messageChunk);
    }
  } catch (error) {
    console.error("爬取内容出错:", error);
    bot.sendMessage(chatId, "爬取内容时出现错误，请稍后再试。");
  }
});
