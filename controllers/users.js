const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

exports.addUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  try {
    const result = await User.create({
      name: name,
      email: email,
      phone: phone,
    });
    res.json(result.dataValues);
  } catch (err) {
    console.log(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    res.json(user);
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.postEditUser = async (req, res, next) => {
  const id = req.params.id;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedPhone = req.body.phone;
  try {
    await User.update(
      {
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
      },
      { where: { id: id } }
    );
    res.json({ message: "user updated" });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    await user.destroy();
    res.json({
      message: "User deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
