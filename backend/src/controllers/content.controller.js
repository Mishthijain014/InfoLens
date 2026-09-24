const {
  createContentFromUrl
} = require("../services/content.service");

const addUrlContent = async (req, res) => {
  try {
    const content = await createContentFromUrl({
      userId: req.userId,
      type: req.body.type,
      url: req.body.url
    });

    res.status(201).json({
      message: "Content extracted successfully",
      content
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  addUrlContent
};