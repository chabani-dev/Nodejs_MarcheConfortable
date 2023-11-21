import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Order from "../Models/OrderModel.js";

const orderRouter = express.Router();

// POST /api/orders
// Crée une nouvelle commande
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (!orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);

      // if (createdOrder) {
      //   res.status(201).json(createdOrder);
      // } else {
      //   res.status(500);
      //   throw new Error("Failed to create order");
      // }
    }
  })
);

// ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email ");
    res.json(orders);
  })
);

// USER LOGIN ORDER
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order Not Found" }); // Retournez un objet JSON pour fournir plus d'informations sur l'erreur.
    }
  })
);

//ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payementResult = {
        id: req.body.id,
        status: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
      // Retournez un objet JSON pour fournir plus d'informations sur l'erreur.
    }
  })
);

export default orderRouter;
