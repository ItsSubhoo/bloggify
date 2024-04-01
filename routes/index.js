var express = require('express');
const passport = require('passport');
const localStrategy=require("passport-local");
const usermodel = require('./users');
const { YoutubeTranscript } =require('youtube-transcript') ;
const blogModel=require('./blog');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const video= "https://youtu.be/_HNMEGkjzsE?si=qmCRGEhJh7hOciZq";
const genAI = new GoogleGenerativeAI("AIzaSyBYpC9l0aFXo9kXLIUTwkwX3wOtraVS700");
passport.use(new localStrategy(usermodel.authenticate()));
var router = express.Router();
var newtext="";



const text=require('./youtubetranscript');



router.post('/register',function(req,res){

  var userdata=new usermodel({
    username:req.body.username,
    name:req.body.name
  })
  usermodel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/');
    })
  })


})

router.post('/login',passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}),function(req,res){});


router.get('/signup',function(req,res){

  res.render('register')
})
/* GET home page. */
router.get('/welcome',function(req,res){
    res.render('login');
})

router.get('/',async function(req, res, next) {
  console.log("hi");
  console.log(text);
  var blogs;
  

  if(req.session && req.session.passport && req.session.passport.user){
    const userdata = await usermodel.findById(req.user).populate('blog');
    const blog=userdata.blog;

    blogs=blog;

    // blogs=bb;
  }

  





  res.render('index', { user: req.user , text:newtext,blog:blogs});
  newtext="";
});

router.get('/logout',function(req,res){

  req.logout(function(err){
    if(err){
      return next(err);


    }
    res.redirect('/');
  });
});




router.post('/create',async function(req, res){
try{
  var url =req.body.vurl

  let  response= await YoutubeTranscript.fetchTranscript(url).then(console.log("hi"));
  console.log(response);
  
 
  if(response){
  
  try { const concatenatedText = response.map(item => item.text).join(' ');
    // console.log(concatenatedText);
  
  
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = concatenatedText+"Using this context from a video make a professional blog ";
  
    const result = await model.generateContent(prompt);
    const responseGemini =  result.response;
    const text = responseGemini.text();
    newtext=text;
    console.log(text);} catch (e) {
      console.log(e);
    }
  
  }
    









  
  
  if(req.session && req.session.passport && req.session.passport.user){
  var user = await usermodel.findOne({ username: req.session.passport.user });


  var blog = await blogModel.create({
    link:req.body.vurl,
    blog:newtext,
    user:user._id
  });

  user.blog.push(blog._id);
  await user.save();
  await blog.save();
 console.log(user);
}



















  res.redirect('/');
} catch(error){
  console.log(error);
}


})









module.exports = router;
