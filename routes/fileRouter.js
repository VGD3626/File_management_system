const express = require("express");
const Files = require('../models/file');
var router = express.Router();



router.use(express.json());

router.get('/', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({mess:"Hello World!"});
    return;
});

module.exports = router

