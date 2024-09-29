const express = require("express");
const fileControllers = require("../controllers/fileControllers");
var router = express.Router();

router.post('/', fileControllers.createFile);
router.get('/:id', fileControllers.getFileById);
router.put('/:id', fileControllers.updateFileById);
router.delete('/:id', fileControllers.deleteFileById);

module.exports = router;