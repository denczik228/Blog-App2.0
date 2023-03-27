const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        const isUsed = await User.findOne({ email });
        if (isUsed) {
            return res.json({ message: `User already exists with this email` });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);

        const createUser = await User.create({ username: username, password: hashpassword, email: email });
        const token = jwt.sign(
            {
                id: createUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ message:`User ${createUser.username} was registered`,createUser, token });
    } catch (error) {
        res.json({ message: `Error during registration` });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
       
        if (!user) {
            return res.json({ message: `User ${user.email} does not exist` });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
        return res.json({ message: "Password not correct" });
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({message:`User ${user.username} was logged in`, token, user });
    } catch (error) {
        res.json({ message: `Error during logging` });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({ message: `User does not exist` });
        }

        const token = jwt.sign(
           {
             id: user._id,
           },
           process.env.JWT_SECRET,
           { expiresIn: "1d" }
        )
        res.json({ message: `User authorized`,token, user });
  } catch (error) {
     res.json({ message: `Error during authorization` });
  }
};

module.exports = { registerUser, loginUser, getMe };