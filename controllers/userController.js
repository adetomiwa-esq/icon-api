import userModel from "../models/userModel.js";

export const createUser = async (req, res, next) => {
  const user = await userModel.create(req.body);

  res.status(201).json(user);
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {}
};
