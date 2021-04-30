const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
    create,
    index,
    deletePost,
    show,
    editPost
}


async function create(req, res){
    // confirm we access to our multipart/formdata request
    console.log(req.body, req.file, req.user, "<req.user is being assinged in the config/auth middleware");

    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`;
        const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }

        s3.upload(params, async function(err, data) {
            // use our model to create a post
            // The data object is the response from aws, 
            // its the callback function to upload
            const post = await Post.create({
                caption: req.body.caption, 
                title: req.body.title,
                photoUrl: data.Location, 
                user: req.user,
                event_type: req.body.event_type,
                start_date: req.body.start_date,
                end_date: req.body.end_date

            })
            console.log(post, "THIS IS POST")
            

            // We have to populate the user on the post we just created
            // on a document you have to call execPopulate()
            
            const populatedPost = await post.populate('user').execPopulate();
            // userSchema.set('toObject') gets invoked, to delete the password
            // when we populate the user so we don't have to worry about sending over the password!


            // tells the client, success create worked
            res.status(201).json({post: populatedPost})
        })

    } catch(err){
        console.log(err)
        res.json({data: err})
    }

 }

async function index(req, res){
    try {

        // on a query aka .find({}) you just call .exec() to execulate the .populate('user')
        const posts = await Post.find({}).populate('user').exec()
        // userSchema.set('toObject') gets invoked, to delete the password
        // when we populate the user so we don't have to worry about sending over the password!
        res.status(200).json({posts})
    } catch(err){
        res.json(err)
    }
}

async function deletePost(req, res){
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({data: 'post deleted'})
    } catch(err){
        res.json({error: err})
    }
}

async function show(req, res){
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({post});

    } catch(err){
        console.log(err);
        res.send({err});
    }
}


// function for updating post info, very similar to the create
async function editPost(req, res){
    console.log("EDIT FUNC: ", req.body)
    // const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    // res.status(200).json(updatedPost);
    // try {
    //     // maybe finding it wrong
    //     const post = await Post.findById({_id: req.post._id});
    //     console.log(post,'post is here')
        
    //     post.title = req.body.title,
    //     post.caption = req.body.caption, 
    //     post.photoUrl = data.Location, 
    //     post.user = req.user,
    //     post.event_type = req.body.event_type,
    //     post.start_date = req.body.start_date,
    //     post.end_date = req.body.end_date

        
    //     await post.save();
    //     const token = createJWT(post);
    //     res.json({ token })
    
    //   } catch(err){
    //     return res.status(400).json(err);
    //   }


  
        // confirm we access to our multipart/formdata request
        const filePath = `${uuidv4()}${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
          console.log(data, err, 'from aws'); // data.Location is our photoUrl that exists on aws
          try {
            const updatedPost = await Post.findOneAndUpdate({_id: req.user._id}, 
            {photoUrl: data.Location}, {new: true});
            console.log(updatedPost);
            const token = createJWT(updatedPost); // user is the payload so this is the object in our jwt
            res.json({ token });
          } catch (err) {
            // Probably a duplicate email
            console.log(err);
            res.status(400).json(err);
          }
        })
      
}

