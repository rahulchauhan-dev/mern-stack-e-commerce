import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import contacts from './data/contacts.js'
import mensProd from './data/mensProducts.js'
import womensProd from './data/womensProducts.js'
import User from './models/userModel.js'
import { mensProducts, womensProducts } from './models/productModel.js'
import Order from './models/orderModel.js'
import Contact from './models/contactModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {

    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Contact.deleteMany()

        await mensProducts.deleteMany()
        await womensProducts.deleteMany()


        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id


        const mensProductData = mensProd.map(product => {
            return { ...product, user: adminUser }
        })

        const womensProductData = womensProd.map(product => {
            return { ...product, user: adminUser }
        })


        await mensProducts.insertMany(mensProductData)
        await womensProducts.insertMany(womensProductData)

        await Contact.insertMany(contacts)




        console.log('Data Imported!')
        process.exit()

    } catch (error) {
        console.error(`${error}`)
        process.exit(1)

    }
}

const destroyData = async () => {

    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Contact.deleteMany()


        await mensProducts.deleteMany()
        await womensProducts.deleteMany()



        console.log('Data Destroyed!')
        process.exit()

    } catch (error) {
        console.error(`${error}`)
        process.exit(1)

    }
}

if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}