const express = require('express');

const db = require('./userDb');

const router = express.Router();

router.post('/',validateUser ,(req, res) => {
    const  { name }  = req.body;
    db.insert({ name })
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        res.status(500).json({ message: `Error creating user, ${err.message}` });
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
    const { userId, text } = req.body;
    posts
      .insert({ userId, text })
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ message: `Database error, ${err.message}` });
      });
});

router.get('/', (req, res) => {
    db.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
        res.status(500).json({ message: `Database error, ${err.message}` });
    });
});

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    db.getById(id)
      .then(user => {
        if (user === 0) {
            res.status(404).json({ message: `No user by that Id in the DB, ${err.message}` });
        }
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ message: `Database error, ${err.message}` });
      });
});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(userRemoved => {
      if (userRemoved === 0) {
        res.status(404).json({ message: `No user by that Id, ${err.message}` });
      } else {
        res.json({ success: 'User Removed' });
      }
    })
    .catch(err => {
        res.status(500).json({ message: `Database error, ${err.message}` });
    });
});

router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.update( {user_id: id},  {name})
      .then(response => {
        if (response === 0) {
            res.status(404).json({ message: `No user by that Id, ${err.message}` });
        } else {
          db.find(id).then(user => {
            res.json(user);
          });
        }
      })
      .catch(err => {
        res.status(500).json({ message: `Database error, ${err.message}` });
      });
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
    const { name } = req.body;
    try {
        if (!name) {
            res.status(400).json({ message: "missing required name field" })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error processing request'
        });
    }
};

function validateUser(req, res, next) {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  };

function validatePost(req, res, next) {
    const { postBody }= req.body;
    if(!postBody) {
        res.status(400).json({ message: "missing post data" });
    } else if (!postBody.name) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }
};

module.exports = router;
