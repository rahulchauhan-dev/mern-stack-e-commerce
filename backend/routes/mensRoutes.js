import express from 'express'
import { getMenswearByCategory, getMenswearProduct } from '../controllers/productControllers.js'
const router = express.Router()


router.route('/:category').get(getMenswearByCategory)
router.route('/:category/:id').get(getMenswearProduct)

export default router