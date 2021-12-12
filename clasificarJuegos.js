const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]




function obtenerFecha(fecha){
    let dd = fecha.getDate();
    let mm = fecha.getMonth() + 1; 
    let yyyy = fecha.getFullYear();
      
    return {dia : dd, mes: mm, anio: yyyy};
}

function llenarJuegosClasificados(mesActual, lista){

    for (let i = mesActual; i < (meses.length); i++) {
        lista[meses[i]] = []
    }
    lista["SigAño"] = []
    return lista
}



function formatearFecha(fecha){
    let fechaFormateada = []
    let aux = ""
    for (let i = 0; i < fecha.length; i++) {
        
        if(fecha[i] == "/"){
            fechaFormateada.push(aux)
            aux = ""
        }else{
            aux += fecha[i]
        }
        
    }
    fechaFormateada.push(aux)


    return `${fechaFormateada[1]}/${fechaFormateada[0]}/${fechaFormateada[2]}`

     

}

function clasificarJuegos(lista = [""]){
    let juegosClasificados = {}
    //ELIJO UNA FECHA ARBITRARIA POR QUE SI PONGO LA FECHA ACTUAL ESTA ES MES 12 Y YA NO HAY MESES PARA MOSTRAR SOLO LOS JUEGOS DEL AÑO QUE VIENE, PERO AL DEJAR VACIO TOMARIA LA FECHA DE HOY
    let fechaHoy = new Date("4/5/2021")
    fechaHoy = obtenerFecha(fechaHoy)
    
    juegosClasificados = llenarJuegosClasificados(fechaHoy.mes, juegosClasificados)
    
    
    lista.forEach(juego => {

        let fechaJuego = new Date(formatearFecha(juego.fecha))

        
        fechaJuego = obtenerFecha(fechaJuego)
        let fechaJuegoString = `${fechaJuego.dia}/${fechaJuego.mes}/${fechaJuego.anio}`

        if(fechaJuego.anio - fechaHoy.anio == 1){
            juegosClasificados["SigAño"].push([juego.titulo, fechaJuegoString])
            
        }else if (fechaJuego.mes > fechaHoy.mes){
            juegosClasificados[meses[fechaJuego.mes - 1]].push([juego.titulo, fechaJuegoString])
        }

        
    });

    return juegosClasificados

}

module.exports = {clasificarJuegos}
