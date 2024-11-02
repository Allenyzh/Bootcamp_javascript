import dotenv from "dotenv";
dotenv.config();

let content = [
  {
    tag: "title",
    children: ["Québec suspend deux programmes d’immigration"],
  },
];

fetch("https://api.telegra.ph/createPage", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    access_token: process.env.TELEGRAPH_ACCESS_TOKEN,
    title: "PEQ Changes 1",
    content: JSON.stringify(content),
    return_content: true,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.ok) {
      // 获取页面路径
      const pagePath = data.result.path;
      console.log(
        `Page created! You can view it at: https://telegra.ph/${pagePath}`
      );
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
