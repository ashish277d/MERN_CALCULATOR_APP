const express = require('express')
const router = express.Router()
const {
  createOperation,
  addition,
  substraction,
  multiplication,
  division,
  square_root,
  random

} = require('../controllers/operationController')
const { protect } = require('../middleware/authMiddleware')

router.post('/create', protect, createOperation)
router.post('/addition', protect, addition)
router.post('/substraction', protect, substraction)
router.post('/multiplication', protect, multiplication)
router.post('/division', protect, division)
router.post('/square_root', protect, square_root)
router.post('/random', protect, random)





module.exports = router