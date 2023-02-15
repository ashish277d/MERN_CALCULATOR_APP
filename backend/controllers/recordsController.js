const Record = require("../models/recordModel")
const asyncHandler = require('express-async-handler')


const getRecords = asyncHandler(async (req, res) => {
    const records = await Record.find({ user: req.user._id })
    .populate('operation_id')
    .exec();

    const operations = records.map(record => {
        return {
          id: record._id,
          type: record.operation_id.type,
          cost: record.operation_id.cost,
          date: record.date,
          amount: record.amount,
          user_balance: record.user_balance,
          operation_response: record.operation_response
        };
      });

    res.status(200).json({ user: { id:  req.user._id }, operations: operations })
})

const deleteRecord = asyncHandler(async (req, res) => {
   
    try {
        const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    
        if (!deletedRecord) {
          return res.status(404).send({ message: 'Record not found' });
        }
    
        return res.send({ message: 'Record deleted successfully' });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
      }

})



module.exports = {
    getRecords,
    deleteRecord,
    //Update user to update status and balance
  }