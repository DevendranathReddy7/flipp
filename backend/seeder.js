import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
import users from "./data/users.js";
import { product } from "./data/Products.js";
import User from './modals/userModal.js'
import Product from './modals/productModal.js'
import Order from './modals/orderModal.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(users)
        const adminUser = createUsers[0]._id

        const sampleProducts = product.map((prd) => {
            return { ...prd, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported'.green.inverse);
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)

    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}