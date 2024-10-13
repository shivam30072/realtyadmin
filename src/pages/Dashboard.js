import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography
        p={2}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/bulk-upload-files");
        }}
      >
        BULK-UPLOAD FILES
      </Typography>
      <Typography
        p={2}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/all-properties");
        }}
      >
        All Properties
      </Typography>
    </div>
  );
};

export default Dashboard;
