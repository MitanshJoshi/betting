import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Audio } from "react-loader-spinner";
import MDAvatar from "components/MDAvatar";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useParams } from 'react-router-dom';
import { BASE_URL } from "BASE_URL";
// import
const Addleague = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [league_name, setleaguename] = useState("");
    const [end_date, setenddate] = useState("");
    const [start_date, setstartdate] = useState("");
    const navigate = useNavigate();

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfully Updated"
            content="League Is Successfully Added."
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

    const handleChange = (e) => {
        setleaguename(e.target.value);
    }

    const handleenddate = (e) => {
        setenddate(e.target.value);
    }

    const handlestartdate = (e) => {
        setstartdate(e.target.value);
    }

    const handleSubmit = async () => {
        if (!league_name || !end_date || !start_date) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }
        if (new Date(start_date) > new Date(end_date)) {
            setErrorMessage("Start date cannot be after end date!");
            openErrorSB();
            return;
        }

        try {
            const response = await fetch(
                `${BASE_URL}/api/league/insertLeague`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        league_name,
                        end_date,
                        start_date
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to insert league.");
            }

            openSuccessSB();
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
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
                                style={{
                                    position: "relative",
                                }}
                            >
                                <MDTypography variant="h6" color="white">
                                    cricket league add
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <div className="mb-2">
                                                <label htmlFor="">League-Name</label>
                                                <MDInput
                                                    type="text"
                                                    name="category"
                                                    value={league_name}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    style={{ marginBottom: "20px" }}
                                                />
                                            </div>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">League-StartDate</label>
                                            <MDInput
                                                type="date"
                                                label=""
                                                name="category"
                                                value={start_date}
                                                onChange={handlestartdate}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <div className="mb-2">
                                                <label htmlFor="">League-EndDate</label>
                                                <MDInput
                                                    type="date"
                                                    label=""
                                                    name="category"
                                                    value={end_date}
                                                    onChange={handleenddate}
                                                    fullWidth
                                                    style={{ marginBottom: "20px" }}
                                                />
                                            </div>
                                        </MDBox>
                                        <MDBox mt={4} mb={1}>
                                            <MDButton
                                                variant="gradient"
                                                color="info"
                                                fullWidth
                                                type="submit"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </MDButton>
                                            {renderSuccessSB}
                                            {renderErrorSB}
                                        </MDBox>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default Addleague;
