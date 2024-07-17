import {
    Card,
    Grid,
    FormControl,
    Select,
    MenuItem,
    Stack,
    TextField,
    InputLabel,
    Button,
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Typography,
} from "@mui/material";
import { BASE_URL } from "BASE_URL";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { Grid as Loader } from "react-loader-spinner";
import { useParams } from "react-router-dom";

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

const ScoreBoard = () => {
    const { match_id } = useParams();

    const [matchDetails, setMatchDetails] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [teamId, setTeamId] = useState("");
    const [choice, setChoice] = useState("");

    const [scoreboard, setScoreboard] = useState(null);
    const [matchScore, setMatchScore] = useState(null);
    const [battingTeamId, setBattingTeamId] = useState("");
    const [ballingTeamId, setBallingTeamId] = useState("");
    const [inning, setInning] = useState(1);
    const [outBatsmanId, setOutBatsmanId] = useState("");

    const [battingTeamPlayers, setBattingTeamPlayers] = useState([]);
    const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState([]);

    const [batsmanId1, setBatsmanId1] = useState("");
    const [batsmanId2, setBatsmanId2] = useState("");
    const [bowlingId, setBowlingId] = useState("");
    const [selectedBatsman, setSelectedBatsman] = useState("");
    const [runs, setRuns] = useState(0);
    const [over, setOver] = useState("0.1");
    const [secondaryPlayerId, setSecondaryPlayerId] = useState("");
    const [statusType, setStatusType] = useState("");

    // Dialog states
    const [openWideConfirm, setOpenWideConfirm] = useState(false);
    const [openWicketForm, setOpenWicketForm] = useState(false);
    const [openNoBallForm, setOpenNoBallForm] = useState(false);
    const [openOverThrow, setOpenOverThrow] = useState(false);
    const [overthrowBoundary, setOverthrowBoundary] = useState(0);
    const [openNewInning, setOpenNewInning] = useState(false);

    const addBallToOvers = (overs) => {
        let [wholeOvers, balls] = overs.toString().split(".").map(Number);

        balls += 1;

        if (balls > 6) {
            wholeOvers += 1;
            balls = 0;
        }
        setOver(`${wholeOvers}.${balls}`);
    };

    const ballsToOvers = (balls) => {
        const overs = Math.floor(balls / 6);
        const remainingBalls = balls % 6;

        const oversFormat = `${overs}.${remainingBalls}`;
        return oversFormat;
    };

    const calculateRuns = (total, fours, sixes) => {
        return total - (4 * fours + 6 * sixes);
    };

    // Batting rows and cols
    const batting_cols = [
        { Header: "Batting", accessor: "batting", align: "left" },
        { Header: "R", accessor: "r", align: "right" },
        { Header: "B", accessor: "b", align: "right" },
        { Header: "4s", accessor: "four", align: "right" },
        { Header: "6s", accessor: "six", align: "right" },
    ];
    const batting_rows = scoreboard?.balling[0]
        ? scoreboard?.batting?.map((item) => ({
              batting: (
                  <Author
                      name={`${item?.playerDetails?.player_name} (${item?.runs})`}
                      image={"/virat.webp"}
                      email={
                          item.isOut
                              ? ` ${item?.outBy?.status} by ${item?.outBy?.secondaryPlayerDetails?.player_name}`
                              : ""
                      }
                  />
              ),
              r: (
                  <MDTypography
                      component="a"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {calculateRuns(item?.runs, item?.fours, item?.sixes)}
                  </MDTypography>
              ),
              b: (
                  <MDTypography
                      component="a"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {item?.balls}
                  </MDTypography>
              ),
              four: (
                  <MDTypography
                      component="a"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {item?.fours}
                  </MDTypography>
              ),
              six: (
                  <MDTypography
                      component="a"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {item?.sixes}
                  </MDTypography>
              ),
          }))
        : [];

    // Balling rows and cols
    const balling_cols = [
        { Header: "Balling", accessor: "balling", align: "left" },
        { Header: "O", accessor: "o", align: "right" },
        { Header: "R", accessor: "r", align: "right" },
        { Header: "W", accessor: "w", align: "right" },
    ];
    const balling_rows = scoreboard?.balling[0]
        ? scoreboard?.balling?.map((item) => ({
              balling: (
                  <Author
                      name={item?.playerDetails?.player_name}
                      image={"/virat.webp"}
                  />
              ),
              o: (
                  <MDTypography
                      component="a"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {ballsToOvers(item?.balls)}
                  </MDTypography>
              ),
              r: (
                  <MDTypography
                      component="a"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {item?.runs}
                  </MDTypography>
              ),
              w: (
                  <MDTypography
                      component="a"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {item?.wickets}
                  </MDTypography>
              ),
          }))
        : [];

    const fetchMatchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/match/matchDetails?matchId=${match_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData.data[0]);
            setMatchDetails(responseData.data[0]);
            setIsStarted(responseData.data[0].isStarted);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartMatch = async () => {
        const toss = {
            teamId: teamId,
            choice: choice,
        };
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/match/start/${match_id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ toss: toss }),
                }
            );
            const responseData = await response.json();
            if (responseData.success) {
                setIsStarted(true);
                fetchMatchData();
                getScoreBoard();
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const getBattingTeamPlayers = async (team_id, outPlayers) => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/teamPlayer/display/${team_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log("Batting: ", responseData);
            if (responseData.success) {
                const availablePlayers = responseData.data.filter(
                    (player) => !outPlayers.includes(player.player_id)
                );
                setBattingTeamPlayers(availablePlayers);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        } finally {
            setLoading(false);
        }
    };

    const getBallingTeanPlayers = async (team_id) => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/teamPlayer/display/${team_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log("Balling: ", responseData);
            if (responseData.success) {
                setBowlingTeamPlayers(responseData.data);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreBoard = async (inning) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/scoreboard/${match_id}?inning=${inning}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log("SCORE TABLE : ", responseData.data);
            if (responseData.success) {
                setScoreboard(responseData.data);
                setBattingTeamId(responseData.data.battingTeam);
                setBallingTeamId(responseData.data.ballingTeam);
                setInning(responseData.data.inning);
                const outPlayers = responseData.data.batting
                    .filter((item) => item?.isOut)
                    .map((player) => player.playerId);
                await getBattingTeamPlayers(
                    responseData.data.battingTeam,
                    outPlayers
                );
                await getBallingTeanPlayers(responseData.data.ballingTeam);
                await fetchMatchScore();
                await fetchLastScore(inning);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScoreCardSubmit = async (status) => {
        const score_card = {
            matchId: match_id,
            inning: inning,
            battingTeam: battingTeamId,
            batsman1Id: selectedBatsman,
            batsman2Id:
                selectedBatsman === batsmanId1 ? batsmanId2 : batsmanId1,
            outId: outBatsmanId,
            ballerId: bowlingId,
            secondaryPlayerId: secondaryPlayerId || bowlingId,
            currBall: over,
            status: status,
            overthrowBoundary: overthrowBoundary,
            run: parseInt(runs),
        };

        if (!["wide", "nb", "nbout"].includes(status)) {
            addBallToOvers(over);
        }

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/scorecard`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(score_card),
            });
            const responseData = await response.json();
            if (responseData.success) {
                console.log(responseData);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }

        setRuns(0);
        setOverthrowBoundary(0);
        setStatusType("");
        getScoreBoard(inning);
    };

    const fetchMatchScore = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/matchscore/${match_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.success) {
                setMatchScore(responseData.data);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchLastScore = async (inning) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/scorecard/lastscore/${match_id}?inning=${inning}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log("LAST SCORE: ", responseData);
            if (responseData.success) {
                setBatsmanId1(responseData.data.batsman1Id);
                setSelectedBatsman(responseData.data.batsman1Id);
                setBatsmanId2(responseData.data.batsman2Id);
                addBallToOvers(responseData.data.currBall);
                setBowlingId(responseData.data.ballerId);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const handleNewInning = async () => {
        const dataToSend = {
            inning: inning,
            battingTeam: battingTeamId,
            ballingTeam: ballingTeamId,
        };

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/scoreboard/create/${match_id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToSend),
                }
            );
            const responseData = await response.json();
            if (responseData.success) {
                fetchMatchData();
                getScoreBoard(inning);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchLastInning = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/scoreboard/last/${match_id}`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            if (responseData.success) {
                console.log("inning:",responseData.data);
                getScoreBoard(responseData.data.inning);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchMatchData();
        fetchLastInning()
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={3} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={2}
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
                                    {matchDetails && matchDetails?.match_name}
                                </MDTypography>
                                <MDButton
                                    size="small"
                                    onClick={() => setOpenNewInning(true)}
                                >
                                    <MDTypography
                                        variant="button"
                                        color="black"
                                    >
                                        New Inning
                                    </MDTypography>
                                </MDButton>
                            </MDBox>
                            <MDBox p={3}>
                                {!isStarted ? (
                                    <MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{
                                                    fontWeight: "200",
                                                }}
                                            >
                                                Toss Won
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setTeamId(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={teamId}
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
                                                    <MenuItem
                                                        value={
                                                            matchDetails
                                                                ?.team_1_details[0]
                                                                ?._id
                                                        }
                                                        style={{
                                                            fontWeight: "200",
                                                        }}
                                                    >
                                                        {
                                                            matchDetails
                                                                ?.team_1_details[0]
                                                                ?.team_name
                                                        }
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={
                                                            matchDetails
                                                                ?.team_2_details[0]
                                                                ?._id
                                                        }
                                                        style={{
                                                            fontWeight: "200",
                                                        }}
                                                    >
                                                        {
                                                            matchDetails
                                                                ?.team_2_details[0]
                                                                ?.team_name
                                                        }
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{
                                                    fontWeight: "200",
                                                }}
                                            >
                                                Winner Chose
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setChoice(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={choice}
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
                                                    <MenuItem
                                                        value="Bat"
                                                        style={{
                                                            fontWeight: "200",
                                                        }}
                                                    >
                                                        Bat
                                                    </MenuItem>
                                                    <MenuItem
                                                        value="Bowl"
                                                        style={{
                                                            fontWeight: "200",
                                                        }}
                                                    >
                                                        Bowl
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDButton
                                            color="info"
                                            size="small"
                                            onClick={handleStartMatch}
                                        >
                                            <MDTypography color="white">
                                                Start Match
                                            </MDTypography>
                                        </MDButton>
                                    </MDBox>
                                ) : (
                                    <MDBox>
                                        <Card
                                            sx={{
                                                marginBottom: "20px",
                                                padding: "10px",
                                            }}
                                        >
                                            <Box
                                                sx={{ display: "flex" }}
                                                justifyContent={"center"}
                                                gap={"70px"}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: "20px",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            {
                                                                matchScore
                                                                    ?.team1
                                                                    ?.teamDetails
                                                                    ?.team_name
                                                            }
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            gap: "1px",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                fontSize:
                                                                    "30px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            {
                                                                matchScore
                                                                    ?.team1
                                                                    ?.runs
                                                            }{" "}
                                                            /{" "}
                                                            {
                                                                matchScore
                                                                    ?.team1
                                                                    ?.wicket
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            (
                                                            {
                                                                matchScore
                                                                    ?.team1
                                                                    ?.overs
                                                            }
                                                            )
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: "20px",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            gap: "1px",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                fontSize:
                                                                    "30px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            {
                                                                matchScore
                                                                    ?.team2
                                                                    ?.runs
                                                            }{" "}
                                                            /{" "}
                                                            {
                                                                matchScore
                                                                    ?.team2
                                                                    ?.wicket
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            (
                                                            {
                                                                matchScore
                                                                    ?.team2
                                                                    ?.overs
                                                            }
                                                            )
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            {
                                                                matchScore
                                                                    ?.team2
                                                                    ?.teamDetails
                                                                    ?.team_name
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginTop: "15px",
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {matchScore?.toss
                                                        ?.teamId ===
                                                    matchScore?.team1?.teamId
                                                        ? matchScore?.team1
                                                              ?.teamDetails
                                                              .short_name
                                                        : matchScore?.team2
                                                              ?.teamDetails
                                                              .short_name}{" "}
                                                    won and choose to{" "}
                                                    {matchScore?.toss?.choice}
                                                </Typography>
                                            </Box>
                                        </Card>
                                        <Card>
                                            <Stack>
                                                <Box
                                                    p={2}
                                                    sx={{
                                                        display: "flex",
                                                        gap: "15px",
                                                    }}
                                                >
                                                    <TextField
                                                        onInput={(e) =>
                                                            (e.target.value =
                                                                e.target.value.replace(
                                                                    /[^0-9]/g,
                                                                    ""
                                                                ))
                                                        }
                                                        value={inning}
                                                        onChange={(e) =>
                                                            setInning(
                                                                e.target.value
                                                            )
                                                        }
                                                        variant="outlined"
                                                        sx={{
                                                            height: "50px",
                                                            marginTop: "15px",
                                                        }}
                                                        label="Innings"
                                                    />
                                                </Box>
                                                <Grid container>
                                                    <Grid
                                                        item
                                                        p={2}
                                                        xs={12}
                                                        md={4}
                                                    >
                                                        <Stack gap={5}>
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                <RadioGroup
                                                                    value={
                                                                        selectedBatsman
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedBatsman(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                >
                                                                    <FormControlLabel
                                                                        value={
                                                                            batsmanId1
                                                                        }
                                                                        control={
                                                                            <Radio />
                                                                        }
                                                                        label=""
                                                                    />
                                                                </RadioGroup>
                                                                <FormControl
                                                                    sx={{
                                                                        width: "50%",
                                                                    }}
                                                                >
                                                                    <InputLabel id="player1">
                                                                        Batsman
                                                                        1
                                                                    </InputLabel>
                                                                    <Select
                                                                        value={
                                                                            batsmanId1
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setBatsmanId1(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            height: "50px",
                                                                        }}
                                                                        labelId="player1"
                                                                        label="Batsman 1"
                                                                    >
                                                                        {battingTeamPlayers
                                                                            .filter(
                                                                                (
                                                                                    x
                                                                                ) =>
                                                                                    x.player_id !==
                                                                                    batsmanId2
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    player
                                                                                ) => (
                                                                                    <MenuItem
                                                                                        key={
                                                                                            player._id
                                                                                        }
                                                                                        value={
                                                                                            player.player_id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            player
                                                                                                .player[0]
                                                                                                .player_name
                                                                                        }
                                                                                    </MenuItem>
                                                                                )
                                                                            )}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                <RadioGroup
                                                                    value={
                                                                        selectedBatsman
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedBatsman(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                >
                                                                    <FormControlLabel
                                                                        value={
                                                                            batsmanId2
                                                                        }
                                                                        control={
                                                                            <Radio />
                                                                        }
                                                                        label=""
                                                                    />
                                                                </RadioGroup>
                                                                <FormControl
                                                                    sx={{
                                                                        width: "50%",
                                                                    }}
                                                                >
                                                                    <InputLabel id="player2">
                                                                        Batsman
                                                                        2
                                                                    </InputLabel>
                                                                    <Select
                                                                        value={
                                                                            batsmanId2
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setBatsmanId2(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            height: "50px",
                                                                        }}
                                                                        labelId="player2"
                                                                        label="Batsman 2"
                                                                    >
                                                                        {battingTeamPlayers
                                                                            .filter(
                                                                                (
                                                                                    x
                                                                                ) =>
                                                                                    x.player_id !==
                                                                                    batsmanId1
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    player
                                                                                ) => (
                                                                                    <MenuItem
                                                                                        key={
                                                                                            player._id
                                                                                        }
                                                                                        value={
                                                                                            player.player_id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            player
                                                                                                .player[0]
                                                                                                .player_name
                                                                                        }
                                                                                    </MenuItem>
                                                                                )
                                                                            )}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        p={2}
                                                        xs={12}
                                                        md={4}
                                                    >
                                                        <Stack gap={5}>
                                                            <FormControl
                                                                fullWidth
                                                                sx={{
                                                                    width: "50%",
                                                                }}
                                                            >
                                                                <InputLabel id="bowler">
                                                                    Bowler
                                                                </InputLabel>
                                                                <Select
                                                                    value={
                                                                        bowlingId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setBowlingId(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        height: "50px",
                                                                    }}
                                                                    labelId="bowler"
                                                                    label="Bowler"
                                                                >
                                                                    {bowlingTeamPlayers.map(
                                                                        (
                                                                            player
                                                                        ) => (
                                                                            <MenuItem
                                                                                key={
                                                                                    player._id
                                                                                }
                                                                                value={
                                                                                    player.player_id
                                                                                }
                                                                            >
                                                                                {
                                                                                    player
                                                                                        .player[0]
                                                                                        .player_name
                                                                                }
                                                                            </MenuItem>
                                                                        )
                                                                    )}
                                                                </Select>
                                                            </FormControl>
                                                            <TextField
                                                                inputProps={{
                                                                    onInput: (
                                                                        e
                                                                    ) => {
                                                                        e.target.value =
                                                                            e.target.value.replace(
                                                                                /[^0-6]/g,
                                                                                ""
                                                                            );
                                                                    },
                                                                }}
                                                                value={runs}
                                                                onChange={(e) =>
                                                                    setRuns(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                variant="outlined"
                                                                sx={{
                                                                    height: "50px",
                                                                    width: "50%",
                                                                }}
                                                                label="Runs"
                                                            />
                                                        </Stack>
                                                    </Grid>
                                                    <Grid p={2} xs={12} md={4}>
                                                        <TextField
                                                            value={over}
                                                            onChange={(e) =>
                                                                setOver(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            variant="outlined"
                                                            sx={{
                                                                height: "50px",
                                                                width: "50%",
                                                            }}
                                                            label="Overs"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container p={2}>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={4}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            gap: "15px",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                gap: "15px",
                                                            }}
                                                        >
                                                            <MDButton
                                                                onClick={() => {
                                                                    setStatusType(
                                                                        "run"
                                                                    );
                                                                    setRuns(0);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                color="info"
                                                            >
                                                                0
                                                            </MDButton>
                                                            <MDButton
                                                                onClick={() => {
                                                                    setStatusType(
                                                                        "run"
                                                                    );
                                                                    setRuns(1);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                color="info"
                                                            >
                                                                1
                                                            </MDButton>
                                                            <MDButton
                                                                onClick={() => {
                                                                    setStatusType(
                                                                        "run"
                                                                    );
                                                                    setRuns(2);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                color="info"
                                                            >
                                                                2
                                                            </MDButton>
                                                            <MDButton
                                                                onClick={() => {
                                                                    setStatusType(
                                                                        "run"
                                                                    );
                                                                    setRuns(3);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                color="info"
                                                            >
                                                                3
                                                            </MDButton>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                gap: "15px",
                                                            }}
                                                        >
                                                            <MDButton
                                                                onClick={() => {
                                                                    setStatusType(
                                                                        "run"
                                                                    );
                                                                    setRuns(4);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                color="info"
                                                            >
                                                                4
                                                            </MDButton>
                                                            <MDButton
                                                                onClick={() => {
                                                                    setStatusType(
                                                                        "run"
                                                                    );
                                                                    setRuns(5);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                color="info"
                                                            >
                                                                5
                                                            </MDButton>
                                                            <MDButton
                                                                onClick={() => {
                                                                    setStatusType(
                                                                        "run"
                                                                    );
                                                                    setRuns(6);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                color="info"
                                                            >
                                                                6
                                                            </MDButton>
                                                        </Box>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={4}
                                                        sx={{
                                                            display: "flex",
                                                            gap: "15px",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "flex-end",
                                                        }}
                                                    >
                                                        <MDButton
                                                            onClick={() => {
                                                                setStatusType(
                                                                    "four"
                                                                );
                                                                setRuns(4);
                                                            }}
                                                            variant="contained"
                                                            size="small"
                                                            color="info"
                                                            sx={{
                                                                height: "fit-content",
                                                            }}
                                                        >
                                                            4
                                                        </MDButton>
                                                        <MDButton
                                                            onClick={() => {
                                                                setStatusType(
                                                                    "six"
                                                                );
                                                                setRuns(6);
                                                            }}
                                                            variant="contained"
                                                            size="small"
                                                            color="info"
                                                            sx={{
                                                                height: "fit-content",
                                                            }}
                                                        >
                                                            6
                                                        </MDButton>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={4}
                                                        sx={{
                                                            display: "flex",
                                                            gap: "15px",
                                                            alignItems:
                                                                "flex-end",
                                                        }}
                                                    >
                                                        <MDButton
                                                            onClick={(e) =>
                                                                setOpenWicketForm(
                                                                    true
                                                                )
                                                            }
                                                            variant="contained"
                                                            size="small"
                                                            color="error"
                                                            sx={{
                                                                height: "fit-content",
                                                            }}
                                                        >
                                                            W
                                                        </MDButton>
                                                        <MDButton
                                                            onClick={() =>
                                                                setOpenOverThrow(
                                                                    true
                                                                )
                                                            }
                                                            variant="contained"
                                                            size="small"
                                                            color="warning"
                                                            sx={{
                                                                height: "fit-content",
                                                            }}
                                                        >
                                                            Overthrow
                                                        </MDButton>
                                                        <MDButton
                                                            onClick={() =>
                                                                setOpenWideConfirm(
                                                                    true
                                                                )
                                                            }
                                                            variant="contained"
                                                            size="small"
                                                            color="warning"
                                                            sx={{
                                                                height: "fit-content",
                                                            }}
                                                        >
                                                            WD
                                                        </MDButton>
                                                        <MDButton
                                                            onClick={() =>
                                                                setOpenNoBallForm(
                                                                    true
                                                                )
                                                            }
                                                            variant="contained"
                                                            size="small"
                                                            color="warning"
                                                            sx={{
                                                                height: "fit-content",
                                                            }}
                                                        >
                                                            NB
                                                        </MDButton>
                                                        <MDButton
                                                            onClick={() =>
                                                                handleScoreCardSubmit(
                                                                    statusType
                                                                )
                                                            }
                                                            variant="contained"
                                                            size="small"
                                                            color="success"
                                                            sx={{
                                                                height: "fit-content",
                                                            }}
                                                        >
                                                            Submit
                                                        </MDButton>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Card>
                                        {scoreboard?.balling[0].playerId && (
                                            <>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Card
                                                        sx={{
                                                            marginTop: "20px",
                                                            width: "60%",
                                                        }}
                                                    >
                                                        <MDTypography
                                                            sx={{
                                                                padding: "10px",
                                                                fontSize:
                                                                    "15px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                            variant="button"
                                                        >
                                                            {
                                                                scoreboard
                                                                    ?.battingTeamDetails
                                                                    ?.team_name
                                                            }{" "}
                                                            (
                                                            {matchScore?.team1
                                                                ?.teamId ===
                                                            scoreboard
                                                                ?.battingTeamDetails
                                                                ?._id
                                                                ? `${matchScore?.team1?.runs}`
                                                                : `${matchScore?.team2?.runs}`}
                                                            )
                                                        </MDTypography>
                                                        <DataTable
                                                            table={{
                                                                columns:
                                                                    batting_cols,
                                                                rows: batting_rows,
                                                            }}
                                                            isSorted={false}
                                                            entriesPerPage={
                                                                false
                                                            }
                                                            showTotalEntries={
                                                                false
                                                            }
                                                            noEndBorder
                                                        />
                                                    </Card>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Card
                                                        sx={{
                                                            marginTop: "20px",
                                                            width: "60%",
                                                        }}
                                                    >
                                                        <MDTypography
                                                            sx={{
                                                                padding: "10px",
                                                                fontSize:
                                                                    "15px",
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                            variant="button"
                                                        >
                                                            {
                                                                scoreboard
                                                                    ?.ballingTeamDetails
                                                                    ?.team_name
                                                            }
                                                        </MDTypography>
                                                        <DataTable
                                                            table={{
                                                                columns:
                                                                    balling_cols,
                                                                rows: balling_rows,
                                                            }}
                                                            isSorted={false}
                                                            entriesPerPage={
                                                                false
                                                            }
                                                            showTotalEntries={
                                                                false
                                                            }
                                                            noEndBorder
                                                        />
                                                    </Card>
                                                </Box>
                                            </>
                                        )}
                                    </MDBox>
                                )}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

            {/* Wide Dialog */}
            <Dialog
                open={openWideConfirm}
                onClose={() => {
                    setOpenWideConfirm(false);
                }}
            >
                <DialogTitle>Confirm Wide</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenWideConfirm(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleScoreCardSubmit("wide");
                            setOpenWideConfirm(false);
                        }}
                        color="primary"
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Wicket Dialog */}
            <Dialog
                fullWidth
                open={openWicketForm}
                onClose={() => {
                    setOpenWicketForm(false);
                    setSecondaryPlayerId("");
                    setStatusType("");
                }}
            >
                <DialogTitle>Confirm Wicket</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <label>Status</label>
                        <Select
                            value={statusType}
                            onChange={(e) => setStatusType(e.target.value)}
                            sx={{
                                height: "50px",
                            }}
                        >
                            <MenuItem value="catch">catch</MenuItem>
                            <MenuItem value="lbw">lbw</MenuItem>
                            <MenuItem value="bowled">bowled</MenuItem>
                            <MenuItem value="stumping">stumping</MenuItem>
                            <MenuItem value="runout">runout</MenuItem>
                            <MenuItem value="nbout">nbout</MenuItem>
                        </Select>
                    </FormControl>
                    {!["lbw", "bowled"].includes(statusType) && (
                        <FormControl fullWidth>
                            <label>Secondary Player</label>
                            <Select
                                value={secondaryPlayerId}
                                onChange={(e) =>
                                    setSecondaryPlayerId(e.target.value)
                                }
                                sx={{
                                    height: "50px",
                                }}
                            >
                                {bowlingTeamPlayers.map((player) => (
                                    <MenuItem
                                        key={player._id}
                                        value={player.player_id}
                                    >
                                        {player.player[0].player_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {["runout", "nbout"].includes(statusType) && (
                        <>
                            <FormControl
                                sx={{
                                    width: "50%",
                                    marginTop: "15px",
                                    marginRight: "15px",
                                }}
                            >
                                <InputLabel id="player1">Batsman 1</InputLabel>
                                <Select
                                    value={outBatsmanId}
                                    onChange={(e) =>
                                        setOutBatsmanId(e.target.value)
                                    }
                                    sx={{
                                        height: "50px",
                                    }}
                                    labelId="player1"
                                    label="Batsman 1"
                                >
                                    {battingTeamPlayers
                                        .filter((x) =>
                                            [batsmanId1, batsmanId2].includes(
                                                x.player_id
                                            )
                                        )
                                        .map((player) => (
                                            <MenuItem
                                                key={player._id}
                                                value={player.player_id}
                                            >
                                                {player.player[0].player_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <TextField
                                onInput={(e) =>
                                    (e.target.value = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    ))
                                }
                                value={runs}
                                onChange={(e) => setRuns(e.target.value)}
                                variant="outlined"
                                sx={{
                                    height: "50px",
                                    marginTop: "15px",
                                }}
                                label="Runs"
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenWicketForm(false);
                            setSecondaryPlayerId("");
                            setStatusType("");
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleScoreCardSubmit(statusType);
                            setOpenWicketForm(false);
                            setSecondaryPlayerId("");
                            setStatusType("");
                        }}
                        color="primary"
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            {/* No Ball Dialog */}
            <Dialog
                fullWidth
                open={openNoBallForm}
                onClose={() => {
                    setOpenNoBallForm(false);
                }}
            >
                <DialogTitle>Confirm No Ball</DialogTitle>
                <DialogContent>
                    <TextField
                        onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            ))
                        }
                        value={runs}
                        onChange={(e) => setRuns(e.target.value)}
                        variant="outlined"
                        sx={{
                            height: "50px",
                            marginTop: "15px",
                        }}
                        label="Runs"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenNoBallForm(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleScoreCardSubmit("nb");
                            setOpenNoBallForm(false);
                        }}
                        color="primary"
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Overthrow Dialog */}
            <Dialog
                fullWidth
                open={openOverThrow}
                onClose={() => {
                    setOpenOverThrow(false);
                    setOverthrowBoundary(0);
                }}
            >
                <DialogTitle>Overthrow</DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    <TextField
                        onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            ))
                        }
                        value={runs}
                        onChange={(e) => setRuns(e.target.value)}
                        variant="outlined"
                        sx={{
                            height: "50px",
                            marginTop: "15px",
                        }}
                        label="Runs"
                    />
                    <FormControl
                        sx={{
                            width: "50%",
                            marginTop: "15px",
                            marginRight: "15px",
                        }}
                    >
                        <InputLabel id="overthrow-run">
                            Overthrow Boundary
                        </InputLabel>
                        <Select
                            value={overthrowBoundary}
                            onChange={(e) =>
                                setOverthrowBoundary(e.target.value)
                            }
                            sx={{
                                height: "50px",
                            }}
                            labelId="overthrow-run"
                            label="Overthrow Boundary"
                        >
                            <MenuItem value={0} selected>
                                0
                            </MenuItem>
                            <MenuItem value={4} selected>
                                4
                            </MenuItem>
                            <MenuItem value={6} selected>
                                6
                            </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenOverThrow(false);
                            setOverthrowBoundary(0);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleScoreCardSubmit("overthrow");
                            setOpenOverThrow(false);
                        }}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            {/* New Inning Dialog */}
            <Dialog
                fullWidth
                open={openNewInning}
                onClose={() => {
                    setOpenNewInning(false);
                }}
            >
                <DialogTitle>New Inning</DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    <TextField
                        onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            ))
                        }
                        value={inning}
                        onChange={(e) => setInning(e.target.value)}
                        variant="outlined"
                        sx={{
                            height: "50px",
                            marginTop: "15px",
                        }}
                        label="Inning"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenNewInning(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleNewInning();
                            setOpenNewInning(false);
                        }}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
};

export default ScoreBoard;
