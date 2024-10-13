import { Box, Button, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UploadImagesModal from "../components/Modals/UploadImagesModal";
import { getProperties } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";

const UploadButton = styled(Button)({
  backgroundColor: "blue",
  color: "white",
  "&:hover": {
    backgroundColor: "darkblue",
  },
});

const GetProperties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [openPropertyForm, SetOpenPropertyForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [propertyId, setPropertyId] = useState("");
  const [imgs, setImgs] = useState({
    interior: "",
    exterior: "",
    bathroom: "",
    pool: "",
    gym: "",
    balcony: "",
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: false,
    },
    {
      field: "unitType",
      headerName: "Unit Type",
      width: 150,
      editable: false,
    },
    {
      field: "saleableArea",
      headerName: "Area",
      width: 150,
      editable: false,
    },
    {
      field: "category",
      headerName: "Category",
      width: 220,
      editable: false,
    },
    {
      field: "feature",
      headerName: "Feature",
      width: 220,
      editable: false,
    },
    {
      field: "amenities",
      headerName: "Amenities",
      width: 220,
      editable: false,
    },
    {
      field: "uploadImages",
      headerName: "Upload Images",
      width: 180,
      renderCell: (params) => (
        <div style={{}}>
          <UploadButton
            onClick={() => {
              setOpenImagesModal(true);
              console.log("id", params);
              setPropertyId(params.id);
              setImgs({
                interior: params.row.interior,
                exterior: params.row.exterior,
                bathroom: params.row.bathroom,
                balcony: params.row.balcony,
                pool: params.row.pool,
                gym: params.row.gym,
              });
            }}
          >
            Upload
          </UploadButton>
        </div>
      ),
    },
    {
      field: "editProperty",
      headerName: "Edit",
      width: 180,
      renderCell: (params) => (
        <div>
          <UploadButton onClick={() => {}}>
            <Edit />
          </UploadButton>
        </div>
      ),
    },
  ];
  const DatagridComponent = () => {
    return (
      <Box sx={{ height: 550, width: "100%", mt: 2 }}>
        <DataGrid
          rows={allProperties}
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

  const fetchProperties = async () => {
    try {
      let resp = await getProperties(pageNumber);
      resp = resp.response.map((item) => {
        return { id: item._id, ...item };
      });
      console.log(resp);
      setAllProperties(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [openImagesModal]);
  return (
    <Box p={2}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">All Properties</Typography>
        <Button
          variant="contained"
          onClick={() => {
            SetOpenPropertyForm(true);
          }}
        >
          Upload Property
        </Button>
      </Box>
      {DatagridComponent()}

      <UploadImagesModal
        setImgs={setImgs}
        imgs={imgs}
        open={openImagesModal}
        id={propertyId}
        onClose={() => {
          setOpenImagesModal(false);
          setImgs({
            interior: "",
            exterior: "",
            bathroom: "",
            pool: "",
            gym: "",
          });
        }}
      />
    </Box>
  );
};

export default GetProperties;
