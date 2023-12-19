import asyncHandler from "../middleware/asyncHandler";
import User from "../modals/userModal";

const authUser = asyncHandler(async (req, res) => {
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