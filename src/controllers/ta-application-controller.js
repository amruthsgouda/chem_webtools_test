const taApplication = require("../models/ta-applicaiton-model.js");
const { taApplicationMapper } = require("../mappers/ta-application-mapper.js");

module.exports = class TAApplicationController {
  async getAll(req, res) {
    try {
      const taApps = await taApplication.scan().exec(); // returns [ obj1, obj2]
      res.status(200).json(taApps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(Number(id)))
        return res.status(400).json({ error: "Bad Request" });

      const taApp = await taApplication.get(Number(id)); // returns retrieved obj

      taApp
        ? res.status(200).send(taApp)
        : res.status(404).json({ error: "Requested resource not found." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const taMapperdObj = taApplicationMapper(req.body);

      const taApp = await taApplication.get(taMapperdObj.TAApplicationId);

      if (taApp)
        return res
          .status(405)
          .json({ error: `Application Id already exists.` });

      if (validateEmailAndPhone(taMapperdObj.Email, taMapperdObj.Phone)) {
        const newTaApp = new taApplication(taMapperdObj);
        const createdItem = await newTaApp.save();
        res.status(201).send(createdItem);
      } else {
        return res.status(403).json({ error: "Invalid email" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(Number(id)))
        return res.status(400).json({ error: "Bad Request" });

      //removing undefined properties
      const obj = taApplicationMapper(req.body);
      const arrKeyValPair = Object.entries(obj);
      const filteredEntries = arrKeyValPair.filter(
        ([key, value]) => value !== undefined
      );
      const formattedObj = Object.fromEntries(filteredEntries);

      const updatedApp = await taApplication.update(Number(id), {
        $SET: formattedObj,
      }); //returns the updated obj

      updatedApp
        ? res.status(200).send(updatedApp)
        : res.status(404).json({ error: "Requested resource not found." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(Number(id)))
        return res.status(400).json({ error: "Bad Request" });

      const existingItem = await taApplication.get(Number(id));
      if (!existingItem)
        return res.status(404).json({ error: "Requested resource not found." });

      await taApplication.delete(Number(id));
      res.status(200).json({ Message: "Resource deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
};

function validateEmailAndPhone(email, phone) {
  try {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^\+?1?\d{10}$/;
    const isEmailValid = emailPattern.test(email);
    const isPhoneValid = phonePattern.test(phone);

    if (isEmailValid && isPhoneValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error occurred during email validation:", error.message);
    return false;
  }
}
