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
import MDButton from "components/MDButton";
import { BASE_URL } from "BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AuthorsTableData(league,start,end) {

  const [League, setleague] = useState([])
  console.log(League)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await fetch(`${BASE_URL}/api/league/displayList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setleague(responseData.data);
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
      { Header: "league_name", accessor: "league_name", align: "left" },
      { Header: "start_date", accessor: "start_date", align: "left" },
      { Header: "end_date", accessor: "end_date", align: "left" },
      { Header: "edit", accessor: "action", align: "center" },
      // { Header: "delete", accessor: "status", align: "center" },
    ],


    rows:League
    .filter(
      (item) =>
        item?.league_name.toLowerCase().includes(league.toLowerCase()) && 
        item?.start_date.toLowerCase().includes(start.toLowerCase()) && 
        item?.end_date.toLowerCase().includes(end.toLowerCase())  
        // (leaguename === "" || item.leagueData?.[0]?.league_name.toLowerCase() === leaguename.toLowerCase())
    ).map((e) => ({
      league_name: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e?.league_name}
        </MDTypography>
      ),
      end_date: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.end_date}
        </MDTypography>
      ),
      start_date: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {e.start_date}
        </MDTypography>
      ),
      // status: (
      //   <MDButton
      //     variant="gradient"
      //     color="error"
      //     fullWidth
      //     type="submit"
      //     onClick={() => handleDelete(category._id)}
      //   >
      //     DELETE
      //   </MDButton>
      // ),
      action: (
        <MDTypography component="a" href={`/edit-league/${e._id}`} variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    }))

  };
}
