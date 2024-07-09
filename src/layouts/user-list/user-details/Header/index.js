/* eslint-disable react/prop-types */
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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDButton from "components/MDButton";
import tab from "assets/theme/components/tabs/tab";

function Header({
    children,
    status,
    profile_image,
    tabValue,
    setTabValue,
    name,
}) {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        // A function that sets the orientation state of the tabs.
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.sm
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }

        /**
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
        window.addEventListener("resize", handleTabsOrientation);

        // Call the handleTabsOrientation function to set the state with the initial value.
        handleTabsOrientation();

        // Remove event listener on cleanup
        return () =>
            window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);

    const handleSetTabValue = (event, newValue) => setTabValue(newValue);

    return (
        <MDBox position="relative" mb={5}>
            <MDBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="18.75rem"
                borderRadius="xl"
                sx={{
                    backgroundImage: ({
                        functions: { rgba, linearGradient },
                        palette: { gradients },
                    }) =>
                        `${linearGradient(
                            rgba(gradients.info.main, 0.6),
                            rgba(gradients.info.state, 0.6)
                        )}, url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    overflow: "hidden",
                }}
            />
            <Card
                sx={{
                    position: "relative",
                    mt: -8,
                    mx: 3,
                    py: 2,
                    px: 2,
                }}
            >
                <Grid container spacing={3}>
                    <Grid item>
                        <MDAvatar
                            src={profile_image}
                            alt="profile-image"
                            size="xl"
                            shadow="sm"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MDBox
                            height="100%"
                            mt={0.5}
                            lineHeight={1}
                            // sx={{
                            //     display: "flex",
                            //     alignItems: "center",
                            //     gap: "30px",
                            // }}
                        >
                            <MDBox>
                                <MDTypography variant="h5" fontWeight="medium">
                                    {name}
                                </MDTypography>
                            </MDBox>
                            <MDBox
                                sx={{
                                    backgroundColor: "green",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingLeft: "15px",
                                    paddingRight: "15px",
                                    paddingVertical: "5px",
                                    borderRadius: "10px",
                                    width:"fit-content"
                                }}
                            >
                                <MDTypography
                                    variant="button"
                                    color="white"
                                    fontWeight="medium"
                                >
                                    {status.toUpperCase() || ""}
                                </MDTypography>
                            </MDBox>
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <AppBar position="static">
                            <Tabs
                                orientation={tabsOrientation}
                                selectionFollowsFocus={true}
                                value={tabValue}
                                onChange={handleSetTabValue}
                                indicatorColor="primary"
                            >
                                <Tab
                                    label="Profile"
                                    icon={
                                        <Icon
                                            fontSize="small"
                                            sx={{ mt: -0.25 }}
                                        >
                                            person
                                        </Icon>
                                    }
                                />
                                <Tab
                                    label="Documents"
                                    icon={
                                        <Icon
                                            fontSize="small"
                                            sx={{ mt: -0.25 }}
                                        >
                                            article
                                        </Icon>
                                    }
                                />
                                )
                                <Tab
                                    label="Transactions"
                                    icon={
                                        <Icon
                                            fontSize="small"
                                            sx={{ mt: -0.25 }}
                                        >
                                            wallet
                                        </Icon>
                                    }
                                />
                                <Tab
                                    label="Teams"
                                    icon={
                                        <Icon
                                            fontSize="small"
                                            sx={{ mt: -0.25 }}
                                        >
                                            people
                                        </Icon>
                                    }
                                />
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
                {children}
            </Card>
        </MDBox>
    );
}

export default Header;
