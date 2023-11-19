const mongoose = require('mongoose');
const readLine = require('readline');

let dbURL = 'mongodb://127.0.0.1/travlr';
if (process.env.NODE_ENV === 'production') {
    dbURL = process.env.DB_HOST || process.env.MONGODB_URI;
}

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewURLParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }), 1000);
}

mongoose.connection.on('connected', () => {
    console.log('connected');
});

mongoose.connnection.on('error', err => {
    console.log('Mongoose connection error:' + err);
    return connect();
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

if (process.platform === 'win32') {
    const rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
      });
      rl.on ('SIGINT', () => {
        process.emit ("SIGINT");
      });
}

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {                         
        console.log(`Mongoose disconnected through ${msg}`);     
        callback();                                              
      });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {          
        process.kill(process.pid, 'SIGUSR2');              
      });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {          
        process.exit(0);                                   
      });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {      
        process.exit(0);                                   
      });
});

connect();

// bring in the Mongoose Schema
require('./travlr');