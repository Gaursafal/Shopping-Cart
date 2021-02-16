const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./data");

app.use(express.json());
app.use(cors());

app.get("/api/products", (req, res) => {
  return res.json(data.products);
});

app.post("/api/products", (req, res) => {
  let products = [],
    id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products);
  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id];
      products.push(data.products[i]);
    }
  }
  return res.json(products);
});

app.post("/api/auth", (req, res) => {
  let user = data.users.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });
  if (user.length) {
    let token = { name: user[0].name, password: user[0].password };
    let response = { message: "Authentication Successful!", token: token };
    return res.status(200).json(response);
  } else {
    return res.status("409").json("Authentication failed. admin not found.");
  }
});

app.listen(5000);
console.log("api runnging on port 5000");
