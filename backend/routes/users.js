const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const users = await User.find({});

  if (users) {
    return res.status(200).json(users);
  }

  res.status(400, "Bad request");
});

router.post("/create", async (req, res) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  res.status(400).json({ message: "Bad request" });
});

router.delete("/:id", async (req, res) => {
  const deletedUser = await User.deleteOne({
    _id: req.params.id,
  });

  if (deletedUser) {
    return res.status(200).json(deletedUser);
  }

  res.status(400).json({ message: "Bad request" });
});

module.exports = router;
