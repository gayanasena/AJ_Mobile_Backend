const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//map schemas of db tables
const productsSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    group: { type: String },
    col: { type: String },
    desc: { type: String },
    StockQty: { type: String },
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
  },
  {
    versionKey: false,
  }
);

const promosSchema = new Schema(
  {
    title: { type: String, required: true },
    disc: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    review: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const orderSchema = new Schema(
  {
    buy_name: { type: String },
    buy_address: { type: String },
    buy_email: { type: String },
    buy_phone: { type: String },
    message: { type: String },
    orderItems: [
      {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        img: { type: String },
        price: { type: String, required: true },
        qty: { type: String, required: true },
      },
    ],
    order_date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const adminSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const products = mongoose.model("products", productsSchema, "products");

const promos = mongoose.model("promos", promosSchema, "promos");

const reviews = mongoose.model("reviews", reviewSchema, "reviews");

const contact = mongoose.model("customermesg", contactSchema, "customermesg");

const orders = mongoose.model("orders", orderSchema, "orders");

const admin = mongoose.model("admin", adminSchema, "admin");

const mySchemas = {
  products: products,
  promos: promos,
  reviews: reviews,
  customermesg: contact,
  orders: orders,
  admin: admin,
};

module.exports = mySchemas;
