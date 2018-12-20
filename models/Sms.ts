import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const smsSchema = new Schema({

    message:{
        type: String
    },
    sender:{
        type: Number
    },
    receiver:{
        type: Number
    },
    status:{
        type: Boolean,
        default: false
    },
    sent_date:{
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Sms', smsSchema);