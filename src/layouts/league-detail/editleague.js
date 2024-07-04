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
import { useParams } from "react-router-dom";
import { BASE_URL } from "BASE_URL";
import { Input } from "@mui/material";
import moment from "moment";

const Editleague = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const navigate = useNavigate();
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Updated"
            content=" league Is Successfully Updated."
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

    const { _id } = useParams();

    const [league_name, setleaguename] = useState("");
    const [end_date, setenddate] = useState("");
    const [start_date, setstartdate] = useState("");

    console.log(end_date)

    const handleChange = (e) => {
        setleaguename(e.target.value);
    };

    const handleenddate = (e) => {
        setenddate(e.target.value);
    };
    const handlestartdate = (e) => {
        setstartdate(e.target.value);
    };

    // const handleSubmit = async () => {

    //     const token = `Bearer ${localStorage.getItem("token")}`;
    //     const response = await fetch(`${BASE_URL}/api/league/insertLeague`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: token,
    //         },
    //         body: JSON.stringify({
    //             league_name,
    //             end_date,
    //             start_date
    //         }),
    //     });

    //     openSuccessSB();
    //     setTimeout(() => {
    //         navigate(-1)
    //     }, 2000);

    // }
    const handleSubmit = async () => {
        if (!league_name && !end_date && start_date) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }
        if (!league_name) {
            setErrorMessage("Please Select League-Name!");
            openErrorSB();
            return;
        }
        if (!start_date) {
            setErrorMessage("Please Enter League-StartDate!");
            openErrorSB();
            return;
        }
        if (!end_date) {
            setErrorMessage("Please Enter League-EndDate!");
            openErrorSB();
            return;
        }

        try {
            const response = await fetch(
                `${BASE_URL}/api/league/update?leagueId=${_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        // "Access-Control-Allow-Origin": "*",
                        Authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        league_name,
                        end_date,
                        start_date,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Chat inquiry failed");
            }
            openSuccessSB();
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error) {
            if (error) {
                console.log("hello");
            }
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/league/displayList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            //   setleague(responseData.data);??
            //   console.log(responseData.data)
            const leaguedata = responseData.data.find(
                (item) => item._id === _id
            );
            if (leaguedata) {
                console.log(leaguedata);
                setleaguename(leaguedata.league_name);
                setenddate(moment(leaguedata.end_date).format("YYYY-MM-DD"));
                setstartdate(moment(leaguedata.start_date).format("YYYY-MM-DD"));
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                                    Update league
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                League-Name
                                            </label>
                                            <MDInput
                                                type="text"
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^a-z A-Z]/g,
                                                            ""
                                                        ); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (
                                                        value.length > 0 &&
                                                        value[0] === " "
                                                    ) {
                                                        // If the first digit is zero, remove it
                                                        value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                }}
                                                name="league_name"
                                                value={league_name}
                                                onChange={handleChange}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                League-StarDate
                                            </label>
                                            <Input
                                                type="date"
                                                value={start_date}
                                                onChange={handlestartdate}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                League-EndDate
                                            </label>
                                            <Input
                                                type="date"
                                                value={end_date}
                                                onChange={handleenddate}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
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
            {/* <Footer /> */}
        </DashboardLayout>
    );
};

export default Editleague;
