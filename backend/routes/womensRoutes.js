import express from 'express'
import { getWomenswearByCategory, getWomenswearProduct } from '../controllers/productControllers.js'
const router = express.Router()


router.route('/:category').get(getWomenswearByCategory)

router.route('/:category/:id').get(getWomenswearProduct)

export default router