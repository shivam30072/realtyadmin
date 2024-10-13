import { Close } from "@mui/icons-material";
import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { addImagesForProperty, uploadFile } from "../../api";

const UploadBox = ({ label, image, onClick }) => {
  return (
    <Box
      onClick={onClick}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      border="2px dashed #ccc"
      borderRadius="8px"
      width="100%"
      height="200px"
      sx={{
        cursor: "pointer",
        "&:hover": { borderColor: "#888" },
      }}
    >
      {image ? (
        <img
          src={image}
          alt={`${label} preview`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ) : (
        <>
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
          <Typography variant="h2" color="primary">
            +
          </Typography>
        </>
      )}
    </Box>
  );
};

const UploadImagesModal = ({ open, onClose, setImgs, imgs, id }) => {
  const fileInputRef = useRef(null);

  //   const [imgObj, setImgObj] = useState({});

  const handleImageChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      console.log(file);

      const formData = new FormData();
      formData.append("files", file);

      let fileURL = await uploadFile(formData);
      console.log(`Images uploaded successfully: ${fileURL}`);

      fileURL = fileURL[0];

      //   setImgObj((prev) => ({
      //     ...prev,
      //     [name]: fileURL,
      //   }));

      setImgs((prevState) => ({
        ...prevState,
        [name]: fileURL,
      }));
    }
  };

  // Trigger file input click
  const handleUploadClick = (name) => {
    fileInputRef.current.name = name;
    fileInputRef.current.click();
  };

  const uploadAllImages = async () => {
    try {
      console.log("imgObj", imgs);
      await addImagesForProperty({ id, imgs });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setImgObj(imgs);
  }, [imgs]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box p={3}>
        {/* Header */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
        >
          <Typography variant="h5">Upload Property Images</Typography>
          <Close
            onClick={onClose}
            fontSize="large"
            style={{ cursor: "pointer" }}
          />
        </Box>

        {/* File Input (Hidden) */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Form Fields */}
        <Grid container spacing={3}>
          {/* Balcony */}
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              {"Balcony"}
            </Typography>
            <UploadBox
              label="Balcony"
              image={imgs.balcony}
              onClick={() => handleUploadClick("balcony")}
            />
          </Grid>

          {/* Interior */}
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              {"Interior"}
            </Typography>
            <UploadBox
              label="Interior"
              image={imgs.interior}
              onClick={() => handleUploadClick("interior")}
            />
          </Grid>

          {/* Bathroom */}
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              {"Bathroom"}
            </Typography>
            <UploadBox
              label="Bathroom"
              image={imgs.bathroom}
              onClick={() => handleUploadClick("bathroom")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              {"Exterior"}
            </Typography>
            <UploadBox
              label="Exterior"
              image={imgs.exterior}
              onClick={() => handleUploadClick("exterior")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              {"Pool"}
            </Typography>
            <UploadBox
              label="Pool"
              image={imgs.pool}
              onClick={() => handleUploadClick("pool")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              {"Gym"}
            </Typography>
            <UploadBox
              label="Gym"
              image={imgs.gym}
              onClick={() => handleUploadClick("gym")}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={uploadAllImages}>
            Done
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UploadImagesModal;
