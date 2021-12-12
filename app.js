const express = require('express')
const app = express()
const path = require('path')

const routes = require('./routes/routes')


app.use(express.json())






app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))


app.use('/', routes)





// ESCUCHANDO
app.listen(3000, () => {
    console.log("Servidor Iniciado")
})