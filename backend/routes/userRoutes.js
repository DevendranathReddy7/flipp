import express from 'express'
const router = express.Router()
import { authUser, regUser, logout, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(regUser).get(protect, admin, getUsers)
router.post('/logout', logout)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:prdid').delete(protect, admin, deleteUser).get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

export default router