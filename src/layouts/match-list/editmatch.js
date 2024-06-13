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
// import
const Editmatch = () => {
  const [formData, setFormData] = useState({
    category: "",
    image: null,
  });
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
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
      content="Please Enter Certificate Name"
      dateTime="1 sec ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  //   const [certificateName, setCertificateName] = useState("");
  const [team_1_id, setteam] = useState("");
  const [team_2_id, setteam2] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [vanue, setvalue] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcounty] = useState("");
  const [league_name, setleague_id] = useState("");
  console.log(league_name)
  const [League, setleague] = useState([]);
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
      const response = await fetch(`${BASE_URL}/api/team/displayList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setTeam(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };
  useEffect(() => {
    fetchData();
    matchdata();
  }, []);
  const matchdata = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/match/displayList?leagueId`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = await response.json();
      // setTeam(responseData.data);
      const displayedit = responseData.data.find((item) => item._id === _id);
      console.log(displayedit)
      if (displayedit) {
        setleague_id(displayedit?.league_details?.[0]?.league_name);
        setteam2(displayedit.team_2_id);
        setteam(displayedit.team_1_id);
        setdate(displayedit.date);
        settime(displayedit.time);
        setvalue(displayedit.vanue);
        setcity(displayedit.city);
        setstate(displayedit.state);
        setcounty(displayedit.country);
      }
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };
  const handleSubmit = async () => {
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
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ paddingBottom: "10px" }}
                          id="demo-simple-select-label"
                        >
                          League Name
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setleague_id(e.target.value)}
                          value={league_name}
                          label="Select Team1"
                          style={{ padding: "10px 0px" }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {League &&
                            League.map((e) => (
                              <MenuItem value={e._id}>{e.league_name}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ paddingBottom: "10px" }}
                          id="demo-simple-select-label"
                        >
                          Select Team1
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setteam(e.target.value)}
                          value={team_1_id}
                          label="Select Team1"
                          style={{ padding: "10px 0px" }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {Team &&
                            Team.map((e) => (
                              <MenuItem value={e._id}>{e.team_name}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ paddingBottom: "10px" }}
                          id="demo-simple-select-label"
                        >
                          Select Team2
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setteam2(e.target.value)}
                          value={team_2_id}
                          label="Select Team2"
                          style={{ padding: "10px 0px" }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {Team &&
                            Team.map((e) => (
                              <MenuItem value={e._id}>{e.team_name}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="date"
                        // label=""
                        name="date"
                        value={date}
                        onChange={(e) => setdate(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="time"
                        label=""
                        name="certificate"
                        value={time}
                        onChange={(e) => settime(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <MDInput
                        type="vanue"
                        // label="vanue"
                        // name="certificate"
                        value={vanue}
                        onChange={(e) => setvalue(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        // label="city"
                        name="certificate"
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        // label="state"
                        name="state"
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="country"
                        name="country"
                        value={country}
                        onChange={(e) => setcounty(e.target.value)}
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

export default Editmatch;
