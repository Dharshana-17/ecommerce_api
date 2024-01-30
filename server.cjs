// const { default: bodyParser } = require('body-parser')
// const express = require('express')
// const bodypar=require('body-parser')
// const { connectToDb,getdb } = require('./db.cjs')

// const app = express()
// app.use(express.static(__dirname))
// app.use(bodypar.json()) 

// let db

// connectToDb(function(error) 
// {
//     if(!error)
//     {
//         app.listen(1003)
//         console.log('listening')
//         db=getdb() 
//         // console.log(db)
//     }
//     else{
//         console.log(error)
//     }
// })

// app.post('/add-rec', function(request, response) 
// {
//     db.collection('date')
//     .insertOne(request.body).then(function() {
//         response.status(201).json({
//             'status' : 'data successfully entered'
//         })
//     }).catch(function(error) {
//         response.status(500).json({
//             'error' : error
//         })
//     })
// })







const express = require('express')
const bodyParser = require('body-parser')
const {connectToDb,getDb} = require('./db.cjs')
const {ObjectId} =require('mongodb')
const app = express()
let db
app.use(express.static(__dirname))
app.use(bodyParser.json())

connectToDb(function(error){
    if(!error){
        const port = process.env.PORT || 1001
        app.listen(port)
        db= getDb()
        console.log(db)

    }
    else{
        console.log(error)
    }
})


app.get('/get-data', function(request, response) {
    const entries = []
    db.collection('date')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function(error) {
        response.status(404).json({
            'error' : error
        })
    })
})

