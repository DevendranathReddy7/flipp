import bcrypt from 'bcryptjs'

const users = [{
    name: 'Admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    iasAsmin: true
}, {
    name: 'Dev',
    email: 'dev@email.com',
    password: bcrypt.hashSync('123456', 10),
    iasAsmin: false
}, {
    name: 'Nitin',
    email: 'Nitin@email.com',
    password: bcrypt.hashSync('123456', 10),
    iasAsmin: false
}]

export default users