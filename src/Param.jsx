import { useUserContext } from "./UserContext";
import { useLocation, useNavigate } from "react-router-dom";

function Param() {
  let { userData, updateBlobUrl, updateFileType } = useUserContext();
  let data = userData;


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const firstName = data.firstName || queryParams.get("firstName");;
  const lastName = data.lastName || queryParams.get("lastName");

  const navigate = useNavigate();

  const handleCreateTextBlob = () => {
    // Create text content with user info
    const currentDate = new Date().toLocaleDateString();
    const textContent = `Name: ${firstName} ${lastName}\nDate: ${currentDate}\nUser Information File`;

    // Create a blob from the text content
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Store the blob URL in context
    updateBlobUrl(url);
    updateFileType("text");

    // Navigate to download page
    navigate("/download");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>
        Hi, My name is {firstName} {lastName}
      </h1>
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={handleCreateTextBlob}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Create Text File
        </button>
        {console.log(firstName)}
      </div>
    </div>
  );
}

export default Param;
