const express = require('express')
const routes = express.Router()
const juegos = require('../datos/juegos.json')
const proxJuegos = require('../datos/proximos_juegos.json')
const clasificarJuegos = require('../clasificarJuegos')

let listaProxJuegos = clasificarJuegos.clasificarJuegos(proxJuegos)

routes.get('/', (req, res) => {


    res.render('index', {proximosJuegos : listaProxJuegos})
})


routes.get('/juegos', (req, res) =>{
    res.render('./pages/juegos.ejs', {infoJuegos : juegos})
})



routes.get('/juegos/:nro', (req, res) =>{

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

routes.get('/busqueda/:nombre', (req, res) =>{
    res.render('./pages/juegos.ejs', {infoJuegos : juegos})
})  


routes.get('/noticias', (req, res) =>{
    res.render('./pages/noticias.ejs')
})


module.exports = routes