import { useState, useEffect, useRef } from "react";
import { auth } from "../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneAuthForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");

  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if (!recaptchaVerifier.current) {
      recaptchaVerifier.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );

      recaptchaVerifier.current.render().catch((err) => {
        console.error("Recaptcha render error", err);
      });
    }
  }, []);

  const sendOTP = async () => {
    if (!phone) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    try {
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier.current
      );
      setConfirmationResult(result);
      setMessage("OTP sent. Please check your phone.");
    } catch (error) {
      console.error(error);
      setMessage("Error sending OTP.");
    }
  };

  const verifyOTP = async () => {
    if (!otp || !confirmationResult) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      setMessage("Phone verified and signed in!");
    } catch (error) {
      console.error(error);
      setMessage("Invalid OTP.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      {!confirmationResult ? (
        <div>
          <input
            type="tel"
            placeholder="Enter phone number e.g. +911234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div id="recaptcha-container"></div>
          <button onClick={sendOTP}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}
