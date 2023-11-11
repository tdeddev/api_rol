const express = require('express')
const app = express()
const port = 4000;

app.listen(port, () => console.log(`App Listening on ${port}`))

app.get('/', (req, res) => {
    res.send('This is my API running...')
})

module.exports = app
