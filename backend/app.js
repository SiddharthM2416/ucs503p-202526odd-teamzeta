//imports
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express()
const connectDB = require('./db/connect')
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccount.json')
//routers
const authRouter  = require('./routes/authRouter')
const transactionsRouter = require('./routes/transactionRouter')

// Initialize Firebase Admin (do this ONCE in your main index.js/server.js)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//middleware
app.use(express.json())
app.use(cors());


// //routes
// app.use('/app/v1/auth',authRouter)
app.use('/api/transactions',transactionsRouter)


//server
const port =3000;
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`App has started on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}
start();
