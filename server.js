const app = require("./app");

const port = 8000;
const server = app.listen(port, () => {
  console.log("app running | listenting port: 8000");
});
