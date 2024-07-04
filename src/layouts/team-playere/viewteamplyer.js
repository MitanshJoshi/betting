import { Divider } from "@mui/material";
import { BASE_URL } from "BASE_URL";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Playerteamview() {
    const { _id } = useParams();
    const [display, setdisplay] = useState("");
    const [img1, setimg1] = useState("");
    const [img2, setimg2] = useState("");
    const [img3, setimg3] = useState("");
    const [img4, setimg4] = useState("");

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/teamPlayer/displayDetails?teamPlayerId=${_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            setdisplay(responseData.data[0]);
            setimg1(responseData?.data?.[0]?.team?.other_photo);
            setimg2(responseData?.data?.[0]?.player?.player_photo);
            setimg3(responseData?.data?.[0]?.captain?.player_photo);
            setimg4(responseData?.data?.[0]?.vice_captain?.player_photo);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <Card sx={{ maxWidth: 200 }}>
                <div className="d-flex justify-content-center align-item-center">
                    <div className="div1">
                        <CardMedia
                            component="img"
                            alt="no image"
                            height="200"
                            image={img1}
                            style={{ width: "200px" }}
                        />
                        <CardContent>
                            <ProfileInfoCard
                                title="Team Deatil"
                                info={{
                                    Teamname: display?.team?.team_name,
                                    short_name: display?.team?.short_name,
                                    status: display?.status,
                                }}
                                action={{ route: "", tooltip: "Edit Profile" }}
                                shadow={false}
                            />
                        </CardContent>
                    </div>
                    <div className="div2">
                        <CardMedia
                            component="img"
                            alt="no image"
                            height="200"
                            image={img2}
                            style={{ width: "220px" }}
                        />
                        <CardContent>
                            <ProfileInfoCard
                                title="Player detail"
                                info={{
                                    player_name: display?.player?.player_name,
                                    birth_date: display?.player?.birth_date,
                                    age: display?.player?.age,
                                    nationality: display?.player?.nationality,
                                    role: display?.player?.role,
                                    bowl_type: display?.player?.bowl_type,
                                    bat_type: display?.player?.bat_type,
                                }}
                                action={{ route: "", tooltip: "Edit Profile" }}
                                shadow={false}
                            />
                        </CardContent>
                    </div>
                    <div className="div3">
                        <CardMedia
                            component="img"
                            alt="no image"
                            height="200"
                            image={img3}
                            style={{ width: "220px" }}
                        />
                        <CardContent>
                            <ProfileInfoCard
                                title="captain"
                                info={{
                                    captainname: display?.captain?.player_name,
                                    birth_date: display?.captain?.birth_date,
                                    nationality: display?.captain?.nationality,
                                    age: display?.captain?.age,
                                    role: display?.captain?.role,
                                    bat_type: display?.captain?.bat_type,
                                    bowl_type: display?.captain?.bowl_type,
                                }}
                                action={{ route: "", tooltip: "Edit Profile" }}
                                shadow={false}
                            />
                        </CardContent>
                    </div>
                    <div className="div4">
                        <CardMedia
                            component="img"
                            alt="no image"
                            height="200"
                            image={img4}
                            style={{ width: "200px" }}
                        />
                        <CardContent>
                            <ProfileInfoCard
                                title="vice_captain"
                                info={{
                                    vice_captain:
                                        display?.vice_captain?.player_name,
                                    birth_date:
                                        display?.vice_captain?.birth_date,
                                    nationality:
                                        display?.vice_captain?.nationality,
                                    age: display?.vice_captain?.age,
                                    role: display?.vice_captain?.role,
                                    bat_type: display?.vice_captain?.bat_type,
                                    bowl_type: display?.vice_captain?.bowl_type,
                                }}
                                action={{ route: "", tooltip: "Edit Profile" }}
                                shadow={false}
                            />
                        </CardContent>
                    </div>
                </div>
            </Card>
        </DashboardLayout>
    );
}

export default Playerteamview;
