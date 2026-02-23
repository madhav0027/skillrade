const app = require("./index");

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("SERVER RUNNING IN PORT" + PORT);
});
