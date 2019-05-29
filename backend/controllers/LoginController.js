const Login = require("../models/Login");

exports.handleSignInAttempt = (req, res) => {

  console.log("SIGN IN ATTEMPT FROM :", req.body.username)


  Login.findOne({ name: req.body.name, password: req.body.password }, (err, account) => {
    if (err) {
      console.log("Error in Server " + account)
      res.status(500).send({ 'signInStatus': 'failure', 'err': err });
    }
    if (account != null || account != undefined) {
      console.log("Account found")
      res.status(200).send({ 'signInStatus': 'authorized', 'userId': account._id, 'err': err });
    }
    else {
      console.log("Account not found")
      res.status(200).send({ 'signInStatus': 'not_authorized', 'err': err });
    }
  }
  );
}
exports.GetSpecificUser = (req, res) => {
  Login.find({ _id: req.params.userId })
    .then(data => {
      console.log(data)
      res.status(200).json({ 'getStatus': 'success', 'user': data });
    }).catch(err => {
      res.status(500).json({ 'getStatus': 'failed', 'err': err });
    });
};
exports.getAllAccounts = (req, res) => {
  console.log("Get all accounts ")
  Login.find({}, (err, accounts) => {
    if (err) {
      console.log("ERROR in database............");
      res.status(500).send({ 'signInStatus': 'failure', 'err': err });
    }
    res.status(200).json({ 'signInStatus': 'authorized', 'accounts': accounts });
  });
}

exports.deleteAllAccounts = (req, res) => {
  Login.deleteMany({}, (err,acc) => {
    if (err) {
      console.log("ERROR in database............");
      res.status(500).send({ 'delteStatus': 'failure', 'err': err });
    }
    res.status(200).json({ 'deleteStatus': 'success', 'accounts': acc });
  })
}
