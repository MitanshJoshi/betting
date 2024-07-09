import { Card, Grid, Typography } from "@mui/material";
import { BASE_URL } from "BASE_URL";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1} pr={2}>
        <MDAvatar src={image} name={name} size="sm" />
        <MDBox ml={1} lineHeight={0}>
            <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
            </MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
    </MDBox>
);

const UserTeamDetails = () => {
    const { _id } = useParams();

    const [teamDetails, setTeamDetails] = useState(null);

    const fetchTeamDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/myTeam/displayDetail?myTeamId=${_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            setTeamDetails(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchTeamDetails();
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
                            >
                                <MDTypography variant="h6" color="white">
                                    {teamDetails?.team1.short_name} vs{" "}
                                    {teamDetails?.team2.short_name}
                                </MDTypography>
                                {/* <MDTypography
                                    variant="button"
                                    sx={{ display: "block" }}
                                    color="white"
                                >
                                    {
                                        teamDetails.match_details.league_details
                                            .league_name
                                    }
                                </MDTypography> */}
                            </MDBox>
                            <MDBox py={2} px={3}>
                                <MDBox sx={{ display: "flex", gap: "25px" }}>
                                    <MDBox mb={2}>
                                        <MDTypography
                                            variant="h6"
                                            color="black"
                                        >
                                            Captain
                                        </MDTypography>
                                        <div
                                            style={{
                                                padding: "8px",
                                                border: "1.5px solid #DCDCDC",
                                                borderRadius: "25px",
                                                backgroundColor: "#F9F9F9",
                                                height: "fit-cotent",
                                                width: "fit-content",
                                            }}
                                        >
                                            <Author
                                                name={
                                                    teamDetails?.captain
                                                        .player_name
                                                }
                                                image={"./virat.webp"}
                                                email={
                                                    teamDetails?.captain.role
                                                }
                                            />
                                        </div>
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDTypography
                                            variant="h6"
                                            color="black"
                                        >
                                            Vice Captain
                                        </MDTypography>
                                        <div
                                            style={{
                                                padding: "8px",
                                                border: "1.5px solid #DCDCDC",
                                                borderRadius: "25px",
                                                backgroundColor: "#F9F9F9",
                                                height: "fit-cotent",
                                                width: "fit-content",
                                            }}
                                        >
                                            <Author
                                                name={
                                                    teamDetails?.vicecaptain
                                                        .player_name
                                                }
                                                image={"./virat.webp"}
                                                email={
                                                    teamDetails?.vicecaptain
                                                        .role
                                                }
                                            />
                                        </div>
                                    </MDBox>
                                </MDBox>

                                <div>
                                    <MDTypography variant="h6" color="black">
                                        Team Players
                                    </MDTypography>
                                </div>
                                <MDBox
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                    }}
                                >
                                    {teamDetails?.players
                                        .filter(
                                            (x) =>
                                                ![
                                                    teamDetails?.captain._id,
                                                    teamDetails?.vicecaptain
                                                        ._id,
                                                ].includes(x._id)
                                        )
                                        .map((item) => (
                                            <div
                                                key={item._id}
                                                style={{
                                                    padding: "8px",
                                                    border: "1.5px solid #DCDCDC",
                                                    borderRadius: "25px",
                                                    backgroundColor: "#F9F9F9",
                                                    height: "fit-cotent",
                                                }}
                                            >
                                                <Author
                                                    name={item.player_name}
                                                    image={"./virat.webp"}
                                                    email={item.role}
                                                />
                                            </div>
                                        ))}
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default UserTeamDetails;
