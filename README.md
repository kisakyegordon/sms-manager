# SMS Management Application

This is a simple sms management API for contacts.

The API is written in TypeScript which transpiles to javaScript.

- It Involves the following functionality :-

  - 1 - All sms sent by a Contact should be linked to them.

  - 2 - All sms sent to a Contact should be linked to them.

  - 3 - Deleting a contact removes the messages they sent and references to messages they received.


#### Prerequisites

What things you need to install the software and how to install them

```
- mongo database
- npm or yarn
```

## Install

    Clone the API  using git clone https://github.com/kisakyegordon/sms-manager

## Install Required  Libraries

    Enter the cloned directory using cd sms-manager.

    Run npm install, to install any dependant libraries.
## Start the API.

    Run tsc, to transpile TypeScript code to javaScript.
    Run yarn start, to start the API


# API Routes

| No        | End Point        | Method   | Functionality  |
| ------------- |:-------------:| -----:|-----:|
| 1     | /api/v1/contact  | POST | Adds a new contact |
| 2     | /api/v1/contact  | GET | Get all contacts |
| 3     | /api/v1/contact/:id  |GET | Get a single contact |
| 4     | /api/v1/contact/:id  | DELETE | Delete a single contact |
| 5     | /api/v1/sms/:phone  | POST | Sends an SMS Message |
| 6     | /api/v1/sms/:id | GET | Get a single sms message |
| 7     | /api/v1/sms/all/:phone  |GET | Get all messages for a single contact |




## Create a Contact

Send a `POST` request to the endpoint below, to add a contact

```
    /api/v1/contact
```
**Request:**

```
    {
        "name": "king",
        "phone": 0777359301
    }
```

**Response:**

```
    {
        "status": "Success",
        "data": {
            "_id": "5c1d525ca3c5558c49cc0b19",
            "name": "king",
            "phone": 66554477,
            "__v": 0
        },
        "message": "Successfully added contact"
    }
```


## Get all Contacts

Send a `GET` request to the endpoint below, to get all existing contacts

```
    /api/v1/contact
```

**Response:**

```
{
    "contacts": [
        {
            "_id": "5c1cf0036a35f345062ade79",
            "name": "mark",
            "phone": 66554411,
            "__v": 0
        },
        {
            "_id": "5c1cf00f6a35f345062ade7a",
            "name": "jenny",
            "phone": 66554422,
            "__v": 0
        }
    ]
}
```
## Get Single Contact

Send a `GET` request to the endpoint below

```
    /api/v1/contact/:id
```

**Response:**

```
{
    "contact": {
        "_id": "5c1cf0036a35f345062ade79",
        "name": "mark",
        "phone": 66554411,
        "__v": 0
    }
}
```

## Delete Single Contact

Send a `DELETE` request to the endpoint below
- This also deletes all messages sent by that contact, and also removes  references to that to messages sent to that contact.

```
    /api/v1/contact/:id
```

**Response:**

```
    {
        "status": "success",
        "message": "Contact deleted, referenced messages updated"
    }
```

## Send Sms Message

Send a `POST` request to the endpoint below, to send an sms message.
- When an sms is sent, its default status is `sent`, after a user  retrieves alone, the status is updated to `read`.

```
    /api/v1/sms/:phone
```

**Request:**

```
    {
        "message": "hello there",
        "receiver": 66554422
    }
```

**Response:**

```
{
    "message": {
        "sent_date": "2018-12-21T21:14:37.453Z",
        "_id": "5c1d57ce07182a944e22405f",
        "message": "hello there",
        "sender": 66554411,
        "receiver": 66554422,
        "status": "sent",
        "__v": 0
    }
}

```

## Get single Sms Message

Send a `GET` request to the endpoint below.
- When this message is retrieved the status changes to read.

```
    /api/v1/sms/:id
```


**Response:**

```
{
    "message": {
        "sent_date": "2018-12-21T21:14:37.453Z",
        "_id": "5c1d57ce07182a944e22405f",
        "message": "hello there",
        "sender": 66554411,
        "receiver": 66554422,
        "status": "read",
        "__v": 0
    }
}

```

## Get all sms messages for a single contact.

Send a `GET` request to the endpoint below

```
    /api/v1/sms/all/:phone
```


**Response:**

```
{
    "messages": [
        {
            "sent_date": "2018-12-21T21:14:37.453Z",
            "_id": "5c1d57c107182a944e22405e",
            "message": "kingo",
            "sender": 66554411,
            "receiver": 66554422,
            "status": "sent",
            "__v": 0
        },
        {
            "sent_date": "2018-12-21T21:14:37.453Z",
            "_id": "5c1d57ce07182a944e22405f",
            "message": "hello there",
            "sender": 66554411,
            "receiver": 66554422,
            "status": "read",
            "__v": 0
        }
    ]
}
```