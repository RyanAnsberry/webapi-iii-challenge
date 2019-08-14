const express = 'express';

const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

    db.insert()
});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', validateUserId, (req, res) => {

});

router.get('/:id', validateUserId, (req, res) => {

});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    db.getById(id)
    .then(user => {
        if (user) {
            next();
        } else {
            res.status(400).json({ message: 'Invalid user id' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error processing request'
        });
    });
};

function validateUser(req, res, next) {
    const newUser = req.body;
    console.log('new user', newUser);
    try {
        if (!newUser) {
            res.status(400).json({ message: 'Missing user data' });
        } else if(!newUser.name) {
            res.status(400).json({ message: "missing required name field" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error processing request'
        });
    }

};

function validatePost(req, res, next) {

};

module.exports = router;
