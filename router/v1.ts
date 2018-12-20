import * as express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/PostController';
import { sendSms, getSmsByNumber } from '../controllers/SmsController';
import { createContact, getContact, getAllContacts } from '../controllers/ContactController';




export default (app) => {
    const apiRoutes = express.Router();
    const postRoutes = express.Router();


/*****************************
    === post routes ====
******************************/

    // append postroutes to apiroutes
    apiRoutes.use('/posts', postRoutes);

    // get  all posts
    postRoutes.get('/', getAllPosts);

    // get post by id
    postRoutes.get('/:id', getPostById);

    // create post
    postRoutes.post('/', createPost);

    // update post
    postRoutes.put('/:id', updatePost)

    // delete post
    postRoutes.delete('/:id', deletePost)

/*****************************
    ===users routes ====
******************************/

    // create a user
    apiRoutes.post('/contact', createContact);

    // get all users
    apiRoutes.get('/contact', getAllContacts);

    // get user
    apiRoutes.get('/contact/:phone', getContact);

/*****************************
    === message routes ====
******************************/

    //send message
    apiRoutes.post('/sms/:phone', sendSms);

    //get all messages
    apiRoutes.get('/sms/:phone', getSmsByNumber);

    // append all routes to app
    app.use('/api', apiRoutes);


}