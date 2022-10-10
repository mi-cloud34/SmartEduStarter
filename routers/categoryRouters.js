const express=require("express");

const categoryControllers=require("../controllers/categoryControllers");

const router=express.Router();

router.route("/").post(categoryControllers.createCourse);
router.route("/:id").delete(categoryControllers.deleteCategory);

module.exports=router;