const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../models/usersModel");

const stripe = require("stripe")(process.env.stripe_key);
const { uuid } = require('uuidv4');
const { v4 } = require('uuid');


//====================================================
//Transfer money from one account to another
//==========================

router.post("/transfer-funds", authMiddleware, async (req, res) => {
  try {
    // Saving the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // Decrease the sender's balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });

    // Increase the receiver's balance
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });

    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});


//====================================================
//------Verify the receiver account number
//==============================
router.post("/verify-account", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if(user) {
      res.send({
        message: "Account verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account not found",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Account not found",
      data: error.message,
      success: false,
    });
  }
});

//====================================================
//Get all transactions
//==============================
router.post("/get-all-transactions-by-user", authMiddleware, async(req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.body.userId}, {receiver: req.body.userId}],
    }).sort({ createdAt: -1 }).populate("sender").populate("receiver");
    res.send({
      message: "Transactions fetched",
      data: transactions,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transactions not fetched",
      data: error.message,
      success: false,
    });
  }
});

//====================================================
//Deposit funds using stripe
//==============================
router.post("/deposit-funds", authMiddleware, async (req, res) => {
  try {
    const {token, amount} = req.body;
    //Create customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    //Charge a customer
    const charge = await stripe.charges.create(
      {
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `Deposited to MAMBAwALLETX`
    },
    {
      idempotencyKey: uuid(),
    },
    );
    //save the transaction
    if (charge.status === "succeeded") {
      const newTransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount: amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      });
      await newTransaction.save();
    
      // Increase the user's balance
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { balance: amount },
      });
      res.send({
        message: "Transaction successful",
        data: newTransaction,
        success: true, // <-- Update this line to true
      });
    } else {
      res.send({
        message: "Transaction failed",
        data: charge,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
})

module.exports = router;
