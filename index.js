require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()

morgan.token('data', (req) => {
    if(req.method==='POST'){
        return JSON.stringify(req.body)
    }
    return ''
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const NoOfPeople = persons.length
    response.send(`<p>Phonebook has info for ${NoOfPeople} people</p><p>${Date()}</p>`)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(element => element.id !== id)

    response.status(204).end()
})



app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(element => element.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
    
})

function getRandomInt() {
    return Math.floor(Math.random() * 1000);
  }


app.post('/api/persons', (request, response) => {
    const person = {...request.body}
    person.id = getRandomInt()
    
    if(!person.name || !person.number){
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    if(persons.some(element => element.name === person.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const personNew = new Person({
        name: person.name,
        number: person.number,
    })

    personNew.save().then(element => {
        response.json(element)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})