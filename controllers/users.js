const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets

module.exports = {
  signup,
  login,
  profile,
  updateProfilePhoto
};

function signup(req, res) {
  console.log(req.body, req.file)

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  // FilePath unique name to be saved to our butckt
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
  //your bucket name goes where collectorcat is 
  //////////////////////////////////////////////////////////////////////////////////
  s3.upload(params, async function(err, data){
    console.log(data, 'from aws') // data.Location is our photoUrl that exists on aws
    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }



  })
  //////////////////////////////////////////////////////////////////////////////////
 
}

async function login(req, res) {
  try {
    //config by email, if want to change, do that here
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user is logged in')
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
   
    // Then find all the posts that belong to that user
    const posts = await Post.find({user: user._id});
    // console.log(posts, ' this posts')

    const allPosts = await Post.find()
    const test = allPosts.filter(post => {
      const currentUserId = user._id
      const doesUserIdExist = post.rsvp.some((rsvpObj) => {
        // console.log( String(currentUserId) == String(rsvpObj.userId))
        return String(currentUserId) == String(rsvpObj.userId)
      })

      if (doesUserIdExist){
        return post
      } 
    })
    console.log(test, " test from controller")

    res.status(200).json({posts: posts, user: user, rsvpEvents: test})
    
  } catch(err){
    console.log(err)
    res.send({err})
  }
}


function updateProfilePhoto(req, res){
  // confirm we access to our multipart/formdata request
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
  s3.upload(params, async function(err, data){
    console.log(data, err, 'from aws'); // data.Location is our photoUrl that exists on aws
    try {
      const updatedUser = await User.findOneAndUpdate({_id: req.user._id}, 
      {photoUrl: data.Location}, {new: true});
      console.log(updatedUser);
      const token = createJWT(updatedUser); // user is the payload so this is the object in our jwt
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      console.log(err);
      res.status(400).json(err);
    }
  })
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
