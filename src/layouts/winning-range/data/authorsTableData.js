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
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { Axios } from "axios";
import { BASE_URL } from "BASE_URL";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import chemical from "assets/images/f1.svg";

export default function AuthorsTableData({ handleDelete, Display }) {
    const handleDeleteCall = (id) => {
        handleDelete(id);
        console.log("Deleting object with id:", id);
    };

    return {
        columns: [
            {
                Header: "Leagues Details",
                accessor: "leagues_details",
                width: "18%",
                align: "left",
            },
            {
                Header: "Match Name",
                accessor: "match_details",
                width: "18%",
                align: "left",
            },
            {
                Header: "Contest Name",
                accessor: "contesttype",
                width: "18%",
                align: "left",
            },
            {
                Header: "Rank",
                accessor: "rank",
                width: "18%",
                align: "left",
            },
            {
                Header: "Winning Price",
                accessor: "winningprice",
                width: "18%",
                align: "left",
            },
            { Header: "View", accessor: "view", align: "center" },
            { Header: "Edit", accessor: "action", align: "center" },
            { Header: "Delete", accessor: "delete", align: "center" },
        ],

        rows:
            Display &&
            Display.map((e) => ({
                rank: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {/* {`${e.rankes[0].range[0]} - ${
                            e.rankes[e.rankes.length - 1].range[0]
                        }`} */}
                        {
                          e.rankes.map(rank=>(
                            `${rank.range[0]} - ${rank.range[rank.range.length-1]}`
                          )).join(" , ")
                        }
                    </MDTypography>
                ),
                winningprice: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.rankes.map((rank) => rank.price).join(", ")}
                    </MDTypography>
                ),
                leagues_details: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.leagues_details?.[0]?.league_name || "N/A"}
                    </MDTypography>
                ),
                match_details: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.match_details?.[0]?.match_name || "N/A"}
                    </MDTypography>
                ),
                contesttype: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {e.contest_types_details?.[0]?.contest_type || "N/A"}
                    </MDTypography>
                ),
                action: (
                    <MDTypography
                        component="a"
                        href={`/edit-winningprice/${e._id}`}
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        Edit
                    </MDTypography>
                ),
                view: (
                    <MDTypography
                        component="a"
                        href={`/view-contest/${e.contest_id}`}
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        View
                    </MDTypography>
                ),
                delete: (
                    <MDButton
                        variant="gradient"
                        color="error"
                        fullWidth
                        type="button"
                        onClick={() => handleDeleteCall(e._id)}
                    >
                        DELETE
                    </MDButton>
                ),
            })),
    };
}
