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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import countries from "../../CountryStateCity.json";

const Editmatch = () => {
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    const [errorMessage, setErrorMessage] = useState("false");

    const [innings, setInnings] = useState("");
    const [overs, setOvers] = useState("");

    const navigate = useNavigate();
    const { _id } = useParams();

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Added"
            content="Match Is Successfully Updated."
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

    const [team_1_id, setTeam1] = useState("");
    const [team_2_id, setTeam2] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [vanue, setVanue] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [league_name, setLeagueName] = useState("");
    const [Team, setTeam] = useState([]);
    const [League, setLeague] = useState([]);
    const [selectedState, setSelectedState] = useState(null);

    let indiaObject = countries.find((c) => c.name === country);

    const fetchLeague = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/league/displayList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            setLeague(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/team/displayList/${league_name}`,
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
        fetchLeague();
        matchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [league_name]);

    const matchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/match/matchDetails?matchId=${_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            const data = responseData.data[0];
            console.log(data);
            setLeagueName(data.league_id);
            setTeam1(data.team_1_id);
            setTeam2(data.team_2_id);
            setDate(moment(data.date).format("YYYY-MM-DD"));
            setTime(data.time);
            setVanue(data.vanue);
            setCountry(data.country);
            setState(data.state);
            setCity(data.city);
            setInnings(data.innings);
            setOvers(data.overs);
            indiaObject = countries.find((c) => c.name === data.country);
            const selectedState = indiaObject.states.find(
                (state) => state.name === data.state
            );
            setSelectedState(selectedState);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const handleSubmit = async () => {
        if (
            !league_name &&
            !team_1_id &&
            !team_2_id &&
            !date &&
            !time &&
            !vanue &&
            !city &&
            !state &&
            !country &&
            !innings &&
            !overs
        ) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }
        if (!league_name) {
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
        if (!vanue) {
            setErrorMessage("Please Enter Venue!");
            openErrorSB();
            return;
        }
        if (!country) {
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

        if (team_1_id === team_2_id) {
            setErrorMessage("Teams cannot be same!");
            openErrorSB();
            return;
        }

        const token = localStorage.getItem("token");
        const response = await fetch(
            `${BASE_URL}/api/match/update?matchId=${_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    league_id: league_name,
                    team_1_id: team_1_id,
                    team_2_id: team_2_id,
                    date: date,
                    time: time,
                    vanue: vanue,
                    city: city,
                    state: state,
                    country: country,
                }),
            }
        );

        openSuccessSB();
        setTimeout(() => {
            navigate(-1);
        }, 2000);
    };

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            e.target.value = ""; // Clear the input field if a past date is selected
            setErrorMessage("Please select a future date for the start date.");
            openErrorSB();
        } else {
            setDate(e.target.value);
        }
    };

    const handleState = (e) => {
        const selectedStateName = e.target.value;
        const selectedState = indiaObject.states.find(
            (state) => state.name === selectedStateName
        );

        setSelectedState(selectedState);
        setState(selectedStateName);
        setCity(""); // Reset the city selection
    };

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
                                    Edit Match
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                League Name
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setLeagueName(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={league_name}
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem value="">
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
                                                    onChange={(e) =>
                                                        setTeam1(e.target.value)
                                                    }
                                                    value={team_1_id}
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
                                                        setTeam2(e.target.value)
                                                    }
                                                    value={team_2_id}
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
                                                Start Date
                                            </label>
                                            <MDInput
                                                type="date"
                                                name="date"
                                                value={date}
                                                onChange={handleDateChange}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
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
                                                name="certificate"
                                                value={time}
                                                onChange={(e) =>
                                                    setTime(e.target.value)
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
                                                type="vanue"
                                                value={vanue}
                                                onChange={(e) =>
                                                    setVanue(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
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
                                                        setCountry(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={country}
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
                                        <MDBox mb={2}>
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
                                                        setCity(e.target.value)
                                                    }
                                                    value={city}
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
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Innings
                                            </label>
                                            <MDInput
                                                type="text"
                                                // label="Vanue"
                                                name="category"
                                                value={innings}
                                                onInput={(e) =>
                                                    (e.target.value =
                                                        e.target.value.replace(
                                                            /[^0-9]/g,
                                                            ""
                                                        ))
                                                }
                                                onChange={(e) =>
                                                    setInnings(e.target.value)
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
                                                Overs
                                            </label>
                                            <MDInput
                                                type="text"
                                                // label="Vanue"
                                                name="category"
                                                value={overs}
                                                onInput={(e) =>
                                                    (e.target.value =
                                                        e.target.value.replace(
                                                            /[^0-9]/g,
                                                            ""
                                                        ))
                                                }
                                                onChange={(e) =>
                                                    setOvers(e.target.value)
                                                }
                                                fullWidth
                                                // style={{ marginBottom: "20px" }}
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
            <Footer />
        </DashboardLayout>
    );
};

export default Editmatch;
