const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");

//@route POST api/post
//@desc Creating Post
//@access Private

router.post(
  "/",
  [auth, [check("text", "text is reuired").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select("-password");
    console.log("user", user);
    try {
      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        avatar: user.avatar,
        name: user.name,
      });
      const post = await newPost.save();
      res.json({ post });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "server error" });
    }
  }
);
module.exports = router;

//@route GET api/post
//@desc get all the post
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//@route GET api/post
//@desc get the post by id
//@access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ mesg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
