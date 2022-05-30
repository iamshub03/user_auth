//External Imports
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Internal Imports
const User = require('../Models/User');

router.post('/signin', (req, res) => {
    if(req.body.username !="" && req.body.password != "") {
        User.findOne({
            username : req.body.username
        }, function(err, docs) {
            if(err) {
                res.send({'success' : false, 'message' : 'Unexpected error - user login'});
            } else {
                if(docs != null) {
                    let key = jwt.sign(req.body.username, 'secret-key');
                    res.send({'success' : true, 'token' : key})
                } else {
                    res.send({'success' : false, 'message' : 'Invalid credentials. No user present.'});
                }
                
            }
        });

    } else {
        res.send("Username or password missing");
    }
});

router.post('/signup', (req, res) => {
    if(req.body.username !="" && req.body.password != "" && req.body.email != "" && req.body.fullname != "") {
        User.findOne({
            $or : [
                {
                    username : req.body.username
                },
                {
                    email : req.body.email
                }
            ]
        }, (err, docs) => {
            if(err) {
                res.send("Unexpected Error Occurred..");
            } else {
                if(!isEmpty(docs)) {
                    res.send({'success' : false,'message' :"User with same username or email present"});
                }
            }
        });
        
        let newUser = new User({
            username    : req.body.username,
            password    : req.body.password,
            email       : req.body.email,
            fullname    : req.body.fullname
        });

        newUser.save((err, result) => {
            if(err) {
                res.send({
                    'success' : false,
                    'message' : err
                });
            } else {
                let key = jwt.sign({'username' : req.body.username, 'password' : req.body.email}, 'secret-key');
                res.send({
                    'success' : true,
                    'token' : key
                });
            }
        });
    } else {
        res.send("Fields missing!");
    }
});

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = router;