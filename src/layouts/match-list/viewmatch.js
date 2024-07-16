import { CardContent, Divider } from "@mui/material";
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

function Viewmatch() {
  const { _id } = useParams();
  const [match, setmatch] = useState([]);
  
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
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
      console.log(responseData.data);
      setmatch(responseData.data[0]);
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
      <div className="d-flex">
        <div className="teamname">
          <CardContent>
            <div className="mb-4">
              <ProfileInfoCard
                title={"Team1-Detail"}
                info={{
                  "team-name": match?.team_1_details?.[0]?.team_name,
                  short_name: match?.team_1_details?.[0]?.short_name,
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </div>
            <div>
              <ProfileInfoCard
                title={"Team2-Detail"}
                info={{
                  "team-name": match?.team_2_details?.[0]?.team_name,
                  short_name: match?.team_2_details?.[0]?.short_name,
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </div>
          </CardContent>
        </div>
        <div className="league">
          <CardContent>
            <ProfileInfoCard
              title={"League-Detail"}
              info={{
                league_name: match?.league_details?.[0]?.league_name,
                start_date: match?.league_details?.[0]?.start_date,
                end_date: match?.league_details?.[0]?.end_date,
                match_name: match?.match_name,
                country: match?.country,
                state: match?.state,
                city: match?.city,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
          </CardContent>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Viewmatch;
