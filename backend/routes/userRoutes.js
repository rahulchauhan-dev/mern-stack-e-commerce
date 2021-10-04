import express from 'express'
const router = express.Router()

import { getUserById, updateUser, getUsers, authUser, getUserProfile, registerUser, updateUserProfile, deleteUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router