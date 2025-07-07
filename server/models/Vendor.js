const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    gstinNumber: {
      type: String,
      required: true,
      unique: true,
    },
    gstCertificateUrl: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    pinCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // basic 10-digit number validation
        },
        message: "Invalid phone number format",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
