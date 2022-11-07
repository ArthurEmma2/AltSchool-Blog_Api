const { UnauthorizedError, BadRequestError } = require("../errors");
const userModel = require("../models/User");
const generateToken = require("../helpers/utils");
// const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")



const register = async (req, res) => {
  const { password, password2 } = req.body;

  if (password !== password2) {
    throw new BadRequestError("The two passwords must match");
  }
  const user = await userModel.create({ ...req.body });
  await user.save()

  if(password || password2){
    res.json({
      "registerd": "successfuly",
      user:user
    })
  }

  // delete req.body.password2;


};

const  login = async (req, res) => {
  try{
    const { password,  username } = req.body;
    //CHECK IF A USER EXIST THE DB USING HIS Username
    const user = await userModel.findOne({ username});
      if(!user){
        return res.status(400).json({errors: "no user found"})
      }

  
    // IF THE USER DOES NOT EXIST
    if (user) {
    const results  = await bcrypt.compare(password, user.password)
    if(results){
      const token  = jwt.sign({ username: user.username}, SECRET);
     return res.json({ token })
    }else {
                res.status(400).json({ error: "password doesn't match" });
              }
            } else {
              res.status(400).json({ error: "User doesn't exist" });
            }

  }

        catch (error) {
          res.status(400).json({ "error": "whiles processing" });
        }
};




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