const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer = require('multer');
const upload = multer();
// /*---------- Public Routes ----------*/
router.post('/add', upload.single('photo'), postsCtrl.create);
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index);
router.delete('/:id', postsCtrl.deletePost)
router.get('/:id', postsCtrl.show)

router.put('/', postsCtrl.editPost)


/*---------- Protected Routes ----------*/



module.exports = router;