/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { BASE_URL } from "BASE_URL";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, Grid, MenuItem, Snackbar, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import { Alert } from "@mui/material";
import { Grid as Loader } from "react-loader-spinner";
import { Button, FormControl, InputLabel, Select } from "@material-ui/core";
import MDAvatar from "components/MDAvatar";
import { useSpring, animated } from "@react-spring/web";

const Teamplayer = () => {
    const [players, setPlayers] = useState([]);
    const [teamPlayerDetails, setTeamPlayerDetails] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [League, setleague] = useState([]);
    const [league_id, setleague_id] = useState("");
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");

    const fetchleague = async () => {
        try {
            const token = localStorage.getItem("token");
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

    const getAllPlayers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/player/detailsList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            getTeams(responseData.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getTeams = async (players) => {
        try {
            const token = localStorage.getItem("token");
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
            console.log(responseData);
            const teamDetails = responseData.data.map((team) => ({
                team: team,
                players: [],
                captain: null,
                vice_captain: null,
            }));

            let tempPlayers = players.slice();

            for (const team of responseData.data) {
                const teamPlayersResponse = await getTeamPlayerById(team._id);
                if (teamPlayersResponse) {
                    teamPlayersResponse.data.forEach((teamPlayer) => {
                        const { player_id, c_or_vc } = teamPlayer;
                        const player = tempPlayers.find(
                            (player) => player._id === player_id
                        );
                        if (player) {
                            const targetTeam = teamDetails.find(
                                (detail) => detail.team._id === team._id
                            );
                            if (c_or_vc) {
                                if (c_or_vc === "captain") {
                                    targetTeam.captain = player;
                                } else if (c_or_vc === "vice_captain") {
                                    targetTeam.vice_captain = player;
                                }
                            } else {
                                targetTeam.players.push(player);
                            }
                            tempPlayers = tempPlayers.filter(
                                (p) => p._id !== player_id
                            );
                        }
                    });
                }
            }

            setPlayers(tempPlayers);
            setTeamPlayerDetails(teamDetails);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const getTeamPlayerById = async (teamId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/teamPlayer/display/${teamId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
            return { success: false, data: [] };
        }
    };

    useEffect(() => {
        fetchleague();
    }, []);

    useEffect(() => {
        if (league_id) {
            setPlayers([]);
            setTeamPlayerDetails([]);
            setLoading(true);
            getAllPlayers();
        }
    }, [league_id]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const activeId = active.id;
        const overId = over ? over.id : null;

        setTeamPlayerDetails((prevDetails) => {
            let draggedPlayer = null;
            let playerReturned = false;

            const newDetails = prevDetails.map((teamDetail) => {
                const playerIndex = teamDetail.players.findIndex(
                    (player) => player._id === activeId
                );
                if (playerIndex > -1) {
                    draggedPlayer = teamDetail.players[playerIndex];
                    teamDetail.players.splice(playerIndex, 1);
                } else if (
                    teamDetail.captain &&
                    teamDetail.captain._id === activeId
                ) {
                    draggedPlayer = teamDetail.captain;
                    teamDetail.captain = null;
                } else if (
                    teamDetail.vice_captain &&
                    teamDetail.vice_captain._id === activeId
                ) {
                    draggedPlayer = teamDetail.vice_captain;
                    teamDetail.vice_captain = null;
                }
                return teamDetail;
            });

            if (!draggedPlayer) {
                const playerIndex = players.findIndex(
                    (player) => player._id === activeId
                );
                if (playerIndex > -1) {
                    draggedPlayer = players[playerIndex];
                    setPlayers((prevPlayers) =>
                        prevPlayers.filter((player) => player._id !== activeId)
                    );
                }
            }

            if (draggedPlayer) {
                if (!overId || overId === "players") {
                    setPlayers((prevPlayers) => [
                        ...prevPlayers,
                        draggedPlayer,
                    ]);
                } else {
                    const [teamId, role] = overId.split("-");
                    const targetTeam = newDetails.find(
                        (teamDetail) => teamDetail.team._id === teamId
                    );
                    if (targetTeam) {
                        if (role === "captain") {
                            if (targetTeam.captain) {
                                setSnackbarMessage(
                                    "Captain is already occupied."
                                );
                                setSnackbarOpen(true);
                                playerReturned = true;
                            } else if (
                                targetTeam.vice_captain &&
                                targetTeam.vice_captain._id === activeId
                            ) {
                                setSnackbarMessage(
                                    "Vice-captain cannot be moved to captain."
                                );
                                setSnackbarOpen(true);
                                playerReturned = true;
                            } else {
                                targetTeam.captain = draggedPlayer;
                            }
                        } else if (role === "vice_captain") {
                            if (targetTeam.vice_captain) {
                                setSnackbarMessage(
                                    "Vice-captain is already occupied."
                                );
                                setSnackbarOpen(true);
                                playerReturned = true;
                            } else if (
                                targetTeam.captain &&
                                targetTeam.captain._id === activeId
                            ) {
                                setSnackbarMessage(
                                    "Captain cannot be moved to vice-captain."
                                );
                                setSnackbarOpen(true);
                                playerReturned = true;
                            } else {
                                targetTeam.vice_captain = draggedPlayer;
                            }
                        } else {
                            targetTeam.players.push(draggedPlayer);
                        }
                    }
                }
            }

            if (playerReturned) {
                return prevDetails;
            }
            return newDetails;
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSuccessSnackbarClose = () => {
        setSuccessSnackbarOpen(false);
    };

    const handleSave = async () => {
        const dataToSend = teamPlayerDetails.map((el) => ({
            team_id: el.team._id,
            players: el.players.map((x) => x._id),
            captain: el.captain ? el.captain._id : "",
            vice_captain: el.vice_captain ? el.vice_captain._id : "",
        }));

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/teamPlayer/insert`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.success) {
                setSuccessSnackbarMessage("Save operation successful!");
                setSuccessSnackbarOpen(true);
            } else {
                setSnackbarMessage("Save operation failed.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Save operation failed", error);
            setSnackbarMessage("Save operation failed.");
            setSnackbarOpen(true);
        }
    };

    const handleChangeLeague = (e) => {
        setleague_id(e.target.value);
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
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <MDTypography variant="h6" color="white">
                                    Edit Team
                                </MDTypography>
                                <Button
                                    variant="contained"
                                    color="white"
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    Save
                                </Button>
                            </MDBox>
                            <MDBox pt={3}>
                                <MDBox mx={2} mb={2}>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">
                                            League Name
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={(e) =>
                                                setleague_id(e.target.value)
                                            }
                                            value={league_id}
                                            style={{
                                                padding: "10px 0px",
                                                width: "200px",
                                            }}
                                        >
                                            <MenuItem
                                                value=""
                                                style={{
                                                    fontWeight: "200",
                                                }}
                                                selected
                                            >
                                                Select
                                            </MenuItem>
                                            {League &&
                                                League.map((e) => (
                                                    <MenuItem value={e._id}>
                                                        {e.league_name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </MDBox>

                                {loading ? (
                                    <MDBox
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100vh"
                                    >
                                        <Loader
                                            type="Grid"
                                            color="#00BFFF"
                                            height={80}
                                            width={80}
                                        />
                                    </MDBox>
                                ) : (
                                    <DndContext onDragEnd={handleDragEnd}>
                                        <Grid container spacing={2} padding={2}>
                                            <Grid item xs={12} md={6}>
                                                {teamPlayerDetails.map(
                                                    (teamDetail) => (
                                                        <TeamContainer
                                                            key={
                                                                teamDetail.team
                                                                    ._id
                                                            }
                                                            teamDetail={
                                                                teamDetail
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <PlayerContainer
                                                    players={players}
                                                    id="players"
                                                    title="Available Players"
                                                />
                                            </Grid>
                                        </Grid>
                                    </DndContext>
                                )}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSuccessSnackbarClose}
            >
                <Alert onClose={handleSuccessSnackbarClose} severity="success">
                    {successSnackbarMessage}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
};

const PlayerContainer = ({ players, id, title }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    const containerStyle = {
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        ...(title === "Available Players" && {
            position: "sticky",
            border: "2px solid #ddd",
            top: "100px",
            zIndex: 1000,
            backgroundColor: "#f9f9f9", // Ensure the background color covers content behind
        }),
        ...(title === "Team Players" && {
            borderTop: "1px solid #ddd",
        }),
    };

    return (
        <MDBox ref={setNodeRef} style={containerStyle}>
            <MDTypography variant={title === "Team Players" ? "h6" : "h5"}>
                {title}
            </MDTypography>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                }}
            >
                {players.map((player) => (
                    <DraggableItem
                        key={player._id}
                        player={player}
                        c_or_vc={false}
                    />
                ))}
            </div>
        </MDBox>
    );
};

const DraggableItem = ({ player, c_or_vc }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: player._id,
        });

    const springs = useSpring({
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : "translate3d(0px, 0px, 0px)",
        boxShadow: isDragging
            ? "0px 5px 10px rgba(0,0,0,0.2)"
            : "0px 1px 2px rgba(0,0,0,0.1)",
        config: { tension: 300, friction: 30 },
    });

    const style = {
        padding: "8px",
        border: "1.5px solid #DCDCDC",
        borderRadius: "25px",
        cursor: "grab",
        backgroundColor: "#F9F9F9",
        flexGrow: "1",
        maxWidth: c_or_vc ? "" : "34%",
    };

    return (
        <animated.div
            ref={setNodeRef}
            style={{ ...style, ...springs }}
            {...listeners}
            {...attributes}
        >
            <Author
                name={player.player_name}
                email={player.role}
                image={"./virat.webp"}
            />
        </animated.div>
    );
};

const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} name={name} size="sm" />
        <MDBox ml={1} lineHeight={0}>
            <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
            </MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
    </MDBox>
);

const TeamContainer = ({ teamDetail }) => {
    const { team, players, captain, vice_captain } = teamDetail;

    const { setNodeRef: setCaptainRef } = useDroppable({
        id: `${team._id}-captain`,
    });

    const { setNodeRef: setViceCaptainRef } = useDroppable({
        id: `${team._id}-vice_captain`,
    });

    return (
        <MDBox mb={3} padding={1} border="2px solid #ddd" borderRadius="8px">
            <Typography variant="h5" fontWeight="bold">
                {team.team_name}
            </Typography>
            <MDBox
                display="flex"
                justifyContent="space-between"
                borderBottom="1px solid #ddd"
                borderRadius="8px"
                p={2}
                bgcolor="#fafafa"
                gap={2}
            >
                <MDBox flex={1} ref={setCaptainRef}>
                    <MDTypography variant="button">Captain</MDTypography>
                    {captain ? (
                        <DraggableItem player={captain} c_or_vc={true} />
                    ) : (
                        <MDBox
                            p={2}
                            border="1px dashed #ddd"
                            borderRadius="4px"
                        >
                            Drop captain here
                        </MDBox>
                    )}
                </MDBox>
                <div
                    style={{
                        padding: "1px",
                        backgroundColor: "gray",
                        borderRadius: "10px",
                    }}
                ></div>
                <MDBox flex={1} ref={setViceCaptainRef}>
                    <MDTypography variant="button">Vice-Captain</MDTypography>
                    {vice_captain ? (
                        <DraggableItem player={vice_captain} c_or_vc={true} />
                    ) : (
                        <MDBox
                            p={2}
                            border="1px dashed #ddd"
                            borderRadius="4px"
                        >
                            Drop vice-captain here
                        </MDBox>
                    )}
                </MDBox>
            </MDBox>
            <PlayerContainer
                players={players}
                id={`${team._id}-players`}
                title="Team Players"
            />
        </MDBox>
    );
};

export default Teamplayer;
