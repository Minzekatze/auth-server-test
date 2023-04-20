import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db/pg.js";

const saltRounds = Number(process.env?.SALT_ROUNDS) || 12;

const signUpUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);
    const myQuery =
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3)";
    const {
      rows: { id },
    } = await pool.query(myQuery, [email, hash, username]);
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
    return res.status(201).json(token);
  } catch (e) {
    next(e.message);
  }
};

const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const myQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: user } = await pool.query(myQuery, [email]);
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) return next("Wrong password");
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json(token);
  } catch (e) {
    next(e.message);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const myQuery = "SELECT * FROM users";
    const { rows: users } = await pool.query(myQuery);
    res.json(users);
  } catch (e) {
    next(e.message);
  }
};

const getOneUser = (req, res) => {
  res.json(req.user);
};

export { signUpUser, signInUser, getOneUser, getUsers };
