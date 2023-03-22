const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        const isUsed = await User.findOne({ email });
        if (isUsed) {
            return res.status(402).json({ msg: `Username - ${isUsed.username} already exist` })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);

        const createUser = await User.create({username: username, password:hashpassword, email:email});
        res.json(createUser);
    } catch (error) {
        throw new error(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
       
        if (!user) {
            return res.json({msg:`User ${user.email} does not exist`})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
        return res.json({msg:'Password not correct'})
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user });
    } catch (error) {
    throw new error(error);
  }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({msg:`User does not exist`})
        }

        const token = jwt.sign(
           {
             id: user._id,
           },
           process.env.JWT_SECRET,
           { expiresIn: "1d" }
        )
        res.json({token,user})
  } catch (error) {
    throw new error(error);
  }
};

module.exports = { registerUser, loginUser, getMe };