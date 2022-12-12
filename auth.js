const argon2 = require("argon2");

const hashingOption = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCoast: 5,
  parallelisme: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOption)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};
