var Comment = require('../Model/model.client');
var mailer = require("nodemailer"); 
const zoho = require('@trifoia/zcrmsdk');
const config = require('./zoho.crm');
const fs = require('fs');
    module.exports.getComment = function( req , res ,next ) {
        zoho.initialize(config).then((client) => {
            client.API.MODULES.get({
                module: 'Contacts',
                params: {
                    page: 1,
                    per_page: 250,
                },
            }).then((response) => {
                res.json(JSON.parse(response.body));
                console.log(response.body);                
            }).catch(next);
        }).catch(next);
    
    };
    module.exports.posterComment=(req, res, next) => {
    var First_Name = req.body.First_Name;
    var Last_Name = req.body.Last_Name;
    var Email= req.body.Email;
    var Mobile= req.body.Mobile;
        zoho.initialize(config).then((client) => {
            client.API.MODULES.post({
                module: 'Contacts',
                body: {
                    // Pay ATTENTION! Data is an array!
                    data: [
                      {
                        First_Name: First_Name,
                        Last_Name: Last_Name,
                        Email: Email,
                        Mobile: Mobile,
                      }
                    ],
                },
            }).then((data) => {
                  Comment.find()
            .then(note0 => {
                if(note0.length==0) {
                    id = 0;
                    console.log('mbola',id);
                    
                }else{
                    id = parseInt(note0[note0.length-1].id)+1;
                }

            const insert = new Comment({_id:id,First_Name: First_Name,Last_Name: Last_Name,Email: Email,Mobile: Mobile});
            insert.save()
                .then(()=>{
                    Comment.find()
                        .then(note=>{
                           // res.send(note);
                        })
                })
                .catch(e=>{
                    res.status(500).send({mes:e.mes || "erreur"})
                })
            })
                const { k } = JSON.parse(data.body);
                console.log(data.body);
                
    
                res.json({ k });
            });
        });
    };



  