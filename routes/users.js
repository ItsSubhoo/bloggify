const mongoose=require("mongoose");
const plm = require("passport-local-mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/bloggify");
mongoose.connect("mongodb+srv://subhajitlai:eDgqscVY2XR7P5RJ@bloggify.5k9txlb.mongodb.net/bloggify");
const userSchema=mongoose.Schema({
  username: String,
  name:String,
  password:String,
  blog:[{
       type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
  }]

});
userSchema.plugin(plm);
const usermodel= mongoose.model("user",userSchema);

module.exports = usermodel;