const express = require('express')
const app = express()

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const NoOfPeople = persons.length
    response.send(`<p>Phonebook has info for ${NoOfPeople} people</p><p>${Date()}</p>`)
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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})