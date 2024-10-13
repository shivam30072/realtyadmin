import { Box, Button, Dialog, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { getBulkUploadFiles, storeFiles, uploadFile } from "../api";
import { Close, CloseOutlined } from "@mui/icons-material";
import moment from "moment";

const HiddenInput = styled("input")({
  display: "none",
});

const UploadButton = styled(Button)({
  backgroundColor: "blue",
  color: "white",
  "&:hover": {
    backgroundColor: "darkblue",
  },
});

const UploadExcelModal = ({ onClose }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("files", file);

      try {
        const fileURL = await uploadFile(formData);
        console.log(`File uploaded successfully: ${fileURL}`);

        const fileName = fileURL.map((item) =>
          item.split("/").pop().split("_").pop()
        );
        console.log("filename", fileName);

        const response = await storeFiles({
          fileName,
          fileURL,
        });
        // window.location.reload()
        console.log(response);
        onClose();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md">
      <Box
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">Upload File</Typography>

        <Close onClick={onClose} fontSize="large" />
      </Box>
      <Box
        width={"400px"}
        height={"400px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".xlsx"
        />
        <UploadButton onClick={handleButtonClick}>
          Upload Excel File
        </UploadButton>
      </Box>
    </Dialog>
  );
};

const BulkUploadFiles = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    {
      field: "fileName",
      headerName: "File Name",
      width: 250,
      editable: false,
    },
    {
      field: "fileURL",
      headerName: "File URL",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <a
          style={{ textDecoration: "none", fontWeight: "bold" }}
          href={params.value}
          target="blank"
        >
          {"Download Excel File"}
        </a>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <div
          style={{
            color:
              params.value === "success"
                ? "green"
                : params.value === "pending"
                ? "gray"
                : "red",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      renderCell: (params) => (
        <div>{moment(params.value).format("DD-MM-YYYY")}</div>
      ),
    },
  ];
  const DatagridComponent = () => {
    return (
      <Box sx={{ height: 550, width: "100%", mt: 2 }}>
        <DataGrid
          rows={allFiles}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  };

  const fetchFiles = async () => {
    try {
      let response = await getBulkUploadFiles();
      response = response.map((item) => {
        return { id: item._id, ...item };
      });
      setAllFiles(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [openModal]);
  return (
    <Box p={2}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">Bulk Upload Properties</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Bulk Upload
        </Button>
      </Box>
      {DatagridComponent()}
      {openModal && (
        <UploadExcelModal
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </Box>
  );
};

export default BulkUploadFiles;
