import Contact from '../models/Contact';
import Sms from '../models/Sms';


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



// delete contact
export function deleteContact(req, res, next) {

    const id = req.params.id;
    let phoneNumber;

    // pick phone from contact
    console.log("before", phoneNumber)
    Contact.findOne( {_id:id}, 'phone', (err,phone) => {
        if (err) return err;
        // @ts-ignore
        phoneNumber = phone.phone;
        console.log("Inside findone", phoneNumber)
        Sms.updateMany( {receiver: phoneNumber}, {$set: { receiver:-1 } }, {multi: true}, (err) => {
        if(err) return err;
        });
        // delete sent messages
        Sms.deleteMany( {sender: phoneNumber }, (err) => {
        if(err) return err;
        res.status(200).json({ message:"Messages sent by contact, successfully deleted"});
    });

    })

    // delete sent messages
    Sms.deleteMany( {sender: phoneNumber }, (err) => {
        console.log("Inside Delete", phoneNumber)
        if(err) return err;
        // res.status(200).json({ message:"Messages sent by contact, successfully deleted"});
    });

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