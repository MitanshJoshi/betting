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

export default function AuthorsTableData({ handleDelete, Display,contest}) {

  
  const handleDeleteCall = (id) => {
    handleDelete(id)
    // Call your function with the object id
    console.log("Deleting object with id:", id);
   
  };
  console.log(Display)
  return {
    columns: [
      {
        Header: "contest_type",
        accessor: "contest_type",
        width: "18%",
        align: "left",
      },
      // { Header: "view", accessor: "view", align: "center" },
      { Header: "edit", accessor: "action", align: "center" },
      { Header: "delete", accessor: "delete", align: "center" },
    ],

    rows:Display
    .filter(
      (item) =>
        item?.contest_type.toLowerCase().includes(contest.toLowerCase())  
        // (leaguename === "" || item.leagueData?.[0]?.league_name.toLowerCase() === leaguename.toLowerCase())
    ).map((e) => ({

        contest_type: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {e?.contest_type}
          </MDTypography>
        ),

        action: (
          <MDTypography
            component="a"
            href={`/edit-contecttype/${e._id}`}
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
            onClick={() => handleDeleteCall(e?._id)}
          >
            DELETE
          </MDButton>
        ),
      })),
  };
}
