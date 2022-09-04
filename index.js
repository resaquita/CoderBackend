const fs = require('fs');

class Contenedor {

     constructor(nombreArchivo){
         this.name=nombreArchivo
        
    }
    
    async save(object){

        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            let ultimoIndice = contenidojson.length - 1
            let ultimoId = contenidojson[ultimoIndice].id
            object.id = ultimoId + 1
            let id = object.id
            contenidojson.push(object)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidojson))

            return id
        } 
        catch(error){
            console.log(error)
        }
        
    }
    async getBtId(id){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            const object = contenidojson.find(x => x.id === id)
            return object
        }
        catch(error){
            console.log(error)
        }
        
        return object
    }

    async getAll(){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            return contenidojson
        }
        catch(error){
            console.log(error)
        }
        return contenidojson
    }

    async getRandom(){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            let randomItem = contenidojson[Math.floor(Math.random()*contenidojson.length)]
            return randomItem
        }
        catch(error){
            console.log(error)
        }
        return randomItem
    }
    

    async deleteById(id){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            contenidojson.splice(contenidojson.findIndex(function(i){
                return i.id === id
            }),1);
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidojson));
        }
        catch(error){
            console.log(error)
        }
        
    }
    async deleteAll(){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            console.log(contenidojson)
            contenidojson = []
            console.log(contenidojson)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidojson));
        }
        catch(error){
            console.log(error)
        }
    }

}

module.exports = {Contenedor}

console.log(module)

const obj1 = {
    title: "gorra",
    price: 220,
    thumbnail: "http://image.com",
}
// const arch = new Contenedor("productos.json");

// arch.save(obj1)
//  arch.getBtId(2).then(result =>{
//      console.log(result)
//  })

//  arch.getAll().then(result =>{
//      console.log(result)
//  })

// arch.deleteById(2)

// arch.deleteAll()
