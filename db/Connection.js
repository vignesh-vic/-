require('dotenv').config();

const mongoose = require("mongoose");

const connectDatabase = () => {
    return new Promise((resolve, reject) => {
        const uri = `mongodb+srv://${process.env.db_USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}`;
        mongoose.connect(uri, {
        }).then(con => {
            console.log(`MongoDB is connected`);
            resolve(con);
        }).catch(err => {
            reject(err);
        });
    });
}
module.exports = connectDatabase;