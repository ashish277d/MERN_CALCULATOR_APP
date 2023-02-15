const asyncHandler = require('express-async-handler')
const Operation = require('../models/operationModel')
const User = require('../models/userModel')
const RecordModel = require('../models/recordModel')
const mongoose = require('mongoose');
const utils = require('../common/utils');

// @desc    create new operation
// @route   POST /api/operation
// @access  Public
const createOperation = asyncHandler(async (req, res) => {
    const { type, cost } = req.body
    if (!type || !cost) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if operation exists
    const operationExists = await Operation.findOne({ type })

    if (operationExists) {
        res.status(400).json({ error: 'Operation already exists' });
        return;
    }

    // Create operation
    const operation = await Operation.create({
        type,
        cost,
    })

    if (operation) {
        res.status(201).json({
            _id: operation.id,
            type: operation.type,
            cost: operation.cost,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const addition = asyncHandler(async (req, res) => {
    try {
        // Get the user information and check if the balance is enough
        const userData = await User.findOne({ _id: req.user._id });

        if (!userData || userData.status !== 'active' || userData.balance < 1) {
            res.status(403).json({ error: 'Insufficient balance' });
            return;
        }

        // Perform the addition operation and update the balance
        const result = parseFloat(req.body.num1) + parseFloat(req.body.num2);
        const newBalance = userData.balance - 1;

        // Update the user balance in the users collection
        const updatedUser = await User.updateOne({ _id: req.user._id }, { $set: { balance: newBalance } });

        //Find Operation ID
        const operation = await Operation.findOne({ type: "addition" });

        // Save the operation record in the records collection
        const record = await RecordModel.create({
            operation_id: mongoose.Types.ObjectId(operation.id),
            user_id: mongoose.Types.ObjectId(req.user.id),
            amount: 1,
            user_balance: newBalance,
            operation_response: result,
            date: new Date()
        });
        if (record) {
            res.status(200).json({
                result: record.operation_response
            });

        } else {
            res.status(400)
            throw new Error("Record Creation Failed");
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const substraction = asyncHandler(async (req, res) => {
    try {
        // Get the user information and check if the balance is enough
        const userData = await User.findOne({ _id: req.user._id });

        if (!userData || userData.status !== 'active' || userData.balance < 1) {
            res.status(403).json({ error: 'Insufficient balance' });
            return;
        }

        //Find Operation ID and cost for the operation
        const operation = await Operation.findOne({ type: "substraction" });

        // Perform the addition operation and update the balance
        const result = parseFloat(req.body.num1) - parseFloat(req.body.num2);
        // update user balance and save operation record
        const record = await utils.saveData(req.user, operation, userData, result);
        if (record) {
            res.status(200).json({
                result: record.operation_response
            });

        } else {
            res.status(400)
            throw new Error("Record Creation Failed");
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const multiplication = asyncHandler(async (req, res) => {
    try {
        // Get the user information and check if the balance is enough
        const userData = await User.findOne({ _id: req.user._id });

        if (!userData || userData.status !== 'active' || userData.balance < 1) {
            res.status(403).json({ error: 'Insufficient balance' });
            return;
        }

        //Find Operation ID and cost for the operation
        const operation = await Operation.findOne({ type: "multiplication" });

        // Perform the multiplication operation and update the balance
        const result = parseFloat(req.body.num1) * parseFloat(req.body.num2);
        // update user balance and save operation record
        const record = await utils.saveData(req.user, operation, userData, result);
        if (record) {
            res.status(200).json({
                result: record.operation_response
            });

        } else {
            res.status(400)
            throw new Error("Record Creation Failed");
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const square_root = asyncHandler(async (req, res) => {
    try {
        // Get the user information and check if the balance is enough
        const userData = await User.findOne({ _id: req.user._id });

        if (!userData || userData.status !== 'active' || userData.balance < 1) {
            res.status(403).json({ error: 'Insufficient balance' });
            return;
        }

        //Find Operation ID and cost for the operation
        const operation = await Operation.findOne({ type: "square_root" });

        // Perform the square root operation and update the balance
        const result = Math.sqrt(parseInt(req.body.num));
        // update user balance and save operation record
        const record = await utils.saveData(req.user, operation, userData, result);
        if (record) {
            res.status(200).json({
                result: record.operation_response
            });

        } else {
            res.status(400)
            throw new Error("Record Creation Failed");
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const division = asyncHandler(async (req, res) => {
    try {
        // Get the user information and check if the balance is enough
        const userData = await User.findOne({ _id: req.user._id });

        if (!userData || userData.status !== 'active' || userData.balance < 1) {
            res.status(403).json({ error: 'Insufficient balance' });
            return;
        }

        //Find Operation ID and cost for the operation
        const operation = await Operation.findOne({ type: "division" });
        // Perform the division operation
        const result = parseFloat(req.body.num1) / parseFloat(req.body.num2);
        // update user balance and save operation record
        const record = await utils.saveData(req.user, operation, userData, result);
        if (record) {
            res.status(200).json({
                result: record.operation_response
            });

        } else {
            res.status(400)
            throw new Error("Record Creation Failed");
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const random = asyncHandler(async (req, res) => {
    try {
        // Get the user information and check if the balance is enough
        const userData = await User.findOne({ _id: req.user._id });
        if (!userData || userData.status !== 'active' || userData.balance < 1) {
            res.status(403).json({ error: 'Insufficient balance' });
            return;
        }
        //Find Operation ID and cost for the operation
        const operation = await Operation.findOne({ type: "random" });
        // Perform the random operation 
        const result = await utils.generateRandomString();
        //Save user balance and operation records
        const record = await utils.saveData(req.user, operation, userData, result);
        if (record) {
            res.status(200).json({
                result: record.operation_response
            });
        } else {
            res.status(400)
            throw new Error("Record Creation Failed");
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})



module.exports = {
    createOperation,
    addition,
    substraction,
    multiplication,
    square_root,
    division,
    random

}