const juegos = require('../datos/juegos.json')
const proxJuegos = require('../datos/proximos_juegos.json')
const listaTop = require('../datos/top.json')

const clasificarJuegos = require('../clasificarJuegos')


const renderIndex = (req, res) => {
    res.render('index', {proximosJuegos : getProximosJuegos(), listaTop : getTop5()})
}


const renderJuegos = (req, res) => {
    res.render('./pages/juegos.ejs', {infoJuegos : juegos})
}

const busquedaPorNombre = (req, res) => {

    let juegosEncontrados = []
    juegos.forEach(juego => {
        
        if(juego.titulo.toLowerCase().replace(/\s/g, '').includes(req.query.nombre.toLowerCase().replace(/\s/g, ''))){
            juegosEncontrados.push(juego)
        }
    });
    
    if(juegosEncontrados.length > 0){
        res.render('./pages/juegos.ejs', {infoJuegos : juegosEncontrados})
    }else{
        res.render('./pages/pagina_error.ejs',{nombre : req.query.nombre})
    }

}

const busquedaPorID = (req, res) => {
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
}

//FUNCIONALIDADES
const getProximosJuegos = () =>{
    return clasificarJuegos.clasificarJuegos(proxJuegos)
}



const getTop5 = () =>{
    
    listaTop.sort((a, b) => (a.puntuacion < b.puntuacion) ? 1 : -1)

    return listaTop
}


module.exports = {renderIndex, busquedaPorNombre, busquedaPorID, renderJuegos}

