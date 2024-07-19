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
import { MuiColorInput } from "mui-color-input";
import { FormControl, MenuItem, Select } from "@mui/material";
// import
const Editteamlist = () => {
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const [league, setleague] = useState([]);
    const [leagueId, setLeagueId] = useState("");
    const [colorCode, setColorCode] = useState("#FFFFFF");

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Updated"
            content="Team Is Successfully Update."
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
    const [logo, setlogo] = useState(null);
    // const [other_photo, setother_photo] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [short_name, setshort_name] = useState("");
    const [captain, setcaptain] = useState("");
    const [team_name, setteam_name] = useState("");
    const [vice_captain, setvice_captain] = useState("");

    const handlelogo = (e) => {
        const file = e.target.files[0];
        setlogo(file);
    };

    const handleimg = (e) => {
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

        if (!logo) {
            setErrorMessage("Please Select select-logo!");
            openErrorSB();
            return;
        }
        if (!selectedFile) {
            setErrorMessage("Please Select Team-image!");
            openErrorSB();
            return;
        }
        if (!team_name) {
            setErrorMessage("Please Enter team_name!");
            openErrorSB();
            return;
        }
        if (!short_name) {
            setErrorMessage("Please Enter short_name!");
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
        // formData.append("productprice", productprice);

        try {
            const response = await fetch(
                `${BASE_URL}/api/team/updateTeam?teamId=${_id}`,
                {
                    method: "PUT",
                    headers: {
                        //   "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Team Add  faild`");
            }
            console.log(response);
            openSuccessSB();
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } catch (error) {}
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/team/displayList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            // setTeam(responseData.data);
            console.log(responseData.data);
            const matchedStartup = responseData.data.find(
                (item) => item._id === _id
            );
            if (matchedStartup) {
                console.log(matchedStartup)
                setshort_name(matchedStartup.short_name);
                setcaptain(matchedStartup.captain);
                setteam_name(matchedStartup.team_name);
                setvice_captain(matchedStartup.vice_captain);
                setLeagueId(matchedStartup.league_id);
                setColorCode(matchedStartup.color_code);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

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
        fetchData();
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
                                    Edit Team
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Team Logo</label>
                                            <MDInput
                                                type="file"
                                                label=""
                                                name="category"
                                                // value={category}
                                                onChange={handlelogo}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Team image</label>
                                            <MDInput
                                                type="file"
                                                // label="Category Name"
                                                name="category"
                                                // value={handleimg}
                                                onChange={handleimg}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
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
                                            <label htmlFor="">Team-name</label>
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
                                                name="team_name"
                                                value={team_name}
                                                onChange={(e) =>
                                                    setteam_name(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Team short-name
                                            </label>
                                            <MDInput
                                                type="text"
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
                                                name="short_name"
                                                value={short_name}
                                                onChange={(e) =>
                                                    setshort_name(
                                                        e.target.value
                                                    )
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>

                                        {/* <MDBox mb={2}>
                      <label htmlFor="">Team Captain</label>
                      <MDInput
                        type="text"
                        // label="captain"
                        name="captain"
                        value={captain}
                        onChange={(e) => setcaptain(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Team vice-captain</label>
                      <MDInput
                        type="text"
                        // label="vice_captain"
                        // name="category"
                        value={vice_captain}
                        onChange={(e) => setvice_captain(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox> */}

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

export default Editteamlist;
