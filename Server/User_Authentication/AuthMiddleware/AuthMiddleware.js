const User = require("../../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../token");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user)
        return res.json({
          status: true,
          user: {
            profileImage: user.profileImage,
            username: user.username,
            email: user.email,
            First_Name: user.firstName,
            Last_Name: user.lastName,
            gender: user.gender,
            address: user.address,
            DOB: user.DOB,
            phoneNumber: user.phoneNumber,
            about: user.about,
            hostJoinTime: user.hostJoinTime,
          },
        });
      else return res.json({ status: false });
    }
  });
};
