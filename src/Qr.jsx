import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function QRPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showQR, setShowQR] = useState(false);
  const { updateUserData } = useUserContext();
  const navigate = useNavigate();

  const { userData } = useUserContext();
  const firstNameFromContext = userData.firstName || firstName;
  const lastNameFromContext = userData.lastName || lastName;

  const baseUrl = window.location.origin;
  const queryParams = new URLSearchParams({
    firstName: firstNameFromContext,
    lastName: lastNameFromContext,
  });

  const handleGenerateQR = () => {
    if (firstName && lastName) {
      // Update the global context with user data
      updateUserData(firstName, lastName);
      setShowQR(true);
      console.log(qrData);
    }
  };

  const handleNavigateToIntro = () => {
    if (firstName && lastName) {
      updateUserData(firstName, lastName);
      navigate("/intro", {
        state: { firstName: firstName, lastName: lastName },
      });
    }
  };

  const qrData = `${baseUrl}/intro/?${queryParams.toString()}`;

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter your first name here"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your last name here"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <button onClick={handleGenerateQR}>Generate QR Code</button>

      {showQR && (
        <div>
          <div style={{ marginTop: "20px" }}>
            <QRCodeSVG value={qrData} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleNavigateToIntro}
              style={{
                backgroundColor: "#4285F4",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRPage;
