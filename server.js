/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(`Uncaught exception: ${err.message}`);
    // Close server & exit process
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.log(err);
    });
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);

process.on('unhandledRejection', (err) => {
    console.log(`Unhandled rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
