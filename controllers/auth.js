const { UnauthorizedError, BadRequestError } = require("../errors");
const User = require("../models/User");
const generateToken = require("../helpers/utils");
const Token = require("../models/Token");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
  const { password, password2 } = req.body;

  if (password !== password2) {
    throw new BadRequestError("The two passwords must match");
  }
  const user = await User.create({ ...req.body });
  await user.save()

  if(password || password2){
    res.json({
      "registerd": "successfuly",
      user:user
    })
  }

  delete req.body.password2;


};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("You must enter username and password");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthorizedError("Username or Password incorrect");
  }


  const isMatch = await user.checkPassword(password);

  console.log(`from controller ${isMatch}, ${password}`);

  if (!isMatch) {
    throw new UnauthorizedError(" or password incorrect");
  }

  const token = await generateToken({
    id: user._id,
    username: user.username,
  });
  res.status(200).json({ token });
};



// const loginUser = async (req, res, next) => {
//   try{
//     const { password, email } = req.body;
//     //CHECK IF A USER EXIST THE DB USING HIS EMAIL
//     const user = await userModel.findOne({ email});
//     passport.authenticate("local", (err, users) =>{
//       if(err){
//         return res.status(400).json({errors:err})
//       }

//       if(!users){
//         return res.status(400).json({errors: "no user found"})
//       }
//     })

  
//     // IF THE USER DOES NOT EXIST
//     if (user) {
//     const results  = await bcrypt.compare(password, user.password)
//     if(results){
//       const token  = jwt.sign({ email: user.email}, SECRET);
//      return res.json({ token })
//     }else {
//                 res.status(400).json({ error: "password doesn't match" });
//               }
//             } else {
//               res.status(400).json({ error: "User doesn't exist" });
//             }

//   }

//         catch (error) {
//           res.status(400).json({ error });
//         }
// };





// const login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     throw new BadRequestError("You must enter username and password");
//   }

//   const user = await User.findOne({ username });
//   if (!user) {
//     throw new UnauthorizedError("Username or Password incorrect");
//   }

//   if (user) {
//         const results  = await bcrypt.compare(password, user.password)
//         if(results){
//           const token  = jwt.sign({ email: user.email}, SECRET);
//          return res.json({ token })
//         }else {
//                     res.status(400).json({ error: "password doesn't match" });
//                   }
//                 } else {
//                   res.status(400).json({ error: "User doesn't exist" });
//                 }
    
      
    

//   const token = await generateToken({
//     id: user._id,
//     username: user.username,
//   });
//   res.status(200).json({ token });
// };





const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.id });

  res.status(204);
};

// For testing purposes
const deleteAllUsers = async (req, res) => {
  const del = await User.deleteMany({});

  res.status(200).json(del);
};

const deleteAllTokens = async (req, res) => {
  const del = await Token.deleteMany({});

  res.status(200).json(del);
};
module.exports = {
  login,
  register,
  logout,
  deleteAllUsers,
  deleteAllTokens,
};