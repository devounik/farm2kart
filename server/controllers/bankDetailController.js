const BankDetail = require("../models/bankDetail");

// Create a new bank detail
const createBankDetail = async (req, res) => {
  try {
    const { vendorId } = req.body;

    // Count existing bank details
    const existingCount = await BankDetail.countDocuments({ vendorId });

    // Automatically set isDefault only if this is the first one
    const isDefault = existingCount === 0;

    const newDetail = new BankDetail({
      ...req.body,
      isDefault, // backend decides
    });

    const saved = await newDetail.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all bank details of a vendor
const getBankDetailsByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const details = await BankDetail.find({ vendorId });
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a bank detail
const updateBankDetail = async (req, res) => {
  try {
    const { isDefault } = req.body;
    const id = req.params.id;

    const existing = await BankDetail.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Bank detail not found" });
    }

    if (isDefault) {
      await BankDetail.updateMany(
        { vendorId: existing.vendorId },
        { $set: { isDefault: false } }
      );
    }

    const updated = await BankDetail.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a bank detail
const deleteBankDetail = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the bank detail first
    const detailToDelete = await BankDetail.findById(id);
    if (!detailToDelete) {
      return res.status(404).json({ message: "Bank detail not found" });
    }

    const wasDefault = detailToDelete.isDefault;
    const vendorId = detailToDelete.vendorId;

    // Delete the record
    await BankDetail.findByIdAndDelete(id);

    // If deleted was default, set another as default
    if (wasDefault) {
      const anotherDetail = await BankDetail.findOne({ vendorId });
      if (anotherDetail) {
        anotherDetail.isDefault = true;
        await anotherDetail.save();
      }
    }

    res.status(200).json({ message: "Bank detail deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBankDetail,
  getBankDetailsByVendor,
  updateBankDetail,
  deleteBankDetail,
};
