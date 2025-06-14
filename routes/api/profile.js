const express = require("express");
// const mongoose = require('mongoose');
const router = express.Router();
const config = require("config");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//@route GET api/profile/me
//@desc get the profile of users
//@access Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ mes: "There is no Profile for this user" });
    }
    return res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get Profile by user_id
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar",
    ]);
    res.json(profile);
    if (!profile) {
      return res.status(400).json({ msg: "Profile no found" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile no found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      company,
      location,
      bio,
      githubusername,
      website,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    let profileFields = {};
    profileFields.user = req.user.id;
    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (status) {
      profileFields.status = status;
    }
    if (githubusername) {
      profileFields.githubusername = githubusername;
    }
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (facebook) {
      profileFields.facebook = facebook;
    }
    if (linkedin) {
      profileFields.linkedin = linkedin;
    }
    if (status) {
      profileFields.instagram = instagram;
    }
    if (twitter) {
      profileFields.twitter = twitter;
    }
    if (youtube) {
      profileFields.youtube = youtube;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //update
      //Using upsert option (creates new doc if no match is found):
      if (profile) {
        await Profile.findOneAndUpdate(
          {
            user: req.user.id,
          },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new Profile(profileFields);
      profile = await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error occured");
    }
  }
);
module.exports = router;
