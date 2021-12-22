const mongoose = require('mongoose');
const DB_NAME = 'ex-github-oauth';
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to ${DB_NAME} database.`);
    }).catch((error) => {
        console.error(`Database connection error: ${error}`);
    });