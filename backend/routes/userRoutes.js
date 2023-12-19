import express from 'express'
const router = express.Router()
import { authUser, regUser, logout, getUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController'

router.route('/').post(regUser).get(getUsers)
router.post('/logout', logout)
router.post('/login', authUser)
router.route('/profile').get(getUserProfile).put(updateUser)
router.route('/:prdid').delete(deleteUser).get(getUserById).put(updateUser)

export default router