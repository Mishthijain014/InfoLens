const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

const extractArticle = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch article. Status: ${response.status}`
      );
    }

    const html = await response.text();

    const dom = new JSDOM(html, {
      url
    });

    const reader = new Readability(dom.window.document);

    const article = reader.parse();

    if (!article || !article.textContent?.trim()) {
      throw new Error("Could not extract article content");
    }

    return {
      title: article.title?.trim() || "",
      text: article.textContent.trim()
    };
  } catch (error) {
    throw new Error(`Article extraction failed: ${error.message}`);
  }
};

module.exports = {
  extractArticle
};