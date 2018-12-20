import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    timestamp: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true,
        default: ''
    },
    content: {
        type: String,
        default: '',
        required: true
    }
});

export default mongoose.model('Post', PostSchema)