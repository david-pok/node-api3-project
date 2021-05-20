const Users = require("../users/users-model");

const logger = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("Request Method: ", req.method);
  console.log("Request URL: ", req.url);
  const date = new Date();
  console.log("Request date: ", date.toString());
  next();
};

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: `user with id ${req.params.id} does not exist`,
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateUser = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.name.trim()) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    next();
  }
};

const validatePost = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.text || !req.body.text.trim()) {
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    next();
  }
};

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
