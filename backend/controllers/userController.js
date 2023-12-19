import asyncHandler from "../middleware/asyncHandler.js";
import User from "../modals/userModal.js";
import { Jwt } from "jsonwebtoken";
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days

        })
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
    res.send('auth user')
})


const regUser = asyncHandler(async (req, res) => {
    res.send('reg user')
})

const logout = asyncHandler(async (req, res) => {
    res.send('logout user')

})

const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
})

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id')
});

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})
export { authUser, regUser, logout, getUserProfile, getUsers, deleteUser, getUserById, updateUser }