const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");
// import instanceLocator from "./src/config";

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:fd9f51a4-8069-41ef-99e5-83350f98a01f",
  key:
    "f338fa4d-14cc-466b-85c5-2e0b91ccd8bf:Oi/tfCUj+xu+s4lAbB1RhfmwY/UEwQCAEcBqe7Xf+Qk="
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/users", (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
