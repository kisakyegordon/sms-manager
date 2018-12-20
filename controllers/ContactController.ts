import Contact from '../models/Contact';


// get all messages
// export function getMessageById(req, res, next) {

//     const id = req.params.id;
//     Messages.find({receiver: id}, (err, messages) => {
//         if(err) {
//             res.status(500).json({ err });
//         }
//         res.status(200).json({ messages });
//     })
// }


// get all contacts
export function getAllContacts(req, res, next) {

    Contact.find((err, contacts) => {

        if(err) {
            res.status(500).json({ err });
        }
        res.status(200).json({ contacts });
    })
}

// get contact
export function getContact(req, res, next) {

    const phoneNumber = req.params.phone;
    Contact.find({phone: phoneNumber}, (err, contact) => {

        if(err) {
            res.status(500).json({ err });
        }
        res.status(200).json({ contact });
    })
}

// create a user
export  function createContact(req, res, next){
    const name = req.body.name;
    const phoneNumber = req.body.phone;

    if (!name){
        res.status(422).json({ error: "name is required" })
    }
    if (!phoneNumber){
        res.status(422).json({ error:"Phone Number is required" })
    }

    const user = new Contact( req.body )
    user.save((err, user) => {
        if (err){
            res.status(500).json({err});
        }
        res.status(201).json({user})
    });
}