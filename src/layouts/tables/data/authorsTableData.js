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

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "company", accessor: "company", width: "18%", align: "left" },
      { Header: "gst", accessor: "gst", align: "left" },
      { Header: "address", accessor: "address", align: "left" },
      { Header: "contact person", accessor: "contact", align: "left" },
      { Header: "country", accessor: "country", align: "left" },
      { Header: "state", accessor: "state", align: "left" },
      { Header: "city", accessor: "city", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
      { Header: "view", accessor: "view", align: "center" },
    ],

    rows: [
      {
        company: <Author name="ITC " email="chemical@gmail.com" />,
        address: <Job title="22 cradle,edii,ahmedabad" description="364265" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="active" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        gst: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            29GGGGG1314R9Z6
          </MDTypography>
        ),
        contact: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            ashokbhai sindhav
          </MDTypography>
        ),
        country: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            india
          </MDTypography>
        ),
        state: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            gujrat
          </MDTypography>
        ),
        city: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            bhavnagar
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="/edit-company" variant="caption" color="text" fontWeight="medium">
            EDIT
          </MDTypography>
        ),
        view: (
          <MDTypography component="a" href="/company-full-detail" variant="caption" color="text" fontWeight="medium">
            VIEW
          </MDTypography>
        ),
      },
    ],
  };
}
