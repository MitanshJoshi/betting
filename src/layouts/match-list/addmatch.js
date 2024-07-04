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
import { Form, Link, useNavigate } from "react-router-dom";
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
import countries from "../../CountryStateCity.json";
// import { FormControl } from "react-bootstrap";
// import { InputLabel, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import countries from "../../CountryStateCity.json";
// import
const Addmatch = () => {
    const indiaObject = countries.find((country) => country.name === "India");
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const navigate = useNavigate();
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Added"
            content="Match Is Successfully Added."
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
    const [team_1_id, setteam] = useState("");
    const [team_2_id, setteam2] = useState("");
    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    const [value, setvalue] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [county, setcounty] = useState("");
    const [league_id, setleague_id] = useState("");
    const [League, setleague] = useState([]);
    // const [match_name, setmatch_name] = useState([]);
    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            e.target.value = ""; // Clear the input field if a past date is selected
            setErrorMessage("Please select a future date for the start date.");
            openErrorSB();
        } else {
            setdate(e.target.value);
        }
    };

    const fetchleague = async () => {
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
            setleague(responseData.data);
            console.log(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchleague();
    }, []);
    const [Team, setTeam] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/team/displayList/${league_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            setTeam(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        setTeam([]);
        fetchData();
    }, [league_id]);

    const [Team1, setTeam1] = useState([]);
    const [Team2, setTeam3] = useState([]);

    const handledisplay2 = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/teamPlayer/displayAllTeamPlayer?team_id=${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            setTeam3(responseData?.data?.[0]?.teamData.short_name);
            setteam2(responseData?.data?.[0]?._id);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };
    const handledisplay1 = async (id) => {
        console.log(id);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/teamPlayer/displayAllTeamPlayer?team_id=${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            setTeam1(responseData?.data?.[0]?.teamData.short_name);
            setteam(responseData?.data?.[0]?._id);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
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
    const handleSubmit = async () => {
        if (
            !league_id &&
            !team_1_id &&
            !team_2_id &&
            !date &&
            !time &&
            !value &&
            !city &&
            !state &&
            !county
        ) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }
        if (!league_id) {
            setErrorMessage("Please Select League Name!");
            openErrorSB();
            return;
        }
        if (!team_1_id) {
            setErrorMessage("Please Enter Team Name1!");
            openErrorSB();
            return;
        }
        if (!team_2_id) {
            setErrorMessage("Please Enter Team Name2 !");
            openErrorSB();
            return;
        }
        if (!date) {
            setErrorMessage("Please Enter Match StartDate!");
            openErrorSB();
            return;
        }
        if (!time) {
            setErrorMessage("Please Enter match Time!");
            openErrorSB();
            return;
        }
        if (!value) {
            setErrorMessage("Please Enter Venue!");
            openErrorSB();
            return;
        }
        if (!county) {
            setErrorMessage("Please Enter Country!");
            openErrorSB();
            return;
        }
        if (!state) {
            setErrorMessage("Please Enter State!");
            openErrorSB();
            return;
        }
        if (!city) {
            setErrorMessage("Please Enter City!");
            openErrorSB();
            return;
        }

        if(team_1_id === team_2_id){
          setErrorMessage("Teams cannot be same!");
            openErrorSB();
            return;
        }
      
        try {
            const response = await fetch(`${BASE_URL}/api/match/insert`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    league_id: league_id,
                    team_1_id: team_1_id,
                    team_2_id: team_2_id,
                    date: date,
                    time: time,
                    vanue: value,
                    city: city,
                    state: state,
                    country: county,
                    match_name: `${Team1} vs ${Team2}`,
                }),
            });

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
    const [onChange, handleChange] = useState();
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
                                    Add MATCH
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                League Name
                                            </label>
                                            <FormControl fullWidth>
                                                <InputLabel
                                                    style={{
                                                        paddingBottom: "10px",
                                                    }}
                                                    id="demo-simple-select-label"
                                                >
                                                    {/* League Name */}
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setleague_id(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={league_id}
                                                    // label="Select Team1"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        value=""
                                                        style={{
                                                            fontWeight: "200",
                                                        }}
                                                    >
                                                        Select
                                                    </MenuItem>
                                                    {League &&
                                                        League.map((e) => (
                                                            <MenuItem
                                                                value={e._id}
                                                            >
                                                                {e.league_name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Team Name1
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={team_1_id}
                                                    onChange={(e) =>
                                                        handledisplay1(
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
                                                    {Team &&
                                                        Team.map((e) => (
                                                            <MenuItem
                                                                value={e._id}
                                                            >
                                                                {e.team_name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Team Name2
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        handledisplay2(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={team_2_id}
                                                    // label="Select Team2"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        value=""
                                                        style={{
                                                            fontWeight: "200",
                                                        }}
                                                    >
                                                        Select
                                                    </MenuItem>
                                                    {Team &&
                                                        Team.map((e) => (
                                                            <MenuItem
                                                                value={e._id}
                                                            >
                                                                {e.team_name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Start Date
                                            </label>
                                            <MDInput
                                                type="date"
                                                label=""
                                                name="category"
                                                // value={logo}
                                                onChange={handleDateChange}
                                                fullWidth
                                                style={{ marginBottom: "10px" }}
                                            />
                                        </MDBox>

                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Time
                                            </label>
                                            <MDInput
                                                type="time"
                                                label=""
                                                name="category"
                                                // value={logo}
                                                onChange={(e) =>
                                                    settime(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Venue
                                            </label>
                                            <MDInput
                                                type="text"
                                                // label="Vanue"
                                                name="category"
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
                                                onChange={(e) =>
                                                    setvalue(e.target.value)
                                                }
                                                fullWidth
                                                // style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Country
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setcounty(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={county}
                                                    // label="Select Team1"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        Select
                                                    </MenuItem>
                                                    {countries &&
                                                        countries.map((e) => (
                                                            <MenuItem
                                                                value={e.name}
                                                            >
                                                                {e.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                State
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleState}
                                                    value={state}
                                                    // label="Select Team1"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        Select
                                                    </MenuItem>
                                                    {indiaObject &&
                                                        indiaObject.states.map(
                                                            (e) => (
                                                                <MenuItem
                                                                    key={e.name}
                                                                    value={
                                                                        e.name
                                                                    }
                                                                    width="150px"
                                                                >
                                                                    {e.name}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={7}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                City
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setcity(e.target.value)
                                                    }
                                                    value={city}
                                                    // label="Select Team1"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        value=""
                                                        style={{
                                                            fontWeight: "200",
                                                        }}
                                                    >
                                                        Select
                                                    </MenuItem>
                                                    {selectedState &&
                                                        selectedState.cities.map(
                                                            (e) => (
                                                                <MenuItem
                                                                    key={e.name}
                                                                    value={
                                                                        e.name
                                                                    }
                                                                    width="150px"
                                                                >
                                                                    {e.name}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mt={2} mb={1}>
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

export default Addmatch;
