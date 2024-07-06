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

// Data
import authorsTableData from "layouts/user-list/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Data from "./data/authorsTableData";
import countrydata from "../../CountryStateCity.json";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { number } from "prop-types";
// import Countries from "";
const Userlist = () => {
    const indiaObject = countrydata.find((country) => country.name === "India");
    const [contact, setcontact] = useState("");
    const [state, setstate] = useState("");
    const [city, setcity] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [country, setcountry] = useState("");
    const [email, setemail] = useState("");
    const handlecontact = (event) => {
        setcontact(event.target.value);
    };
    // const handlestate = (event) => {
    //   setstate(event.target.value);
    // };
    const handlecity = (event) => {
        setcity(event.target.value);
    };
    const handleCompanyChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handlecountry = (e) => {
        setcountry(e.target.value);
    };
    const handleemail = (e) => {
        setemail(e.target.value);
    };
    const [selectedState, setSelectedState] = useState(null);
    const handleState = (e) => {
        const selectedStateName = e.target.value;
        const selectedState = indiaObject.states.find(
            (state) => state.name === selectedStateName
        );

        setSelectedState(selectedState);
        setstate(selectedStateName);
        setcity(""); // Reset the city selection
    };
    const { columns, rows } = Data(
        searchTerm,
        contact,
        email,
        state,
        city,
        country
    );

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="d-flex align-item-center gap-2 mt-5">
                <div className="name ">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handleCompanyChange}
                            label="Search User Name"
                            variant="outlined"
                            style={{ width: "150px" }}
                        />
                    </FormControl>
                </div>
                <div className="number">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handlecontact}
                            label="Search User contact"
                            variant="outlined"
                            style={{ width: "150px" }}
                        />
                    </FormControl>
                </div>
                <div className="email">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handleemail}
                            value={email}
                            label="Search User email"
                            variant="outlined"
                            style={{ width: "150px" }}
                        />
                    </FormControl>
                </div>
                <div className="country">
                    <FormControl fullWidth>
                        <InputLabel
                            style={{ paddingBottom: "10px" }}
                            id="demo-simple-select-label"
                        >
                            country
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handlecountry}
                            // value={statusFilter}
                            label="Age"
                            style={{ width: "150px", height: "43px" }}
                        >
                            <MenuItem value=""> Select Country</MenuItem>

                            <MenuItem width="150px" value="India">
                                India
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="state">
                    <FormControl fullWidth>
                        <InputLabel
                            style={{ paddingBottom: "10px" }}
                            id="demo-simple-select-label"
                        >
                            state
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleState}
                            // value={statusFilter}
                            label="Age"
                            style={{ width: "150px", height: "43px" }}
                        >
                            <MenuItem value="">States</MenuItem>
                            {indiaObject &&
                                indiaObject.states.map((e) => (
                                    <MenuItem
                                        key={e.name}
                                        value={e.name}
                                        width="150px"
                                    >
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
                            City
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handlecity}
                            // value={statusFilter}
                            label="Age"
                            style={{ width: "150px", height: "43px" }}
                        >
                            <MenuItem value="">City</MenuItem>
                            {selectedState &&
                                selectedState.cities.map((e) => (
                                    <MenuItem
                                        key={e.name}
                                        value={e.name}
                                        width="150px"
                                    >
                                        {e.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <MDBox pt={0} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card></Card>
                    </Grid>
                </Grid>
            </MDBox>
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
                                    Userlist({rows.length})
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={7}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

export default Userlist;
