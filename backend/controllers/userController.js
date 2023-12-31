import asyncHandler from "../middleware/asyncHandler.js";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json({
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
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Email already taken!')
    }
    const user = await User.create({
        name, email, password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error('Invalid user!')
    }
    res.send('reg user')
})

const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn: new Date(0)

    })
    res.status(200).json({ message: 'You\'ve been logged out successfully' })

})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id)
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('user not found!')
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
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
export { authUser, regUser, logout, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }