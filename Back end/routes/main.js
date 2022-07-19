const express = require("express");
const router = express.Router();
const {registration, login, upload, getAllProducts, getSingle, findUser, sendAnswer, getAnswersById, getUserThemes,
    getUserAnswers, getFavorites, changeEmail, deletePost
} = require("../controllers/main");
const {validateUser, validateEmail, validateText} = require("../middleware/userMiddleware")

router.post("/register",validateUser, registration);
router.post("/login", login);
router.post("/upload", validateText, upload);
router.post("/deletePost", deletePost);
router.get("/getAllProducts", getAllProducts);
router.post("/getSingle/:id", getSingle);
router.post("/changeEmail", validateEmail, changeEmail);
router.post("/findUser", findUser);
router.post("/sendAnswer", validateText, sendAnswer);
router.post("/getFavorites", getFavorites);
router.get("/getAnswersById/:id", getAnswersById);
router.get("/getUserThemes/:email", getUserThemes);
router.get("/getUserAnswers/:email", getUserAnswers);

module.exports = router;