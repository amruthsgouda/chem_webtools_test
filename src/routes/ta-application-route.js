"use strict";

//dependencies and instantiation
const express = require("express");
const router = express.Router();
const TAApplicationController = require("../controllers/ta-application-controller.js");
const applicationController = new TAApplicationController();

//paths
router.get("/", applicationController.getAll);
router.get("/:id", applicationController.getById);
router.post("/", applicationController.create);
router.put("/:id", applicationController.update);
router.delete("/:id", applicationController.delete);

//exports
module.exports = router;
