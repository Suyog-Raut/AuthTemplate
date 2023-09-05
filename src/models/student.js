import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

import passportLocalMongoose from 'passport-local-mongoose';

var Student = new Schema({   
    email: {type: String, required:true, unique:true},
    username : {type: String, unique: true, required:true},
});

Student.plugin(passportLocalMongoose);

export default model('Student', Student);