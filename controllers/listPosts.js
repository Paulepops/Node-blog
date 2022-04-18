const BlogPost = require('../models/BlogPost')

module.exports = async (req,res) => {
    const blogposts = await BlogPost.find({}).populate('userid')
    // console.log(blogposts)
    // console.log(req.session)
    res.render('olderPosts',{
        blogposts
    });
}
