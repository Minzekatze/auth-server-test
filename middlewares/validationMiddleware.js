import pool from "../db/pg.js";
import validator from "validator";

const checkEmptyUser = (req, res, next) => {
  const { email, username, password } = req.body;
  if (!username || !email || !password) return next("Missing data");
  return next();
};

const checkEmptyLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next("Missing data");
  return next();
};

const validateInput = (req, res, next) => {
  const { email, username, password } = req.body;
  const validEmail = validator.isEmail(email);
  if (!validEmail) return next("Invalid email");
  const validUsername = validator.isAlphanumeric(username);
  if (!validUsername) return next("Only alphanumeric symbols allowed");
  const validPassword = validator.isLength(password, { min: 8 });
  if (!validPassword) return next("Password is too short min 8 characters");
  return next();
};

const checkUnique = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const myQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: user } = await pool.query(myQuery, [email]);
    if (user[0].count > 0) return next("Email already eists");
    return next();
  } catch (e) {
    console.log(e);
    next(e.message);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { email } = req.body;
    const myQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: user } = await pool.query(myQuery, [email]);
    if (user.length == 0) return next("User not registered");
    return next();
  } catch (e) {
    console.log(e);
    next(e.message);
  }
};

export { checkEmptyUser, validateInput, checkUnique, findOne, checkEmptyLogin };
