const express = require('express');
const router = express.Router();
const sendMail = require('../plugins/emails');
const Mail = require('../models/mails');

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/cursos', (req, res) => {
    res.render('courses.html');
});

router.get('/about', (req, res) => {
    res.render('about.html');
});

router.get('/colegio', (req, res) => {
    res.render('colegio.html');
});

router.get('/dbmails', async (req, res) => {
    const mails = await Mail.find();
    res.render('db/mails', {
        mails
    });
});

router.get('/mail/delete/:id', async (req, res) => {
    const {id} = req.params;
    await Mail.remove({_id: id});
    res.redirect('/dbmails');
});

router.post('/processMail', async (req, res) => {
    const {id, dprocessed} = req.body;
    const mail = await Mail.findById(id);
    mail.dprocessed = dprocessed;
    await mail.save();
    res.json({msg: "processed", status: 1});    
});

router.post('/addMail', async(req, res) => {
    const mail = new Mail(req.body);
    await mail.save();
    res.json({msg: "sent", status: 1});    
});

router.post('/send', async (req, res) => {
    try {
        const jData = req.body;
        await sendMail(jData);
        res.json({msg: "sent", status: 1});    
    } catch (error) {
        console.log(error);
        res.json({msg: error, status: 0});    
    }    
});

module.exports = router;