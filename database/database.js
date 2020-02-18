var mongoose = require('mongoose');

function connect() {
    try{
        mongoose.connect('mongodb://127.0.0.1/cardsgame', {
            useNewUrlParser: true
        });
        console.log('Database connected');
        
    }
    catch(e) {
        console.log(e);
    }
}

module.exports = connect;