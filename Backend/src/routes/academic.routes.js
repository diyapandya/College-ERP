const router = require("express").Router();


const {getMyAcademic} = require("../controllers/academic.controller");

router.get("/my", getMyAcademic);



module.exports = router;
