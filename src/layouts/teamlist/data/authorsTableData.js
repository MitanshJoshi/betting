/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import chemical from "assets/images/f1.svg";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "BASE_URL";

export default function AuthorsTableData(teamnaem,shortname) {
  
  const [Team, setTeam] = useState([])
  const filterData = () => {
    return Team.filter((item) => {
     
      return (
        item.team_name.toLowerCase().includes(teamnaem) &&
        item.short_name.toLowerCase().includes(shortname) 
      );
    });
  };
  const filteredData = filterData();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await fetch(`${BASE_URL}/api/team/displayList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setTeam(responseData.data);
      console.log(responseData.data)
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return {
    columns: [
      { Header: "other_photo", accessor: "other_photo", align: "left" },
      { Header: "logo", accessor: "logo", align: "left" },
      { Header: "team_name", accessor: "team_name", align: "left" },
      { Header: "short_name", accessor: "short_name", align: "left" },

      { Header: "edit", accessor: "action", align: "center" },
      { Header: "view", accessor: "view", align: "center" },
    ],


    rows: filteredData && filteredData.map((e) => ({
      other_photo: (
        <img src={e.other_photo} alt={e.other_photo} style={{width:"50px", height:"50px",borderRadius:"50%"}} /> // Adjust this line to use the appropriate image source and alt text
      ),
      logo: (
        <img src={e.logo} alt={e.logo} style={{width:"50px", height:"50px",borderRadius:"50%"}} /> // Adjust this line to use the appropriate image source and alt text
      ),
      team_name: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.team_name}
        </MDTypography>
      ),
      short_name: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.short_name}
        </MDTypography>
      ),

     
      view: (
        <MDTypography component="a" href={`/view-teamlist/${e._id}`} variant="caption" color="text" fontWeight="medium">
          view
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href={`/edit-teamlist/${e._id}`} variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    }))

  };
}
