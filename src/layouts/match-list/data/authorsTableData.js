import React, { useState, useEffect } from "react";
import { BASE_URL } from "BASE_URL";
import MDTypography from "components/MDTypography";

export default function Data(
    team1,
    team2,
    vanue,
    country,
    state,
    city,
    leagueId
) {
    const [team, setTeam] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/match/displayList?leagueId=${leagueId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            setTeam(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        if (leagueId) {
            fetchData();
        }
    }, [leagueId]);

    return {
        columns: [
            { Header: "league Name", accessor: "league_name", align: "left" },
            { Header: "Team1", accessor: "Team1", align: "left" },
            { Header: "Team2", accessor: "Team2", align: "left" },
            { Header: "Date", accessor: "Date", align: "left" },
            { Header: "Time", accessor: "Time", align: "left" },
            { Header: "vanue", accessor: "vanue", align: "left" },
            { Header: "City", accessor: "City", align: "left" },
            { Header: "State", accessor: "State", align: "left" },
            { Header: "country", accessor: "country", align: "left" },
            { Header: "edit", accessor: "action", align: "center" },
            { Header: "view", accessor: "view", width: "10%", align: "center" },
        ],

        rows: team
            ?.filter(
                (item) =>
                    item?.team_1_details[0]?.team_name
                        .toLowerCase()
                        ?.includes(team1?.toLowerCase()) &&
                    item?.team_2_details[0]?.team_name
                        .toLowerCase()
                        ?.includes(team2?.toLowerCase()) &&
                    item?.vanue.toLowerCase()?.includes(vanue?.toLowerCase()) &&
                    item?.country
                        .toLowerCase()
                        ?.includes(country?.toLowerCase()) &&
                    item?.state.toLowerCase()?.includes(state?.toLowerCase()) &&
                    item?.city.toLowerCase()?.includes(city?.toLowerCase())
            )
            .map((e) => ({
                league_name: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.league_details[0]?.league_name}
                    </MDTypography>
                ),
                country: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.country}
                    </MDTypography>
                ),
                State: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.state}
                    </MDTypography>
                ),
                Team1: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.team_1_details[0]?.team_name}
                    </MDTypography>
                ),
                Team2: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.team_2_details[0]?.team_name}
                    </MDTypography>
                ),
                Date: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.date}
                    </MDTypography>
                ),
                Time: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.time}
                    </MDTypography>
                ),
                vanue: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.vanue}
                    </MDTypography>
                ),
                City: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.city}
                    </MDTypography>
                ),
                view: (
                    <MDTypography
                        component="a"
                        href={`/view-match/${e._id}`}
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        View
                    </MDTypography>
                ),
                action: (
                    <MDTypography
                        component="a"
                        href={`/edit-match/${e._id}`}
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        Edit
                    </MDTypography>
                ),
            })),
    };
}
