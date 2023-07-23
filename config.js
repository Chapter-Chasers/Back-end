require('dotenv').config();
module.exports = {
    QOUTE_API_URL : process.env.QOUTE_API_URL,
    PORT : process.env.PORT,
    BOOKS_API_URL : process.env.BOOKS_API_URL,
    DB_URL : process.env.DATABASE_URL,
    DB_NAME : process.env.DB_NAME,
};
