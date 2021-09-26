
/*
var nombre="Franco Giglio";
var altura= 169;

var concatenar= nombre + " " + altura;
var datos=document.getElementById("datos");

datos.innerHTML =`
<h1> Soy la cajita de datos </h1>
<h2> Mi nombre es: ${nombre}</h2>
<h3> Mi altura es: ${altura}cm</h3>
`;
//Condicional
if(altura>= 170){
    datos.innerHTML +=`
    <h3> Sos una persona alta </h3>;
    
    `
}else {
    datos.innerHTML +=`
    <h3> Sos una persona baja </h3>;
    `
}

// Ciclo for
for(var i=2010; i<=2020; i++){
    datos.innerHTML += '<h2>Estamos en el año:' +i;
}

function MostrarMiNombre(nombre, altura){
    var misDatos=`
    <h1> Soy la cajita de datos </h1>
    <h2> Mi nombre es: ${nombre}</h2>
    <h3> Mi altura es: ${altura}cm</h3>
`;
    return misDatos;
}
function imprimir(){
    var datos=document.getElementById("datos");
    datos.innerHTML =MostrarMiNombre("Franco", 180);
    
;


}
imprimir();

var nombres= ['Franco','Luca','Camila', 'Jose'];
document.write('<h1>Listado de nombres</h1>');
/*
for (i=0; i<nombres.length;i++){
    document.write(nombres[i] +'<br/>');
}

nombres.forEach(nombre => {
    document.write(nombre +"<br/>");

});
*/
var coche ={
    modelo: "Peugeot 308",
    maxima: 180,
    antiguedad: 2014,
    MostrarDatos(){
        console.log(this.modelo,this.maxima,this.antiguedad);

    },
    propiedad1: "valor x"
};
document.write("<h1>"+ coche.maxima + "</h1>")
coche.MostrarDatos();
console.log(coche);

let saludar= new Promise ((resolve,reject) =>{
  setTimeout(() => {
      let saludo= "Hola mundo que tal";
      
      if (saludo){
        resolve(saludo);
      }else{
          reject("No hay saludo");
      }
  }, 4000);
});
saludar
.then(resultado=>{
    alert(resultado);

})
.catch(err => {
    alert(err);

});