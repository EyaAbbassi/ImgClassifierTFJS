const express = require("express");
const cors = require("cors");
//middleware to
const TeachableMachine = require("@sashido/teachablemachine-node");
//parse the image url that we will get from the client
const bodyParser = require("body-parser");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/2vrqYyWWU/",
});
https: var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();
//middleware used by my project
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.port || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get("/", async (req, res) => {
  res.send(`
 <form action = "/image/classify" method="POST">
 <p>
 Enter Url
 </p>
 <input name="ImageUrl" autocomplete=off>
 <button> Classify Image </button>
 </form>`);
});
app.post("/image/classify", async (req, res) => {
  const url = req.body.ImageUrl;

  return model
    .classify({
      imageUrl: url,
    })
    .then((predictions) => {
      res.json(predictions);
    })
    .catch((e) => {
      res.status(500).send("Something went wrong!");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
