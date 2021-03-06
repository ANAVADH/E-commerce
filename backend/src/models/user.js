const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
firstName:{
type:String,
required:true,
trim:true,
min:3,
max:20
},
lastName:{
    type:String,
    required:true,
    trim:true,
    min:1,
    max:20
    },
username:{
    type:String,
    required:true,
    trim:true,
    index:true,
    lowercase:true,
    unique:true 
},
email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    lowercase:true
},
hash_password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:['user','admin'],
    default:'admin'
},

contactNumber:{type:String},
profilePicture:{type:String}

},{timestamps:true})


userSchema.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
})

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compareSync(password,this.hash_password)

    },
}


module.exports = mongoose.model('User',userSchema)