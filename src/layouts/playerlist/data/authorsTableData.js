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
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import chemical from "assets/images/f1.svg";
import MDButton from "components/MDButton";
import { BASE_URL } from "BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AuthorsTableData(Plyername,Role,Nationality,bat,ball) {


  const [player, setplayer] = useState([])
  console.log(player)
  const filterData = () => {
    return player.filter((item) => {
      return (
        (item.player_name && item.player_name.toLowerCase().includes(Plyername.toLowerCase())) &&
        (item.role && item.role.toLowerCase().includes(Role.toLowerCase())) &&
        (item.nationality && item.nationality.toLowerCase().includes(Nationality.toLowerCase())) &&
        (item.bat_type && item.bat_type.toLowerCase().includes(bat.toLowerCase())) &&
        (item.bowl_type && item.bowl_type.toLowerCase().includes(ball.toLowerCase()))
      );
    });
  };
  const filteredData = filterData();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await fetch(`${BASE_URL}/api/player/detailsList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setplayer(responseData.data);
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
      { Header: "Player Name", accessor: "player_name", align: "left" },
      { Header: "Nationality", accessor: "nationality", align: "left" },
      { Header: "Birth Date", accessor: "birth_date", align: "left" },
      { Header: "Age", accessor: "age", align: "left" },
      { Header: "Role", accessor: "role", align: "left" },
      { Header: "Bat Type", accessor: "bat_type", align: "left" },
      { Header: "Bowl Type", accessor: "bowl_type", align: "left" },
      { Header: "Edit", accessor: "action", align: "center" },
      // { Header: "delete", accessor: "status", align: "center" },
      { Header: "View", accessor: "view", align: "center" },
    ],


    rows: filteredData && filteredData.map((e) => ({
      player_name: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.player_name}
        </MDTypography>
      ),
      nationality: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.nationality}
        </MDTypography>
      ),
      birth_date: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.birth_date}
        </MDTypography>
      ),
      age: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.age}
        </MDTypography>
      ),
      role: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.role}
        </MDTypography>
      ),
      bat_type: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.bat_type}
        </MDTypography>
      ),
      bowl_type: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.bowl_type}
        </MDTypography>
      ),
      view: (
        <MDTypography component="a" href={`/Player-view/${e._id}`} variant="caption" color="text" fontWeight="medium">
          view
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href={`/edit-playerlist/${e._id}`} variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    }))
  };
}
