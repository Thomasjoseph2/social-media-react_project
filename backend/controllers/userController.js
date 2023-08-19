import asyncHandler from "express-async-handler";

//@desc Auth user/set token
//@route POST /api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "auth user " });
});

//@desc new user registration
//route POST api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "register user" });
});

//@user logout
//@ route post api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout" });
});

//@user get user profile
//@ route GET api/users/profile
//@access private(need to have access and the valid tokken)
const profile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "user profile" });
});

//@user update user profile
//@ route PUT api/users/profile
//@access private(need to have access and the valid tokken)
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update User profile" });
});

export { 

    authUser,
    registerUser,
    logoutUser,
    profile,
    updateUserProfile

};
