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
    var username = req.body.username
    var gmail = req.body.gmail
        zoho.initialize(config).then((client) => {
            client.API.MODULES.post({
                module: 'Contacts',
                body: {
                    // Pay ATTENTION! Data is an array!
                    data: [
                      {
                        First_Name: "e",
                        Last_Name: "g",
                        Email: "andrana@gmail.com",
                        Mobile: "1",
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

            const insert = new Comment({_id:id,data});
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
                console.log({k});
                
    
                res.json({ k });
            });
        });
    };



  