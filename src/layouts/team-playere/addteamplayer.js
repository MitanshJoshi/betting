import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Audio } from "react-loader-spinner";
import MDAvatar from "components/MDAvatar";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import TextField from "@mui/material/TextField";
import { BASE_URL } from "BASE_URL";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMediaQuery } from "@mui/material";

const Addteamplayer = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully Added"
      content="Player-Team Added Successfully."
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
      title="Fill Error"
      content={errorMessage}
      dateTime="1 sec ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const [Team, setTeam] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/team/displayList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setTeam(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [player, setplayer] = useState([]);
  const fetchPlayer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/player/detailsList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setplayer(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  // useEffect(() => {
  //   fetchPlayer();
  // }, []);

  const [player_id, setteamplayer] = useState("");
  const [team_id, setteamname] = useState("");
  const [status, setstatus] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleSubmit = async () => {
    if (!team_id && !status) {
      setErrorMessage("Please Fill All Fields!");
      openErrorSB();
      return;
    }
    if (!team_id) {
      setErrorMessage("Please Fill Team Name!");
      openErrorSB();
      return;
    }
    if (!status) {
      setErrorMessage("Please Fill Status!");
      openErrorSB();
      return;
    }
    try {
      for (const playerId of selectedPlayers) {
        const response = await fetch(`${BASE_URL}/api/teamPlayer/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            team_id: team_id,
            player_id: playerId,
            status: status,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create team player");
        }
      }

      openSuccessSB();
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      setErrorMessage("Player already exists in a team");
      openErrorSB();
      return;
    }
  };

  const handleChange = (event) => {
    const playerId = event.target.name;
    if (event.target.checked) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    } else {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    }
  };

  const [Display, setDisplay] = useState([]);
  console.log(Display);
  const handleteam = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/teamPlayer/displayAllTeamPlayer?team_id=${team_id}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = await response.json();
      setDisplay(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchPlayer(); // Fetch player details on component mount
    handleteam(); // Fetch team player details whenever team_id changes
  }, [team_id]);

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
              <Grid container pt={4} pb={3} px={3}>
                <Grid item xs={12} md={6} xl={4} px={2}>
                  <FormControl fullWidth>
                    <InputLabel
                      style={{ paddingBottom: "10px" }}
                      id="demo-simple-select-label"
                    >
                      Team Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setteamname(e.target.value)}
                      label="Team Name"
                      style={{ padding: "10px 0px" }}
                    >
                      <MenuItem value="">Team Name</MenuItem>
                      {Team &&
                        Team.map((e) => (
                          <MenuItem key={e._id} value={e._id} width="200px">
                            {e.team_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} xl={4} px={2}>
                  <FormControl fullWidth>
                    <InputLabel
                      style={{ paddingBottom: "10px" }}
                      id="demo-simple-select-label"
                    >
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setstatus(e.target.value)}
                      label="Status"
                      style={{ padding: "10px 0px" }}
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} xl={4} px={2}>
                  <MDBox mt={0} mb={0}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={() => setModalOpen(true)}
                    >
                      Team Players
                    </MDButton>
                  </MDBox>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={12}
                  px={2}
                  style={{ marginTop: "20px", fontWeight:'600' }}
                >
                  Select Players
                </Grid>
                {team_id && (
                  <>
                    {player &&
                      player.map((feature) => {
                        // Check if feature.player_name is present in Display?.[0]?.playersData
                        const isPlayerInDisplay =
                          Display?.[0]?.playersData.some(
                            (playerData) =>
                              playerData.player_name === feature.player_name
                          );

                        // Render the player only if it's not in Display?.[0]?.playersData
                        if (!isPlayerInDisplay) {
                          return (
                            <Grid
                              item
                              xs={12}
                              md={6}
                              xl={4}
                              px={2}
                              key={feature._id}
                            >
                              <MDBox display="flex" alignItems="center">
                                <Switch
                                  id={feature._id}
                                  name={feature._id}
                                  onChange={handleChange}
                                />
                                <label
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                  }}
                                  htmlFor={feature._id}
                                >
                                  {feature.player_name}
                                </label>
                              </MDBox>
                            </Grid>
                          );
                        } else {
                          return null; // Don't render the player
                        }
                      })}
                  </>
                )}
              </Grid>

              <Grid item xs={0} md={0} xl={20} px={40}>
                <MDBox mt={0} mb={0}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    type="submit"
                    onClick={handleSubmit}
                    style={{marginBottom:"20px"}}
                  >
                    Submit
                  </MDButton>
                  {renderSuccessSB}
                  {renderErrorSB}
                </MDBox>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullScreen={fullScreen}
      >
        <DialogTitle>{Display?.[0]?.teamData?.team_name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* <MDTypography>Select Players</MDTypography> */}
              {Display &&
                Display?.[0]?.playersData?.map((feature) => (
                  <MDBox display="flex" alignItems="center" key={feature._id}>
                    <span>
                      <img
                        src={feature?.player_photo}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginTop: "10px",
                        }}
                      />
                    </span>
                    <label
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                      htmlFor={feature._id}
                    >
                      {feature?.player_name}
                    </label>
                  </MDBox>
                ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setModalOpen(false)} color="info">
            Cancel
          </MDButton>
          {/* <MDButton onClick={handleSubmit} color="info">
            Submit
          </MDButton> */}
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Addteamplayer;
