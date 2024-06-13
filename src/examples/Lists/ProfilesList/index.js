// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MenuItem from '@mui/material/MenuItem';
import { Select } from "@material-ui/core";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDSnackbar from "components/MDSnackbar";

function ProfilesList({ title, profiles, shadow }) {

  
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
        color="success"
        icon="check"
        title="Successfull Updated"
        content="Document Status Updated Successfully."
        dateTime="1 sec"
        open={successSB}
        onClose={closeSuccessSB}
        close={closeSuccessSB}
        bgWhite
    />
);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleDropdownChange = (event, profile) => {
    setSelectedProfile(profile);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmStatusChange = () => {
    setOpenConfirmationDialog(false);
    openSuccessSB();

  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };



  const renderProfiles = profiles.map(({ image, name, description, action, url }) => (
    <MDBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      {/* <MDBox mr={2}>
        <MDAvatar src={image} alt="something here" shadow="md" />
      </MDBox> */}
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {description}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              (Click here)
            </a>
          )}
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        <select
          onChange={(event) => handleDropdownChange(event, name)}
          style={{
            color: "#7b809a",
            paddingLeft: "10px",
            background: "transparent",
            border: "1px solid #dadbda",
            width: "100%",
            height: "35px",
            borderRadius: "5px",
            fontSize: "14px",
            right: "0px",
          }}>
          {/* <option value="" selected  >State</option> */}
          <option value="" disabled>SELECT</option>
          <option value="">ACTIVE</option>
          <option value="">INACTIVE</option>

        </select>
        {renderSuccessSB}
      </MDBox>
    </MDBox>
  ));

  return (
    <>
      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <MDBox pt={2} px={2}>
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {title}
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {renderProfiles}
          </MDBox>
        </MDBox>
      </Card>
      <Dialog open={openConfirmationDialog} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of {selectedProfile?.name}'s document?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseConfirmationDialog} color="dark">
            Cancel
          </MDButton>
          <MDButton onClick={handleConfirmStatusChange} color="info" autoFocus>
            Confirm
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
