const express = require('express')
const { route } = require('express/lib/application')
const routes = express.Router()
const {renderIndex, busquedaPorNombre, busquedaPorID, renderJuegos} = require('../controller/controller')


routes.get('/', renderIndex)


routes.get('/busqueda', busquedaPorNombre)


routes.get('/juegos', renderJuegos)


routes.get('/juegos/:nro', busquedaPorID)


routes.get('/noticias', (req, res) =>{
    res.render('./pages/noticias.ejs')
})


module.exports = routes