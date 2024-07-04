import { Divider } from '@mui/material'
import { BASE_URL } from 'BASE_URL'   
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Grid } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Playerview() {
    const {_id}=useParams()
    const [display,seydisplay]=useState("")
    const [img,setimg]=useState("")
    

    const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log(token)
          const response = await fetch(`${BASE_URL}/api/player/displayDetails?playerId=${_id}`, {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });
          const responseData = await response.json();
          console.log(responseData)
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
        <div className="img">
          <h6 className='mb-2'>{display.player_name}</h6>
      <CardMedia
        
        component="img"
        alt="Loading"
        height="300"
        width="100"
        image={img}
        style={{width:"200px"}}
      />
      </div>
      <div className="content">
      <CardContent>
        <ProfileInfoCard       
                        info={{
                          Nationality: display.nationality,
                          birth_date: display.birth_date,
                          Battingtype:display.bat_type,
                          Bowlingtype:display.bowl_type,
                          Role: display.role,
                          Age:display.age,
                         
                        }}
                        action={{ route: "", tooltip: "Edit Profile" }}
                        shadow={false}
                      />
      </CardContent>
      </div>
      </div>
    </Card>
  </DashboardLayout>
  )
}

export default Playerview
