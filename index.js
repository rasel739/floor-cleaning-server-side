const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(cors());

app.use(express.static("public"));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tw0ab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = await client.db("Service-Price");
    const servicePriceCollection = database.collection("service");
    const serviceUserAddressCollection =
      database.collection("serviceUserAddress");

    app.get("/servicePriceGet", async (req, res) => {
      const result = await servicePriceCollection.find({}).toArray();
      res.send(result);
    });

    //serviceUserAddress data post

    app.post("/serviceUserAddress", async (req, res) => {
      const items = req.body;

      // const result = serviceUserAddressCollection.insertOne(items);

      console.log(req.body);
    });

    //stripe payment system

    app.post("/create-payment-intent", async (req, res) => {
      const paymentInfo = req.body;

      const amount = paymentInfo.price * 100;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    console.log("database connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Start Floor Cleaning Project Server");
});

app.listen(port, () => {
  console.log("Starting server on port " + port);
});
