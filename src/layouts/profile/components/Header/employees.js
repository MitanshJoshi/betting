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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Addcertificate from "layouts/certificates/add-certificate";

function Employees() {
  return (

    <MDBox mt={5} mb={3}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
          <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
          <ProfileInfoCard
            title="profile information"
            info={{
              fullName: "Alec M. Thompson",
              mobile: "+91 99999 99999",
              GST: "NM8723UJ8099GSTIN",
              address: "22,cradle,edii,ahmedabad",
              country: "India",
              state: "Gujrat",
              city: "Bhavnagar",
              status: "ACTIVE"
            }}
           
            action={{ route: "", tooltip: "Edit Profile" }}
            shadow={false}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
          <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
          <ProfileInfoCard
            title="Other Information"
            info={{
              website: "www.webearl.com",
              mobile: "+91 99999 99999",
              email: "webearl@gmail.com"
            }}
            social={[
              {
                link: "https://www.facebook.com/CreativeTim/",
                icon: <FacebookIcon />,
                color: "facebook",
              },
              {
                link: "https://twitter.com/creativetim",
                icon: <TwitterIcon />,
                color: "twitter",
              },
              {
                link: "https://www.instagram.com/creativetimofficial/",
                icon: <InstagramIcon />,
                color: "instagram",
              },
            ]}
            action={{ route: "", tooltip: "Edit Profile" }}
            shadow={false}
          />
          <Divider orientation="vertical" sx={{ mx: 0 }} />
        </Grid>
        <Grid item xs={12} xl={4}>
          <ProfilesList title="Documents" profiles={profilesListData} shadow={false} />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Employees;