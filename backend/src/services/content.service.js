const Content = require("../models/Content");
const { extractArticle } = require("./article.service");

const createContentFromUrl = async ({
  userId,
  type,
  url
}) => {
  if (!type || !url) {
    throw new Error("Content type and URL are required");
  }

  if (type !== "article") {
    throw new Error(
      "Only article URLs are supported in this phase"
    );
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch (error) {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are allowed");
  }

  const content = await Content.create({
    userId,
    type: "article",
    sourceUrl: parsedUrl.toString(),
    status: "processing"
  });

  try {
    const article = await extractArticle(
      parsedUrl.toString()
    );

    content.title = article.title;
    content.extractedText = article.text;
    content.status = "completed";

    await content.save();

    return content;
  } catch (error) {
    content.status = "failed";
    await content.save();

    throw error;
  }
};

module.exports = {
  createContentFromUrl
};