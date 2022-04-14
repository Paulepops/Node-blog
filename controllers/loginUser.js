const bcript = require('bcrypt')
const User = require('../models/User')

global.thisUser = null;

module.exports = (req,res) => {
    const {username, password} = req.body

    User.findOne({username: username}, function(error, user){
        if (user) {
            bcript.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    thisUser = username
                    // console.log(user._id)
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            console.log('/auth/login::', user)
            res.redirect('/auth/login')
        }
    })
}