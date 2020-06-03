const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');


module.exports = function(dbName) {
    dbName =dbConfig.url+dbName;

    const db=  mongoose.connect(dbName, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log("Successfully connected to the database");  
        //mongoose.connection.close();  
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

    return db;
}