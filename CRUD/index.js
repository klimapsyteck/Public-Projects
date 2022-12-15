const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Person = require('./models/Person')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/person', async (req, res) =>{
    const {name, approved} = req.body
    const person = {
        name,
        approved
    }

    try {
        Person.create(person)

        res.status(201).json('Created')
    } catch (error) {
        res.status(500).json({error: error})
    }
})

app.get('/', (req, res) =>{
    
    res.json({message: "Working"})
})
const DB_USER = 'klimapsyteck'
const DB_PASSWORD = 'jTMhRkC3CpAPHvVD'
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@crudapi.jae0sv6.mongodb.net/?retryWrites=true&w=majority`)
    .then( () => {
        console.log('Database Connected')
        app.listen(3000)
    })
    .catch(err => console.log(err))


