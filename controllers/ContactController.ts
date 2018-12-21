import Contact from '../models/Contact';
import Sms from '../models/Sms';


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
        res.status(201).json({ "status":"Success", "data":user, "message": "Successfully added contact"})
    });
}

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

    const id = req.params.id;
    Contact.findById(id, (err, contact) => {

        if(err) {
            res.status(500).json({ err });
        }
        res.status(200).json({ contact });
    })
}

// delete contact
/**
This also goes ahead to delete all messages a contact sent and also updates references to the messages they received
 */
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
        res.status(200).json({ "status":"Success", "message":"Contact deleted, referenced messages updated"});
        });
    })
}