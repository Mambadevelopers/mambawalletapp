const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Request = require("../models/requestsModel");
const User = require("../models/usersModel");
const Transaction = require("../models/transactionModel");

//Get requests to a user
router.post("/get-all-requests-by-user", authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{sender: req.body.userId}, {receiver: req.body.userId}],
    })
    .populate("sender")
    .populate("receiver").sort({createdAt: -1});

    res.send({
      data: requests,
      message: "Request fetched successfully",
      success: true,
    })
  } catch (error) {
    
  }
});

//Send a request to another user
router.post("/send-request", authMiddleware, async (req, res) => {
  try {
    const { receiver, amount, description } = req.body;

    const request = new Request({
      sender: req.body.userId,
      receiver,
      amount,
      description,
    });
    await request.save();

    res.send({
      data: request,
      message: "Request sent successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Updated request status
router.post("/update-request-status", authMiddleware, async (req, res) => {
  try {
    if (req.body.status === "accepted") {
      //Create transactions
      const transaction = new Transaction({
        sender: req.body.receiver._id,
        receiver: req.body.sender._id,
        amount: req.body.amount,
        reference: req.body.description,
        status: "success"
      });
      await transaction.save();

      // Deduct the amount from the sender
      await User.findByIdAndUpdate(req.body.sender._id, {
        $inc: {balance: req.body.amount}
      });

      // Add the amount to the receiver
      await User.findByIdAndUpdate(req.body.receiver._id, {
        $inc: {balance: -req.body.amount}
      });
    } 

    // Update the request status
    await Request.findByIdAndUpdate(req.body._id, {
      status: req.body.status
    });

    res.send({
      data: null,
      message: "Request status updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
});






module.exports = router;
