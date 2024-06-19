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
import { useEffect, useState } from "react";
import { Axios } from "axios";
import { BASE_URL } from "BASE_URL";
import MDButton from "components/MDButton";

export default function AuthorsTableData({ handleDelete, Display,teamname,short,captain,visecaptain,player}) {

 
  const handleDeleteCall = (id) => {
    handleDelete(id)
    // Call your function with the object id
    console.log("Deleting object with id:", id);
   
  };

  return {
    columns: [
      {
        Header: "Player Name",
        accessor: "player_name",
        width: "18%",
        align: "left",
      },
      {
        Header: "Team Name",
        accessor: "team_name",
        width: "18%",
        align: "left",
      },
      // { Header: "team_name", accessor: "team_name", width: "18%", align: "left" },
      // { Header: "other_photo", accessor: "other_photo", width: "18%", align: "left" },
      // {
      //   Header: "shortname",
      //   accessor: "shortname",
      //   width: "18%",
      //   align: "left",
      // },
      // { Header: "playername", accessor: "playername", align: "left" },
      // { Header: "captain_photo", accessor: "captain_photo", align: "left" },
      { Header: "Captain Name", accessor: "captain_name", align: "left" },
      // { Header: "vice_photo", accessor: "vice_photo", align: "left" },
      { Header: "Vice Captian", accessor: "vice_captian", align: "left" },
      // { Header: "player_name", accessor: "player_name", align: "left" },
      // { Header: "player_photo", accessor: "player_photo", width: "18%", align: "left" },
    
      // { Header: "role", accessor: "role", width: "10%", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "view", accessor: "view", align: "center" },
      { Header: "edit", accessor: "action", align: "center" },
      { Header: "delete", accessor: "delete", align: "center" },
    ],

    rows: Display
    .filter(
      (item) =>
        item?.team?.[0]?.team_name.toLowerCase()?.includes(teamname.toLowerCase()) &&
        item?.team?.[0]?.short_name.toLowerCase()?.includes(short.toLowerCase()) &&
        item?.player?.[0]?.player_name.toLowerCase()?.includes(player.toLowerCase()) 
        // (leaguename === "" || item.leagueData?.[0]?.league_name.toLowerCase() === leaguename.toLowerCase())
    ).map((e) => ({
        team_name: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <div style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
            <img
              src={e?.team?.[0]?.logo}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginTop: "10px",
              }}
              
            />{" "}
            </div>
            <br/>
            
            ({e?.team?.[0]?.short_name}) {e?.team?.[0]?.team_name}
          </MDTypography>
        ),

        shortname: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            
          </MDTypography>
        ),
        captain_name: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
             <img
              src={e?.captain?.[0]?.player_photo}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginTop: "10px",
              }}
            />{" "}
            <br/>
            {e.captain?.[0]?.player_name}
          </MDTypography>
        ),
        vice_captian: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
             <img
              src={e?.vice_captain?.[0]?.player_photo}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginTop: "10px",
              }}
            />{" "}
            <br/>
            {e?.vice_captain?.[0]?.player_name}
          </MDTypography>
        ),
        player_name: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <img
              src={e?.player?.[0]?.player_photo}
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <br/>
            {e.player?.[0]?.player_name}
          </MDTypography>
        ),

        status: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {e.status}
          </MDTypography>
        ),
        view: (
          <MDTypography
            component="a"
            href={`/playerteamview/${e._id}`}
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            view
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href={`/edit-teamplayer/${e?.team?.[0]._id}`}
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
        delete: (
          <MDButton
            variant="gradient"
            color="error"
            fullWidth
            type="button"
            onClick={() => handleDeleteCall(e?.player?.[0]._id)}
          >
            DELETE
          </MDButton>
        ),
      })),
  };
}
