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
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

// Data
import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Data from "./data/authorsTableData";
import AuthorsTableData from "./data/authorsTableData";
import { BASE_URL } from "BASE_URL";
import MDSnackbar from "components/MDSnackbar";

const Teamplayer = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Added"
            content="Player-Team Delete Successfully."
            dateTime="1 sec"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
        />
    );

    const renderErrorSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Filled Error"
            content={errorMessage}
            dateTime="1 sec ago"
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );
    const shouldShowAddButton = () => {
        const screenWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        return screenWidth < 850;
    };

    const handleConfirmStatusChange = async (id) => {
        setOpenConfirmationDialog(false);
        try {
            const token = localStorage.getItem("token"); // Assuming you have a token stored in localStorage
            const response = await fetch(
                `${BASE_URL}/api/teamPlayer/removePlayer?playerId=${deleteCategoryId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete data");
            }

            // Reset deleteCategoryId after deletion
            setDeleteCategoryId(null);
            fetchData();
            openSuccessSB();
            console.log("Data deleted successfully");

            // You may want to update your UI or state after successful deletion
        } catch (error) {
            // setError(error.message);
            console.error("Error deleting data:", error);
        }
    };
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const handleDelete = (id) => {
        setOpenConfirmationDialog(true);
        setDeleteCategoryId(id); // Set the category ID to be deleted
    };
    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
        // Reset deleteCategoryId if the user cancels the deletion
        setDeleteCategoryId(null);
    };

    const [Display, setDisplay] = useState([]);
    // const filteredData = startupdata.filter((e) => (e.startupName?.toLowerCase().includes(startup)))
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/teamPlayer/display`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            setDisplay(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [teamname, setteamname] = useState("");
    const [short, setshort] = useState("");
    const [captain, setcaptain] = useState("");
    const [visecaptain, setvisecaptain] = useState("");
    const [player, setplayer] = useState("");

    const handleshort = (event) => {
        setshort(event.target.value);
    };
    const handlecaptain = (event) => {
        setcaptain(event.target.value);
    };
    const handlevise = (event) => {
        setvisecaptain(event.target.value);
    };
    const handleteamname = (event) => {
        setteamname(event.target.value);
    };
    const handleplayer = (event) => {
        setplayer(event.target.value);
    };
    const { columns, rows } = AuthorsTableData({
        handleDelete,
        Display,
        teamname,
        short,
        captain,
        visecaptain,
        player,
    });
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="d-flex align-item-center gap-5 mt-5">
                <div className="city">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handleplayer}
                            value={player}
                            label="Search Player Name"
                            variant="outlined"
                            style={{ width: "130px" }}
                        />
                    </FormControl>
                </div>
                <div className="name ">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handleteamname}
                            value={teamname}
                            label="Search Team Name"
                            variant="outlined"
                            style={{ width: "130px" }}
                        />
                    </FormControl>
                </div>

                <div className="state">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            onChange={handleshort}
                            value={short}
                            label="Search Short Name"
                            variant="outlined"
                            style={{ width: "130px" }}
                        />
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
                                    Player-Team({rows.length})
                                </MDTypography>
                                <Link
                                    to="/add-teamplayer"
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
                                            : "+ Add Team"}
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

export default Teamplayer;
