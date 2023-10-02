const express = require("express");
import * as controllers from "../controllers";
const router = express.Router();

//#region Authentication
router.post("/signup", controllers.signUp);
router.post("/login", controllers.signIn);
//#endregion

//#region Profile
router.get("/profile/:userId", controllers.getProfileById);
router.post("/profile", controllers.createProfile);
router.put("/profile/:userId", controllers.updateProfile);
router.delete("/profile/:userId", controllers.deleteProfile);
//#endregion

//#region Pet
router.post("/pet", controllers.createPet);
router.get("/pet/:petId", controllers.getPetById);
router.get("/pets", controllers.getAllPets);
router.get("/pets/:userId", controllers.getAllPetsByUser);
router.put("/pet/:petId", controllers.updatePet);
router.delete("/pet/:petId", controllers.deletePet);
//#endregion

//#region Adoption
router.post("/adoption", controllers.createAdoption);
router.get("/adoptions", controllers.getAllAdoptions);
router.get("/adoption/:adoptionId", controllers.getAdoptionById);
router.put("/adoption/:adoptionId", controllers.updateAdoption);
router.delete("/adoption/:adoptionId", controllers.deleteAdoption);
//#endregion

export default router;
