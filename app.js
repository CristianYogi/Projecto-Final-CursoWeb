const express = require('express')
const app = express()
const path = require('path')
const juegos = require('./datos/juegos.json')
const proxJuegos = require('./datos/proximos_juegos.json')
const clasificarJuegos = require('./clasificarJuegos')



app.use(express.json())

let listaProxJuegos = clasificarJuegos.clasificarJuegos(proxJuegos)




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))


// RUTAS
app.get('/', (req, res) => {


    res.render('index', {proximosJuegos : listaProxJuegos})
})






app.get('/juegos', (req, res) =>{
    res.render('./pages/juegos.ejs', {infoJuegos : juegos})
})



app.get('/juegos/:nro', (req, res) =>{

    let juegoEncontardo  
    juegos.forEach(juego => {
        if(juego.id == req.params.nro){
            juegoEncontardo = juego
        }
    });
    
    if(juegoEncontardo){
        res.render('./pages/info_juego.ejs', {juego : juegoEncontardo})
    }else{
        res.send("No se encuentra el juego")
    }
    
})

app.get('/busqueda/:nombre', (req, res) =>{
    res.render('./pages/juegos.ejs', {infoJuegos : juegos})
})  


app.get('/noticias', (req, res) =>{
    res.render('./pages/noticias.ejs')
})


// ESCUCHANDO
app.listen(3000, () => {
    console.log("Servidor Iniciado")
})