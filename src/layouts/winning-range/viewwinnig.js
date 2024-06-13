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

function Viewwinning() {
  const { _id } = useParams();
  const [display, seydisplay] = useState("");
  console.log(display);
  const [img, setimg] = useState("");
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await fetch(`${BASE_URL}/api/contestDetails/displayDetails?contestDetailsId=${_id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      seydisplay(responseData.data);
      setimg(responseData.data.player_photo)
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
        <div className="d-flex ">
          <div className="content">
            <CardContent>
              <ProfileInfoCard
                title={"Team1-Detail"}
                info={{
                  "team-name": display?.team1Data?.[0]?.team_name,
                  short_name: display?.team1Data?.[0]?.short_name,
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <ProfileInfoCard
                title={"Team2-Detail"}
                info={{
                  "team-name": display?.team2Data?.[0]?.team_name,
                  short_name: display?.team2Data?.[0]?.short_name,
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </CardContent>
          </div>
          <div className="contest">
            <CardContent>
              <ProfileInfoCard
                title={"Contest Detail"}
                info={{
                  "Contest-type": display?.contestTypeData?.[0]?.contest_type,
                  date_time: display?.date_time?.slice(0, 10),
                  entry_fees: display?.entry_fees,
                  max_team_per_user: display?.max_team_per_user,
                  price_pool: display?.price_pool,
                  total_participant: display?.total_participant,
                  "league Name": display?.leagueData?.[0]?.leagua_name,
                  profit: display?.profit,
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

export default Viewwinning;
