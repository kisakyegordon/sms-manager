import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema({

    name:{
        type: String
    },
    phone:{
        type: Number,
        unique:  true,
        required: true,
        dropDups: true
    }
});

export default mongoose.model('Contact', contactSchema)