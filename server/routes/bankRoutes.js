const express = require("express");
const router = express.Router();

const {
  createBankDetail,
  getBankDetailsByVendor,
  updateBankDetail,
  deleteBankDetail,
} = require("../controllers/bankDetailController");

// Create a bank detail
router.post("/", createBankDetail);

// Get all bank details for a specific vendor
router.get("/vendor/:vendorId", getBankDetailsByVendor);

// Update a bank detail
router.put("/:id", updateBankDetail);

// Delete a bank detail
router.delete("/:id", deleteBankDetail);

module.exports = router;
