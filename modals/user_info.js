const mongoose = require('mongoose');
const user_schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
module.exports=mongoose.model('user_info',user_schema);