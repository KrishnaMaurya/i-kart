export default (user, statusCode, res) => {
  //create jwt token
  const token = user.getJwtToken();

  //options for setting token in httpCookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
