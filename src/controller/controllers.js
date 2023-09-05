 import Student from '../models/student.js';


 export const addStudent= async(req,res)=>{
    try {
        console.log(req.body);
         Student.register(new Student({ email: req.body.email, username: req.body.username }), req.body.password, function (err, Student) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(Student, (er) => {
                if (er) {
                    res.json({ success: false, message: er });
                }
                else {
                    res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
 
    }
    catch(err) {
    console.log(err);
    }
}

export const authStudent= async(req,res)=>{
    try {
        if (!req.body.username) {
            res.json({ success: false, message: "username was not given" })
        }
        else if (!req.body.password) {
            res.json({ success: false, message: "Password was not given" })
        }
        else {
            passport.authenticate("local", function (err, Student, info) {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!Student) {
                        res.json({ success: false, message: "username or password incorrect" });
                    }
                    else {
                        const token = jwt.sign({ StudentId: Student._id, username: Student.username }, secretkey, { expiresIn: "24h" });
                        res.json({ success: true, message: "Authentication successful", token: token });
                    }
                }
            })(req, res);
        }
    }
    catch(err) {
    console.log(err);
    }
}