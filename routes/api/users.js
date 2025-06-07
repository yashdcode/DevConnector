const express = require("express");
const router = express.Router();

//@route GET api/user
//@desc Test route
//@access Public

router.get("/", (req, res) => res.send("users Route"));
module.exports = router;
