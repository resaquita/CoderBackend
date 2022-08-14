class Usuario {

    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = []
        this.mascotas = []
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(titulo,autor){
        this.libros.push({title: `${titulo}`, autor: `${autor}`})
    }
    getBookNames(){
        return this.libros.map(function(a) {return a.title;})
    }

}

const user1 = new Usuario("carlos","ramirez");
console.log(user1.getFullName())
user1.addMascota("firulais")
user1.addBook("harry potter","J. K. Rowling")
user1.addBook("Rayuela","J. Cortazar")
console.log(user1)
console.log(user1.getBookNames())
console.log(user1.countMascotas())





