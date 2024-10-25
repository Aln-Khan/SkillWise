const mongoose = require('mongoose');

const mongoURI = process.env.DB_REMOTE || 'mongodb://localhost/Alain';

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => {
        console.error('Error connecting to Mongo:', err.message);
        process.exit(1);
    });

module.exports = mongoose;
