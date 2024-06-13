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
      { accessor: "name", align: "left" },
      { accessor: "structure", align: "left" },
      { accessor: "cas", align: "left" },
      { accessor: "subcat", align: "left" },
      { accessor: "hsn", align: "left" },
      { accessor: "appearance", align: "left" },
      { accessor: "stored", align: "left" },

      // { accessor: "address", align: "left" },
      // { accessor: "contact", align: "left" },
      // { Header: "country", accessor: "country", align: "left" },
      // { Header: "state", accessor: "state", align: "left" },
      // { Header: "city", accessor: "city", align: "left" },
      // { accessor: "status", align: "center" },
      // { accessor: "action", align: "center" },
      // { accessor: "view", align: "center" },
    ],

    rows: [
      {
        name: (
          <>
            <MDBox display="flex" flexDirection="column" mb={1} >
            <MDTypography variant="h6" color="text">
                DFTA
              </MDTypography>
              
              <MDTypography variant="h6" fontSize="12px" color="text">
                (C10H7F2N3O)
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                CAS
              </MDTypography>
              <MDTypography variant="h6" color="text">
                86404-63-9
              </MDTypography>
            </MDBox>
          </>
        ),
        structure: (
          <>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                SELLER COMPANY NAME
              </MDTypography>
              <MDTypography variant="h6" color="text">
                Webearl Technologies
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                BUYER COMPANY NAME
              </MDTypography>
              <MDTypography variant="h6" color="text">
                Infotech Technologies
              </MDTypography>
            </MDBox>
          </>
        ),
        cas: (
          <>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                MOL WEIGHT
              </MDTypography>
              <MDTypography variant="h6" color="text">
                106.8
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                INQ QUANTITY
              </MDTypography>
              <MDTypography variant="h6" color="text">
                10kg
              </MDTypography>
            </MDBox>
          </>
        ),
        weight: (
          <>


          </>
        ),
        hsn: (
          <>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                HSN CODE
              </MDTypography>
              <MDTypography variant="h6" color="text">
                106238923
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                PRICE
              </MDTypography>
              <MDTypography variant="h6" color="text">
                800 - 850 rs
              </MDTypography>
            </MDBox>
          </>
        ),
        uses: (
          <>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                USES
              </MDTypography>
              <MDTypography variant="h6" color="text">
                Fluconazol
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                USES
              </MDTypography>
              <MDTypography variant="h6" color="text">
                Fluconazol
              </MDTypography>
            </MDBox>
          </>
        ),
        appearance: (
          <>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                APPEARANCE
              </MDTypography>
              <MDTypography variant="h6" color="text">
                White to off white powder 6t6gtg ygub uubuhb uibui
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                STORAGE
              </MDTypography>
              <MDTypography variant="h6" color="text">
                In Room Temperature ggbu8 hhin unjmi uijiji iujiji
              </MDTypography>
            </MDBox>
          </>
        ),
        subcat: (
          <>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                SUB CATEGORY
              </MDTypography>
              <MDTypography variant="h6" color="text">
                Intermidiate Chemical
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={1} >
              <MDTypography variant="p" fontSize="10px" color="text">
                INQUIRY DATE
              </MDTypography>
              <MDTypography variant="h6" color="text">
                10-12-2024
              </MDTypography>
            </MDBox>
          </>
        ),


        // status: (
        //   <MDBox display="flex" gap="5px" alignItems="center" mb={1} >
        //     <MDTypography variant="p" fontSize="14px" color="text">
        //       Mol Weight:
        //     </MDTypography>
        //     <MDTypography variant="h6" color="text">
        //       106.78
        //     </MDTypography>
        //   </MDBox>
        // ),
        // gst: (
        //   <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        //     29GGGGG1314R9Z6
        //   </MDTypography>
        // ),
        // contact: (
        //   <MDBox display="flex" gap="5px" alignItems="center" mb={1} >
        //     <MDTypography variant="p" fontSize="14px" color="text">
        //       Mol Weight:
        //     </MDTypography>
        //     <MDTypography variant="h6" color="text">
        //       106.78
        //     </MDTypography>
        //   </MDBox>
        // ),
        // country: (
        //   <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        //     india
        //   </MDTypography>
        // ),
        // state: (
        //   <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        //     gujrat
        //   </MDTypography>
        // ),
        // city: (
        //   <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        //     bhavnagar
        //   </MDTypography>
        // ),
        // action: (
        //   <MDTypography component="a" href="/edit-company" variant="caption" color="text" fontWeight="medium">
        //     EDIT
        //   </MDTypography>
        // ),
        // view: (
        //   <MDTypography component="a" href="/company-full-detail" variant="caption" color="text" fontWeight="medium">
        //     VIEW
        //   </MDTypography>
        // ),
      },
    ],
  };
}
