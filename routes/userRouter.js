const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.use(express.json());
router.post('/register', userControllers.registerUser);
router.post('/login', userControllers.loginUser);
router.get('/:id', userControllers.getUserById);
router.put('/:id', userControllers.updateUserById);
router.delete('/:id', userControllers.deleteUserById);
router.get('/:id/file-and-folders', userControllers.getFilesandFolders);

module.exports = router;
