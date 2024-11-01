import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

export async function singleNews() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 网页完全加载
  await page.goto(process.env.URL, {
    waitUntil: "networkidle0",
  });

  // 内容摘取函数
  async function getElementContent(element) {
    if (element) {
      const content = await element.evaluate((el) => el.textContent.trim());
      console.log(content);
      return content;
    }
    return null;
  }

  // 初始化变量
  let title, author, lead;

  // 标题
  const titleElement = await page.$(
    ".headlines.titleModule .title.titleModule__main"
  );
  title = await getElementContent(titleElement);

  // 作者
  const autherElement = await page.$(
    ".author.authorModule.authorModule--hasAuthorSheet .authorModule__content .details.authorModule__details .name.authorModule__name "
  );
  author = await getElementContent(autherElement);

  // 摘要
  const leadElement = await page.$(".lead.textModule.textModule--type-lead");
  lead = await getElementContent(leadElement);

  const elements = await page.evaluate(() => {
    // 获取所有符合条件的 <p> 和 <h2> 元素
    const paragraphElements = document.querySelectorAll(
      "p.paragraph.textModule.textModule--type-paragraph"
    );
    const subheadElements = document.querySelectorAll(
      "h2.textModule--type-subhead"
    );

    // 创建一个数组来保存所有元素
    const mainParagraphContent = [...paragraphElements, ...subheadElements];

    // 按照它们在 HTML 中的顺序排序
    mainParagraphContent.sort((a, b) => {
      return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1;
    });

    // 返回每个元素的文本内容
    return mainParagraphContent.map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent,
    }));
  });

  await browser.close();

  // 创建一个数组存储所有数据，包括标题、作者、摘要和内容
  const contentArray = [
    { tag: "title", text: title || "无" },
    { tag: "author", text: author || "无" },
    { tag: "lead", text: lead || "无" },
    ...elements,
  ];
  console.log(contentArray);
  return contentArray;
}
