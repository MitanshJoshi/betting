import {
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import DefaultProjectCard from "../ProjectCard";
import { BASE_URL } from "BASE_URL";

const UserTeams = ({ my_teams }) => {
    console.log(my_teams);

    const [league_id, setleague_id] = useState("");
    const [matchId, setMatchId] = useState("");
    const [matches, setMatches] = useState([]);
    const [League, setleague] = useState([]);

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
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchMatches = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/match/displayListByLeague?leagueId=${league_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log("matches", responseData);
            setMatches(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchleague();
    }, []);

    useEffect(() => {
        if (league_id) {
            fetchMatches();
        }
    }, [league_id]);

    return (
        <MDBox pt={2} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <MDBox mb={3} sx={{ display: "flex", gap: "15px" }}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">
                                League Name
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e) => setleague_id(e.target.value)}
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
                        {league_id && (
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">
                                    Match Name
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(e) => setMatchId(e.target.value)}
                                    value={matchId}
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
                                    {matches &&
                                        matches.map((e) => (
                                            <MenuItem value={e._id}>
                                                {e.match_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        )}
                    </MDBox>
                    <MDBox
                        px={2}
                        sx={{ display: "flex", gap: "25px", flexWrap: "wrap" }}
                    >
                        {my_teams
                            .filter(
                                (x) =>
                                    x.match_details.league_id.includes(
                                        league_id
                                    ) && x.match_details._id.includes(matchId)
                            )
                            .map((item) => (
                                <DefaultProjectCard
                                    key={item._id}
                                    title={item.match_details.match_name}
                                    label={
                                        item.match_details.league_details
                                            .league_name
                                    }
                                    id={item._id}
                                    captain={item.captain[0].player_name}
                                    vice_captain={
                                        item.vicecaptain[0].player_name
                                    }
                                />
                            ))}
                    </MDBox>
                </Grid>
            </Grid>
        </MDBox>
    );
};

export default UserTeams;
