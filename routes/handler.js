const express = require("express");
const { now } = require("mongoose");
const { featuredProcucts } = require("../models/schemas.js");
const router = express.Router();
const Schemas = require("../models/schemas.js");

//to get products from DB and send to front end on request
router.get("/products", async (req, res) => {
  const products = Schemas.products;
  console.log("Running quary products");
  const productsView = products.find({}, (err, productData) => {
    if (err) throw err;
    if (productData) {
      res.end(JSON.stringify(productData));
    } else {
      res.end();
    }
  });
});

//to get featured products from DB and send to front end on request
router.get("/featProd", async (req, res) => {
  const featuredProcucts = Schemas.products;
  console.log("Running quary on featured products");
  const FeatProductsView = featuredProcucts.find({group:"featured"}, (err, FeatproductData) => {
    if (err) throw err;
    if (FeatproductData) {
      res.end(JSON.stringify(FeatproductData));
    } else {
      res.end();
    }
  });
});

//to get latest products from DB and send to front end on request
router.get("/lateProd", async (req, res) => {
  const latestProcucts = Schemas.products;
  console.log("Running quary on latest products");
  const lateProductsView = latestProcucts.find({group:"latest"},(err, lateProductData) => {
    if (err) throw err;
    if (lateProductData) {
      res.end(JSON.stringify(lateProductData));
    } else {
      res.end();
    }
  });
});

//to get promos from DB and send to front end on request
router.get("/promo", async (req, res) => {
  const promos = Schemas.promos;
  console.log("Running quary on promos");
  const promosView = promos
    .find({}, (err, promoData) => {
      if (err) throw err;
      if (promoData) {
        res.end(JSON.stringify(promoData));
      } else {
        res.end();
      }
    })
    .limit(1)
    .sort({ _id: -1 });
});

//to get product by id  from DB and send to front end on request
router.get("/productView/:id", async (req, res) => {
  const product = Schemas.products;
  console.log("Running quary on product id -" + req.params.id);
  const prodView = product.find({ _id: req.params.id }, (err, prodData) => {
    if (err) throw err;
    if (prodData) {
      res.end(JSON.stringify(prodData));
    } else {
      res.end();
    }
  });
});

//to get reviews from DB and send to front end on request
router.get("/reviews", async (req, res) => {
  const reviews = Schemas.reviews;
  console.log("Running quary on reviews");
  const reviewsView = reviews
    .find({}, (err, reviewData) => {
      if (err) throw err;
      if (reviewData) {
        res.end(JSON.stringify(reviewData));
      } else {
        res.end();
      }
    })
    .limit(3)
    .sort({ _id: -1 });
});

//to write contact messages to DB and send to back end on request
router.post("/addMessage", async (req, res) => {
  const userName = req.body.nameInput;
  const userPhone = req.body.phoneInput;
  const userMsg = req.body.subjectInput;
  const user = Schemas.customermesg;

  const newMsg = new Schemas.customermesg({
    name: userName,
    phone: userPhone,
    message: userMsg,
  });

  try {
    await newMsg.save((err, newMsgResults) => {
      if (err) res.end("Error Saving.");
      res.redirect("/");
      res.end();
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
    res.end();
  }
});

// get order details and save to db
router.post(
  "/createOrder",
  (async (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const cno = req.body.cno;
    const msg = req.body.msg;
    const orderItem = req.body.orderItems;
    const order = Schemas.orders;
    
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const newOrder = new Schemas.orders({
        buy_name: name,
        buy_address: address,
        buy_email: email,
        buy_phone: cno,
        message: msg,
        orderItems: orderItem,
      });
      const createdOrder = await newOrder.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder })
    }
  })
);

//to getadmin data from DB and send to front end on request
router.get("/admin", async (req, res) => {
  const admin = Schemas.admin;
  console.log("Running quary on admin");
  const adminView = admin
    .find({}, (err, adminData) => {
      if (err) throw err;
      if (adminData) {
        res.end(JSON.stringify(adminData));
      } else {
        res.end();
      }
    })
    .limit(1)
    .sort({ _id: -1 });
});

//to get orders from DB and send to front end on request
router.get("/orders", async (req, res) => {
  const orders = Schemas.orders;
  console.log("Running quary orders");
  const ordersView = orders.find({}, (err, orderData) => {
    if (err) throw err;
    if (orderData) {
      res.end(JSON.stringify(orderData));
    } else {
      res.end();
    }
  });
});

//to get messages from DB and send to front end on request
router.get("/messages", async (req, res) => {
  const message = Schemas.customermesg;
  console.log("Running quary messages");
  const msgView = message.find({}, (err, msgData) => {
    if (err) throw err;
    if (msgData) {
      res.end(JSON.stringify(msgData));
    } else {
      res.end();
    }
  });
});

//to delete orders in DB 
router.get("/orderDel/:id", async (req, res) => {
  const order = Schemas.orders;
  console.log("Running quary on delete order");
  const getOrder = order.find({ _id: req.params.id });
  if(getOrder){
    order.deleteOne({ _id: req.params.id },(err, obj)=>{
      if (err) throw err;
      if(obj){

      }else{
        res.end();
      }
    });
  }
});

//to delete messages in DB 
router.get("/messageDel/:id", async (req, res) => {
  const message = Schemas.customermesg;
  console.log("Running quary on delete message");
  const getMsg = message.find({ _id: req.params.id });
  if(getMsg){
    message.deleteOne({ _id: req.params.id },(err, obj)=>{
      if (err) throw err;
      if(obj){

      }else{
        res.end();
      }
    });
  }
});

//to delete promos in DB 
router.get("/promoDel/:id", async (req, res) => {
  const promo = Schemas.promos;
  console.log("Running quary on delete promo");
  const getPromo = promo.find({ _id: req.params.id });
  if(getPromo){
    promo.deleteOne({ _id: req.params.id },(err, obj)=>{
      if (err) throw err;
      if(obj){

      }else{
        res.end();
      }
    });
  }
});

//to delete reviews in DB 
router.get("/reviewDel/:id", async (req, res) => {
  const review = Schemas.reviews;
  console.log("Running quary on delete review");
  const getReview = review.find({ _id: req.params.id });
  if(getReview){
    review.deleteOne({ _id: req.params.id },(err, obj)=>{
      if (err) throw err;
      if(obj){

      }else{
        res.end();
      }
    });
  }
});

//to delete products in DB 
router.get("/productDel/:id", async (req, res) => {
  const product = Schemas.products;
  console.log("Running quary on delete product");
  const getProduct= product.find({ _id: req.params.id });
  if(getProduct){
    product.deleteOne({ _id: req.params.id },(err, obj)=>{
      if (err) throw err;
      if(obj){

      }else{
        res.end();
      }
    });
  }
});

//to add products from admin to DB and send to back end on request
router.post("/addProduct", async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const category = req.body.category;
  const group = req.body.group;
  const col = req.body.col;
  const desc = req.body.desc;
  const StockQty = req.body.StockQty;
  const img = req.body.img;
  const img1 = req.body.img1;
  const img2 = req.body.img2;
  const img3 = req.body.img3;

  const newProduct = new Schemas.products({
    title:title,
    price:price,
    img:img,
    desc:desc,
    StockQty:StockQty,
    col:col,
    category:category,
    group:group,
    img1:img1,
    img2:img2,
    img3:img3,
  });

  try {
    await newProduct.save((err, newProdResults) => {
      if (err) res.end("Error Saving.");
      res.redirect("/AdminDashbord/stat_true");
      res.end();
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
    res.end();
  }
});

module.exports = router;
