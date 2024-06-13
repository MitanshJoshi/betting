/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

// Data
import authorsTableData from "layouts/playerlist/data/authorsTableData";
import { useState } from "react";
import { BASE_URL } from "BASE_URL";
import axios from "axios";
import countrydata from "../../CountryStateCity.json";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const Playerlist = () => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // To store the category ID to be deleted

  const handleDelete = (categoryId) => {
    setOpenConfirmationDialog(true);
    setDeleteCategoryId(categoryId); // Set the category ID to be deleted
  };

  const handleConfirmStatusChange = async () => {
    const token = `Bearer ${localStorage.getItem("chemToken")}`;
    await axios.delete(`${BASE_URL}/api/grades/${deleteCategoryId}`, {
      headers: {
        Authorization: token,
      },
    });

    setOpenConfirmationDialog(false);
    // Reset deleteCategoryId after deletion
    setDeleteCategoryId(null);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    // Reset deleteCategoryId if the user cancels the deletion
    setDeleteCategoryId(null);
  };
  // const [contact, setcontact] = useState("");
  const [Nationality, setstate] = useState("");
  // console.log(Nationality)
  const [Role, setcity] = useState("");
  const [bat, setbat] = useState("");
  const [ball, setball] = useState("");
  const [Plyername, setSearchTerm] = useState("");

  const handlerole = (event) => {
    setcity(event.target.value);
  };
  const hanlenationlity = (event) => {
    setstate(event.target.value);
  };
  const handlename = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlebat = (event) => {
    setbat(event.target.value);
  };
  const handleball = (event) => {
    setball(event.target.value);
  };

  const { columns, rows } = authorsTableData(
    Plyername,
    Role,
    Nationality,
    bat,
    ball
  );

  const shouldShowAddButton = () => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return screenWidth < 850;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="d-flex align-item-center gap-5 mt-5">
        <div className="name ">
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              onChange={handlename}
              label="Search Player"
              variant="outlined"
              style={{ width: "150px" }}
            />
          </FormControl>
        </div>
        <div className="state">
          <FormControl fullWidth>
            <InputLabel
              style={{ paddingBottom: "10px" }}
              id="demo-simple-select-label"
            >
              Search Player Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handlerole}
              value={Role}
              label="Search Player Role"
              style={{ width: "150px", height: "43px" }}
            >
              <MenuItem value="">Search Player Role</MenuItem>
              <MenuItem width="150px" value="Wicket Keeper">
                Wicket Keeper
              </MenuItem>
              <MenuItem width="150px" value="Batsman">
                Batsman
              </MenuItem>
              <MenuItem width="150px" value="Allrounder ">
                Allrounder
              </MenuItem>
              <MenuItem width="150px" value="Bowler">
                Bowler
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="city">
          <FormControl fullWidth>
            <InputLabel
              style={{ paddingBottom: "10px" }}
              id="demo-simple-select-label"
            >
              Nationality
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={hanlenationlity}
              value={Nationality}
              label="Nationality"
              style={{ width: "150px", height: "43px" }}
            >
              <MenuItem value="">Nationality</MenuItem>
              {countrydata &&
                countrydata.map((e) => (
                  <MenuItem key={e.name} value={e.name} width="150px">
                    {e.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="city">
          <FormControl fullWidth>
            <InputLabel
              style={{ paddingBottom: "10px" }}
              id="demo-simple-select-label"
            >
              Search Bat-type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handlebat}
              value={bat}
              label="Search Bat-type"
              style={{ width: "150px", height: "43px" }}
            >
              <MenuItem value="">Search Bat-type</MenuItem>
              <MenuItem width="150px" value="Right hand">
                Right hand
              </MenuItem>
              <MenuItem width="150px" value="Left hand">
                Left hand
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="city">
          <FormControl fullWidth>
            <InputLabel
              style={{ paddingBottom: "10px" }}
              id="demo-simple-select-label"
            >
              Search Bow-type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleball}
              value={ball}
              label="Search Bow-type"
              style={{ width: "150px", height: "43px" }}
            >
              <MenuItem value="">Search bow-type</MenuItem>
              <MenuItem width="150px" value="Right hand">
                Right hand
              </MenuItem>
              <MenuItem width="150px" value="Left hand">
                Left hand
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Player List ({rows.length})
                </MDTypography>
                <Link to="/add-playerlist" style={{ textDecoration: "none" }}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    style={{ position: "absolute", top: "-9px", right: "2%" }}
                  >
                    {shouldShowAddButton() ? "" : "+ Add Player"}
                  </MDButton>
                </Link>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Are You Sure Want To Delete?</DialogTitle>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <MDButton onClick={handleCloseConfirmationDialog} color="dark">
            No
          </MDButton>
          <MDButton onClick={handleConfirmStatusChange} color="info" autoFocus>
            Yes
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Playerlist;
