import express from 'express';
import mongoose from "mongoose";
import passport from 'passport';
import session from 'express-session';
import routes from './src/routes/routes.js';
import LS from 'passport-local';
import bodyParser from 'body-parser';
import Student from './src/models/student.js';
const secret = 'your_secret';

const app = express();
const PORT = 4000;

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session({ 
  secret: 'Enter your secret key',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


routes(app);

const LocalStrategy = LS.Strategy;
passport.use(new LocalStrategy(Student.authenticate()));
// passport.use(Student.createStrategy());
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

const connectDb = async() => {
  try {
    const conn = await mongoose.connect('mongodb://localhost/authDB',{
    useNewUrlParser : true,
    useUnifiedTopology: true
  });
  console.log("MongoDb connected");}
  catch(error){
    console.error(error.message);
    process.exit(1);
  }
  }
  
  connectDb();

app.get('/', (req, res) => {
    res.send("Connected");
  })

app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`);
});




//const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

// const users = [
//   {id:1,name: "admin",password:"password"},
//   {id:1,name: "user",password:"password"}
// ];

// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: secret
// },(jwtPayload, done)=>{
//    const user= users.find((u)=> u.id === jwtPayload.sub);
//    if(user){
//     return done(null,user);
//    }else {
//     return done(null,false);
//    }
// }));

// app.post('/login',(req,res)=>{
//   const {name,password} = req.body;
//   const user = users.find(u=> u.name===name && u.password===password);

//   if(user){
//     const payload = {sub: user.id, name: user.name};
//     const token = jwt.sign(payload,secret);
//     res.json({token: token});
//   }else {
//     res.status(401).json({message: "Authentication failed."});
//   }
// });

// app.get("/protected",passport.authenticate('jwt',{session:false}),(req,res)=>{
//   res.json({message: "Protected Route"});
// });