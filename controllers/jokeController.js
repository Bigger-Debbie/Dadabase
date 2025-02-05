exports.getJoke = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "pull my finger...",
  });
};
