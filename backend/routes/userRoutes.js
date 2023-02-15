const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/userdetails', protect, getMe)

module.exports = router