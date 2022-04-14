const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = async (req,res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname,'..','public/post-img',image.name),async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/post-img/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/')        
    })
}
