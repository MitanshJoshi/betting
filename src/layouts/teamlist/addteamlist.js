/* eslint-disable jsx-a11y/img-redundant-alt */
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
import { FormControl, MenuItem, Select } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
// import
const Addteamlist = () => {
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [logo, setLogo] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [short_name, setShortName] = useState("");
    const [team_name, setTeamName] = useState("");

    const [league, setleague] = useState([]);
    const [leagueId, setLeagueId] = useState("");
    const [colorCode, setColorCode] = useState("#FFFFFF");

    const navigate = useNavigate();

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (
            !logo ||
            !selectedFile ||
            !short_name ||
            !team_name ||
            !leagueId ||
            !colorCode
        ) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }

        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("other_photo", selectedFile);
        formData.append("short_name", short_name);
        formData.append("team_name", team_name);
        formData.append("league_id", leagueId);
        formData.append("color_code", colorCode);

        try {
            const response = await fetch(`${BASE_URL}/api/team/createTeam`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Access-Control-Allow-Origin": "*",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Team Add failed");
            }

            openSuccessSB();
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } catch (error) {
            console.error("Error adding team:", error);
        }
    };

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfully Added"
            content="Team is successfully added."
            dateTime="1 sec ago"
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
            title="Error"
            content={errorMessage}
            dateTime="1 sec ago"
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );

    const fetchLeagues = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${BASE_URL}/api/league/displayList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            setleague(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchLeagues();
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
                                    Add Team
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="team-logo">
                                                Team Logo
                                            </label>
                                            <MDInput
                                                id="team-logo"
                                                type="file"
                                                onChange={handleLogoChange}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                            {logo && (
                                                <img
                                                    src={URL.createObjectURL(
                                                        logo
                                                    )}
                                                    alt="Team Logo Preview"
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        marginTop: "10px",
                                                    }}
                                                />
                                            )}
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="team-other-photo">
                                                Team Other Photo
                                            </label>
                                            <MDInput
                                                id="team-other-photo"
                                                type="file"
                                                onChange={handleImageChange}
                                                fullWidth
                                            />
                                            {selectedFile && (
                                                <img
                                                    src={URL.createObjectURL(
                                                        selectedFile
                                                    )}
                                                    alt="Team Other Photo Preview"
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        marginTop: "10px",
                                                    }}
                                                />
                                            )}
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor="team-other-photo"
                                                style={{ marginRight: "15px" }}
                                            >
                                                Color Code
                                            </label>
                                            <MuiColorInput
                                                value={colorCode}
                                                format="hex"
                                                onChange={(e) =>
                                                    setColorCode(e)
                                                }
                                            />
                                        </MDBox>
                                        <MDBox>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                League
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={leagueId}
                                                    onChange={(e) =>
                                                        setLeagueId(
                                                            e.target.value
                                                        )
                                                    }
                                                    // label="Select Team1"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        Select
                                                    </MenuItem>
                                                    {league.length !== 0 &&
                                                        league.map((e) => (
                                                            <MenuItem
                                                                value={e._id}
                                                            >
                                                                {e.league_name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Team Name</label>
                                            <MDInput
                                                type="text"
                                                // label="Team-name"
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^ a-z A-Z]/g,
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
                                                name="category"
                                                value={team_name}
                                                onChange={(e) =>
                                                    setTeamName(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Team Short-Name
                                            </label>
                                            <MDInput
                                                type="text"
                                                // label="short_nam"
                                                name="category"
                                                value={short_name}
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^A-Z]/g,
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
                                                onChange={(e) =>
                                                    setShortName(e.target.value)
                                                }
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

export default Addteamlist;
