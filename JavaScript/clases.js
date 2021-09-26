class Coche {
    constructor(modelo,velocidad,antiguedad){

        this.modelo= modelo;
        this.velocidad= velocidad;
        this.antiguedad= antiguedad;
    }
    aumentarVelocidad(){
        this.velocidad += 10;
    }
    reducirVelocidad(){
        this.velocidad -= 1;
    }
}
var coche1 = new Coche("ferrari", 290, 2014);
var coche2 = new Coche("Peugeot", 200, 2010);
var coche3 = new Coche("Fiat", 150, 2012);
var coche4 = new Coche("Ford", 100, 2000);

document.write("<h1>velocidad:" + coche1.velocidad + "</h1>")

console.log (coche1);
coche1.aumentarVelocidad();
coche1.aumentarVelocidad();
coche1.aumentarVelocidad();
coche1.aumentarVelocidad();
document.write("<h1>velocidad:" + coche1.velocidad + "</h1>")


console.log(coche2);