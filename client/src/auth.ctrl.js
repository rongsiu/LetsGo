exports.socialAuthCallback = (req, res) => {
  if (req.user.err) {
    res.status(401).json({
        success: false,
        message: `social auth failed: ${req.user.err}`,
        error: req.user.err
    })
  } else {
    if (req.user) {
      const user = req.user._doc;
      const userInfo = helpers.setUserInfo(user);
      const token = helpers.generateToken(userInfo);
      return res.redirect(`${CLIENT_URL}/user/${userObj._doc._id}/${token}`);
    } else {
      return res.redirect('/login');
    }
  }
};