const { Router } = require("express");
const signUp = require("../controller/SingUp");
const login = require("../controller/login");
const auth = require("../controller/auth");
const {createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty,getPropertiesByEmail} = require("../controller/listed_property");
const {getUserById} = require('../controller/user'); 


const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/auth", auth);

router.post("/create", createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById); 
router.put("/update/:id", updateProperty);  
router.delete("/delete/:id", deleteProperty);
router.get('/:id', getUserById);
router.get('/properties/:email', getPropertiesByEmail);



 
module.exports = router;

