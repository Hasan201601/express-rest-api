const randomIdGenerator = require("../utils/randomIdGenerator");
const fs = require("fs");

// GET random user
module.exports.randomUserHandler = (req, res, next) => {
  fs.readFile("./data/users.json", (err, data) => {
    if (!err && data) {
      const users = data.toString().length <= 2 ? [] : JSON.parse(data);
      let randomNumber = Math.floor(Math.random() * users.length);
      const randomUser = users[randomNumber];
      res.send(randomUser);
    } else {
      next(err);
    }
  });
};

// GET all users with limits
module.exports.getAllUsers = (req, res, next) => {
  const limit = parseFloat(req.query.limit);
  console.log(limit);
  if (limit) {
    console.log("from limit");
    fs.readFile("./data/users.json", (err, data) => {
      if (!err && data) {
        const users = data.toString().length <= 2 ? [] : JSON.parse(data);
        if (limit <= users.length) {
          console.log("yeah");
          res.send(users.slice(0, limit));
        } else {
          res.send(users);
        }
      } else {
        next(err);
      }
    });
  } else {
    console.log("not from limit");
    fs.readFile("./data/users.json", (err, data) => {
      if (!err && data) {
        const users = data.toString().length <= 2 ? [] : JSON.parse(data);
        res.send(users);
      } else {
        next(err);
      }
    });
  }
};

// Save an user
module.exports.saveUserHandler = (req, res, next) => {
  // prepare the user
  let user = { ...req.body };
  const id = randomIdGenerator();
  user = { id, ...user };

  // find users
  fs.readFile("./data/users.json", (err, data) => {
    if (!err && data) {
      const users = data.toString().length <= 2 ? [] : JSON.parse(data);
      // add user to the list
      users.push(user);
      // save to database
      fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
        if (!err) {
          res.send("user saved");
        } else {
          next(err);
        }
      });
    } else {
      next(err);
    }
  });
};

// Update an user
module.exports.updateUserHandler = (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  let user = { ...req.body };

  // get users
  fs.readFile("./data/users.json", (err, data) => {
    if (!err && data) {
      const users = data.toString().length <= 2 ? [] : JSON.parse(data);
      //   console.log(users);
      let index;
      let requestedUser = users.find((u, idx) => {
        index = idx;
        return u.id == id;
      });
      console.log(requestedUser);

      if (requestedUser) {
        requestedUser = { ...requestedUser, ...user };
        console.log(user, requestedUser);
        users[index] = requestedUser;
        // console.log(users);
        fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
          if (!err) {
            res.send("User updated Successfully");
          } else {
            next(err);
          }
        });
      } else {
        res.send("No user found");
      }
    } else {
      next(err);
    }
  });
};

// Bulk update users
module.exports.bulkUpdateHander = (req, res, next) => {
  const requestedUsers = req.body;
  //   console.log(requestedUsers);
  fs.readFile("./data/users.json", (err, data) => {
    let counts = 0;
    if (!err && data) {
      const users = data.toString().length <= 2 ? [] : JSON.parse(data);

      for (let u of requestedUsers) {
        console.log(u.id);
        const id = u.id;
        let index;
        let user = users.find((u, idx) => {
          index = idx;
          return u.id == id;
        });

        if (user) {
          user = { ...user, ...u };
          users[index] = user;
          counts += 1;
        } else {
          continue;
        }
      }
      console.log(counts);
      if (counts >= 1) {
        fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
          if (!err) {
            res.send("Updated users successfully");
          } else {
            next(err);
          }
        });
      } else {
        next("Could not update successfully");
      }
    } else {
      next(err);
    }
  });
};

// DELETE an user
module.exports.deleteUserHandler = (req, res) => {
  const id = req.query.id;
  fs.readFile("./data/users.json", (err, data) => {
    if (!err && data) {
      const users = data.toString().length <= 2 ? [] : JSON.parse(data);
      const requestedUser = users.find((u) => u.id == id);
      if (requestedUser) {
        const restUsers = users.filter((u) => u.id !== id);
        fs.writeFile("./data/users.json", JSON.stringify(restUsers), (err) => {
          if (!err) {
            res.send("User deleted Successfully");
          } else {
            next(err);
          }
        });
      } else {
        res.send("No user found");
      }
    } else {
      next(err);
    }
  });
};
