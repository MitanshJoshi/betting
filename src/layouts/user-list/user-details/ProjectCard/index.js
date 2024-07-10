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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

function DefaultProjectCard({ label, title, captain, vice_captain, id }) {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
                overflow: "visible",
                padding: "10px",
            }}
        >
            <MDBox mt={1} mx={0.5} lineHeight={1}>
                <MDTypography
                    variant="body"
                    fontWeight="bold"
                    color="black"
                    textTransform="capitalize"
                    sx={{ display: "block" }}
                >
                    {title}
                </MDTypography>
                <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                >
                    {label}
                </MDTypography>
            </MDBox>
            <MDBox mt={1} mx={0.5}>
                <MDBox lineHeight={0}>
                    <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="text"
                    >
                        Captain - {captain}
                    </MDTypography>
                </MDBox>
                <MDBox mb={2} lineHeight={0}>
                    <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="text"
                    >
                        Vice-Captain - {vice_captain}
                    </MDTypography>
                </MDBox>
                <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <MDButton
                        component="a"
                        href={`/userlist/view-user/team-details/${id}`}
                        rel="noreferrer"
                        variant="outlined"
                        size="small"
                        color={"info"}
                    >
                        View Team
                    </MDButton>
                </MDBox>
            </MDBox>
        </Card>
    );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
    authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    action: PropTypes.shape({
        type: PropTypes.oneOf(["external", "internal"]),
        route: PropTypes.string.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "light",
            "dark",
            "white",
        ]).isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
