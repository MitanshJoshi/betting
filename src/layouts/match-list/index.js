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
import countries from "../../CountryStateCity.json";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
// Data
import authorsTableData from "layouts/match-list/data/authorsTableData";
import { useEffect, useState } from "react";
import { BASE_URL } from "BASE_URL";
import axios from "axios";
import Data from "./data/authorsTableData";

const Matchdetail = () => {
    const indiaObject = countries.find((country) => country.name === "India");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [leagueId, setLeagueId] = useState("");
    const [leagues, setLeagues] = useState([]);
    const [team1, setteam1] = useState("");
    const [team2, setteam2] = useState("");
    const [vanue, setvanue] = useState("");
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [city, setcity] = useState("");
    const [selectedState, setSelectedState] = useState(null);

    const fetchLeagues = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/league/displayList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            setLeagues(responseData.data);
            setLeagueId(responseData.data[0]._id);
            console.log(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchLeagues();
    }, []);

    const handleDelete = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setOpenConfirmationDialog(true);
    };

    const handleConfirmStatusChange = async () => {
        try {
            const token = `Bearer ${localStorage.getItem("chemToken")}`;
            console.log(selectedCategoryId);
            await axios.delete(
                `${BASE_URL}/api/certificate/delete/${selectedCategoryId}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setOpenConfirmationDialog(false);
        } catch (error) {
            console.log("Error deleting category:", error);
        }
    };

    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
    };

    const handleLeagueChange = (e) => {
        const selectedLeague = leagues.find(
            (league) => league._id === e.target.value
        );
        setLeagueId(selectedLeague._id);
    };

    const handleState = (e) => {
        const selectedStateName = e.target.value;
        const selectedState = indiaObject.states.find(
            (state) => state.name === selectedStateName
        );

        setSelectedState(selectedState);
        setstate(selectedStateName);
        setcity(""); // Reset the city selection
    };

    const handlecountry = (e) => {
        setcountry(e.target.value);
    };

    const handlecity = (e) => {
        setcity(e.target.value);
    };

    const handleteam1 = (e) => {
        setteam1(e.target.value);
    };

    const handleteam2 = (e) => {
        setteam2(e.target.value);
    };

    const handlevanue = (e) => {
        setvanue(e.target.value);
    };

    const { columns, rows } = Data(
        team1,
        team2,
        vanue,
        country,
        state,
        city,
        leagueId
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
            <div className="d-flex align-item-center gap-3 mt-5">
                <div className="city">
                    <FormControl fullWidth>
                        <InputLabel
                            style={{ paddingBottom: "10px" }}
                            id="demo-simple-select-label"
                        >
                            League
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={leagueId}
                            onChange={handleLeagueChange}
                            style={{ width: "120px", height: "43px" }}
                        >
                            {/* <MenuItem value="">Leagues</MenuItem> */}
                            {leagues &&
                                leagues.map((e, id) => (
                                    <MenuItem
                                        key={e._id}
                                        value={e._id}
                                        width="150px"
                                    >
                                        {e.league_name}
                                        {id}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="number">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handleteam1}
                            value={team1}
                            label="Team 1 Name"
                            variant="outlined"
                            style={{ width: "120px" }}
                        />
                    </FormControl>
                </div>
                <div className="state">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handleteam2}
                            value={team2}
                            label="Team 2 Name"
                            variant="outlined"
                            style={{ width: "120px" }}
                        />
                    </FormControl>
                </div>
                <div className="city">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handlevanue}
                            value={vanue}
                            label="Venue Name"
                            variant="outlined"
                            style={{ width: "120px" }}
                        />
                    </FormControl>
                </div>
                <div className="city">
                    <FormControl fullWidth>
                        <InputLabel
                            style={{ paddingBottom: "10px" }}
                            id="demo-simple-select-label"
                        >
                            Country
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handlecountry}
                            value={country}
                            style={{ width: "120px", height: "43px" }}
                        >
                            <MenuItem value="">Country</MenuItem>
                            {countries &&
                                countries.map((e) => (
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
                            States
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleState}
                            value={state}
                            style={{ width: "120px", height: "43px" }}
                        >
                            <MenuItem value="">State</MenuItem>
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
                            value={city}
                            style={{ width: "120px", height: "43px" }}
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
                                    Match Detail
                                </MDTypography>
                                <Link
                                    to="/add-match"
                                    style={{ textDecoration: "none" }}
                                >
                                    <MDButton
                                        variant="gradient"
                                        color="dark"
                                        style={{
                                            position: "absolute",
                                            top: "-9px",
                                            right: "2%",
                                        }}
                                    >
                                        {shouldShowAddButton()
                                            ? ""
                                            : "+ Add Match"}
                                    </MDButton>
                                </Link>
                            </MDBox>
                            <MDBox pt={3}>
                                {leagues && (
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                )}
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
                <DialogActions
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <MDButton
                        onClick={handleCloseConfirmationDialog}
                        color="dark"
                    >
                        No
                    </MDButton>
                    <MDButton
                        onClick={handleConfirmStatusChange}
                        color="info"
                        autoFocus
                    >
                        Yes
                    </MDButton>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
};

export default Matchdetail;
