const mongoose=require("mongoose");


const blogSchema=mongoose.Schema({
    link:String,
    blog:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

});

const blogModel= mongoose.model("blog",blogSchema);

module.exports = blogModel;