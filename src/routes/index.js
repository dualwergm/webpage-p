const express = require('express');
const router = express.Router();
const sendMail = require('../plugins/emails');

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