import { CardContent, CardMedia, Divider } from "@mui/material";
import { BASE_URL } from "BASE_URL";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import { useParams } from "react-router-dom";

function Viewteamlist() {
  const { _id } = useParams();
  const [display, seydisplay] = useState("");
  const [img, setimg] = useState("");
  const [img2, setimg2] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch(
        `${BASE_URL}/api/team/displayDetails?teamId=${_id}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = await response.json();
      seydisplay(responseData.data);
      setimg(responseData.data.logo);
      setimg2(responseData.data.other_photo);
      console.log(responseData.data);
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
      <Container>
        <Card sx={{ maxWidth: 200 }}>
          <div className="d-flex ">
            <div className="img">
              {/* <h6 className="mb-2">{display.team_name}</h6> */}
              <label htmlFor="">Team Logo</label>
              <CardMedia
                component="img"
                alt="Loading"
                height="100"
                width="100"
                image={img}
                style={{ width: "100px",height:"100px", borderRadius:"50%" }}
              />
              <label htmlFor="">Team Image</label>
              <CardMedia
                component="img"
                alt="Loading"
                height="100"
                width="100"
                image={img2}
                style={{ width: "100px",height:"100px", borderRadius:"50%" }}
              />
            </div>
            <div className="content">
              <CardContent>
                <ProfileInfoCard
                  info={{
                    Teamname: display.team_name,
                    ShortName: display.short_name,
                    Captain: display.captain,
                    ViceCaptain: display.vice_captain,
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              </CardContent>
            </div>
          </div>
        </Card>
      </Container>
    </DashboardLayout>
  );
}

export default Viewteamlist;
