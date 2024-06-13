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
import { Margin, Padding } from "@mui/icons-material";

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
        Header: "winning",
        accessor: "winning",
        width: "18%",
        align: "left",
      },
      {
        Header: "winning_price",
        accessor: "winning_price",
        width: "18%",
        align: "left",
      },
      {
        Header: "winning_price_range",
        accessor: "winning_price_range",
        width: "18%",
        align: "left",
      },
      {
        Header: "contest_name",
        accessor: "contest_name",
        width: "18%",
        align: "left",
      },
      
      // { Header: "view", accessor: "view", align: "center" },
      { Header: "edit", accessor: "action", align: "center" },
      { Header: "delete", accessor: "delete", align: "center" },
    ],

    rows:Display&&Display.map((e) => ({

        winning: (
          <MDBox>
            <select name="" id="" style={{height:"30px"}}>
          {e?.range_price.map((price, index) => (
            
             <option value="">{price.range_no}</option> 
            
          ))}
          </select>
        </MDBox> 
        ),
        winning_price: (
          <MDBox>
            <select name="" id="" style={{height:"30px"}}>
          {e?.range_price.map((price, index) => (
          <option value="">{price.price}</option>    
          ))}
          </select>
        </MDBox>
          ),
          winning_price_range: (
            <MDBox>
              <input type="text" 
              style={{width:"50px",marginRight:"5px",height:"39px", borderRadius:"10px"}}/>
              <MDButton
            variant="gradient"
            color="success"
            fullWidth
            type="button"
            style={{width:"20px", }}
          >
            Update
          </MDButton>
           </MDBox>
            ),
          contest_name: (
            <MDTypography
              component="a"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {e?.contest_type?.[0].contest_type}
            </MDTypography>
          ),
        action: (
          <MDTypography
            component="a"
            href={`/edit-winningrange/${e._id}`}
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
