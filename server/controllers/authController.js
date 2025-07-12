const admin = require("../config/firebaseAdmin");
const User = require("../models/User");

exports.syncUser = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "idToken is required." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, phone_number, email, name } = decodedToken;

    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        firebaseUid: uid,
        phone: phone_number,
        email: email || "",
        name: name || "",
      },
      { upsert: true, new: true }
    );

    res.json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
