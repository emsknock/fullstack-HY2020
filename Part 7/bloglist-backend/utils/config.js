require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI =
    `mongodb+srv://fullstack:${process.env.DB_PASS}@cluster0-x5cql.mongodb.net/blog?retryWrites=true&w=majority`;

module.exports = {
    MONGODB_URI,
    PORT
} 