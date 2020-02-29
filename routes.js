const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mongourl } = require('./config/key');
const User = require('./modals/user_info');
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/login', (req, res) => {
        res.render('login',{err:''});
    });
    app.post('/login', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({ email: { $eq: email } }).then(data => {
            if (data.password == password)
                res.render('dashboard', { data: data })
            else
                res.render('login', { err: 'Password Not Matched ' })
        }).catch(err => {
            res.render('login', { err: 'Email or password is incorrect' })
            throw err;
        })
    });
    app.get('/signup', (req, res) => {
        res.render('signup');
    });
    app.post('/signup', (req, res) => {
       var name= req.body.name;
       var email= req.body.email;
       var password= req.body.password;
       console.log(name,email,password);
       var user=new User({
        name:name,
        email:email,
        password:password
        });
        user.save().then(data=>{
            console.log("saved");
            User.findOne({email:{$eq:email}}).then(data=>{
                res.render('dashboard',{data:data});
            })
        }).catch(err=>{
            console.log("err");
            res.render('signup',{data:err})
        })
    });
}