const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_Mig1ImTdjY6cz73G6WGnTDDG00EBMXefqL')

//API



//App config
const app =  express()


//Middleware
app.use(cors({origin:true}))
app.use(express.json())

// http://localhost:5001/clone-e10bb/us-central1/api

//API routes
app.get('/', (req, res) => res.status(200).send('My backend'))

app.get('/thejim', (req, res) => res.status(200).send('The Kudo'))

app.post('/payment/create', async (req, res) => {
  const total = req.query.total
  console.log('payment req recieved for', total)

  const paymentIntent = await stripe.paymentIntents.create({
      amount: total, 
      currency:'usd'
  })
  res.status(201).send({
    clientSecret: paymentIntent.client_secret
  })
})

// listen
exports.api = functions.https.onRequest(app)

//example endpoint
