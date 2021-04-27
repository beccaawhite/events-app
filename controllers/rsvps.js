const Post = require('../models/post');

module.exports = {
    create,
    deleteRsvp
}

async function create(req, res, isRsvp){
 
    try {
        const post = await Post.findById(req.params.id);
        post.rsvp.push({username: req.user.username, userId: req.user._id}); //mutating a document
        post.isRsvp = true
        await post.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.json({data: err})
    }
    
}

async function deleteRsvp(req, res){
    try {
        
        const post = await Post.findOne({'rsvp._id': req.params.id, 'rsvp.username': req.user.username});
        post.rsvp.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await post.save() // after you mutate a document you must save
        res.json({data: 'like removed'})
    } catch(err){
        res.json({error: err})
    }
}
