const express=require("express");
const pageController=require("../controllers/pageController");
const redirectMiddlewares=require("../midlewares/redirectMiddlewares");
const router=express.Router();

router.route("/").get(pageController.getIndex);
router.route("/about").get(pageController.getAbout);
router.route("/register").get(redirectMiddlewares,pageController.getRegisterPage);
router.route("/login").get(redirectMiddlewares,pageController.getLoginPage);
router.route("/contact").get(pageController.contactPage);
router.route('/contact').post(pageController.sendEmail);



module.exports=router