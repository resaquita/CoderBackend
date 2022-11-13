const { default: mongoose } = require('mongoose');

const dbConfig = require('../../db/db.config');

class MongoContainer {

    constructor(collection, schema){
        this.model = mongoose.model(collection, schema);
    }

    static async connect(){
        await mongoose.connect(dbConfig.mongodb.uri)
    }
    static async disconnect(){
        await mongoose.disconnect()
    }
   
    async getAll(filter = {}){
            const documents = await this.model.find(filter, {__v: 0}).lean();
            return documents
   }
    async getById(id){
        const document = await this.model.findOne({ _id: id}, {__v: 0});
        if(!document){
            const message = `Resource with id ${id} doesn't exist`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return document
    }
    async save(item){
        try{

            const newDocument = new this.model(item);
            return await newDocument.save();
        }
        catch(error){
            console.log(error.message)
        }
    }
    async update(id, item){
        const updatedDocument = await this.model.updateOne(
            { _id: id },
            { $set: {...item}}
        );

        if (!updatedDocument.matchedCount){
            const message = `Resource with id ${id} doesn't exist`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return updatedDocument;
    }
    async delete(id){
        return await this.model.deleteOne({ _id:id });
    }

}

module.exports = MongoContainer;