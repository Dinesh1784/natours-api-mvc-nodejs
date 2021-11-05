const dotenv = require('dotenv');
const mongoose = require('mongoose');

// for synchronous rejection
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  // 0 stands for success 1 stands for unhandled exception
  console.log('UNCAUGHT EXCEPTION --> SHUTTING DOWN');
  process.exit(1);
});

const app = require('./app');

//dot env config
dotenv.config({
  path: './config.env',
});
//mongodb config
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MONGODB CONNECTION SUCCESSFULL');
  });
// .catch((err) => {
//   console.log('DB ERROR');
// });

//server config
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

// to handle unhandle rejection event
// or async unhandle rejction
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  // 0 stands for success 1 stands for unhandled exception
  console.log('UNHANDLED REJECTION --> SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});

// // for synchronous rejection
// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   // 0 stands for success 1 stands for unhandled exception
//   console.log('UNCAUGHT EXCEPTION --> SHUTTING DOWN');
//   server.close(() => {
//     process.exit(1);
//   });
// });
