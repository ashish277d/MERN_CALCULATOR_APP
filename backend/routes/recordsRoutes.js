const express = require('express')
const router = express.Router()
const {
    getRecords,
    deleteRecord,

} = require('../controllers/recordsController')
const { protect } = require('../middleware/authMiddleware')

router.get('/getRecords', protect, getRecords)
router.route('/:id').delete(protect, deleteRecord)





module.exports = router