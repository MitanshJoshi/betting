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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ComplexStatisticsCard({title, totalPaticipants,entryfess,totalAmount,profit,afterprofit}) {
  console.log(totalPaticipants);
  return (
    <Card>
      <MDBox display="flex" justifyContent="center" pt={1} px={2}>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="bold" color="black">
            {title.toUpperCase()}
          </MDTypography>
          {/* <MDTypography variant="h4">{count}</MDTypography> */}
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        {totalPaticipants && (
        <MDBox display="flex" justifyContent="start" alignItems="center" pt={1} px={2}>
          <MDTypography
            component="p"
            variant="button"
            color="text"
            display="flex"
            fontWeight="bold"
            fontSize="12px"
            mb={0}
          >
            TOTAL PARTICIPANTS :
          </MDTypography>
          <MDTypography variant="button" fontWeight="bold" color="black">
            &nbsp; {totalPaticipants}
          </MDTypography>
        </MDBox>
        )}
        {entryfess && (
              <MDBox display="flex" justifyContent="start" alignItems="center" pt={1} px={2}>
              <MDTypography
                component="p"
                variant="button"
                color="text"
                display="flex"
                fontWeight="bold"
                fontSize="12px"
                mb={0}
              >
                ENTRY FEES :
              </MDTypography>
              <MDTypography variant="button" fontWeight="bold" color="black">
                &nbsp; {entryfess}
              </MDTypography>
            </MDBox>
        )}
       {totalAmount &&(
              <MDBox display="flex" justifyContent="start" alignItems="center" pt={1} px={2}>
              <MDTypography
                component="p"
                variant="button"
                color="text"
                display="flex"
                fontWeight="bold"
                fontSize="12px"
                mb={0}
              >
                TOTAL AMOUNT :
              </MDTypography>
              <MDTypography variant="button" fontWeight="bold" color="black">
                &nbsp; {totalAmount}
              </MDTypography>
            </MDBox>
       )}
       {profit &&(
              <MDBox display="flex" justifyContent="start" alignItems="center" pt={1} px={2}>
              <MDTypography
                component="p"
                variant="button"
                color="text"
                display="flex"
                fontWeight="bold"
                fontSize="12px"
                mb={0}
              >
                PROFIT :
              </MDTypography>
              <MDTypography variant="button" fontWeight="bold" color="black">
                &nbsp; {profit}
              </MDTypography>
            </MDBox>
       )}
       {afterprofit &&(
              <MDBox display="flex" justifyContent="start" alignItems="center" pt={1} px={2}>
              <MDTypography
                component="p"
                variant="button"
                color="text"
                display="flex"
                fontWeight="bold"
                fontSize="12px"
                mb={0}
              >
               AFTER AMOUNT PROFIT :
              </MDTypography>
              <MDTypography variant="button" fontWeight="bold" color="black">
                &nbsp; {afterprofit}
              </MDTypography>
            </MDBox>
       )}
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
