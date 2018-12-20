import Sms from '../models/Sms';


// get all messages
export function getSmsByNumber(req, res, next) {

    const phoneNumber = req.params.phone;
    Sms.find({receiver: phoneNumber}, (err, messages) => {
        if(err) {
            res.status(500).json({ err });
        }
        res.status(200).json({ messages });
    })
}

// send  sms
export  function sendSms(req, res, next){
    const receiver = req.body.receiver;
    const message = req.body.message;
    const sender  = req.params.phone;


    if (!receiver){
        res.status(422).json({ error: "Receiver Number is required" })
    }
    if (!message){
        res.status(422).json({ error:"Message content is required" })
    }

    const sms = new Sms({ message, sender, receiver })
    sms.save((err, message) => {
        if (err){
            res.status(500).json({err});
        }
        res.status(201).json({ message })
    });
}