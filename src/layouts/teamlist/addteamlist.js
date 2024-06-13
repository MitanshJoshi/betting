
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Audio } from "react-loader-spinner";
import MDAvatar from "components/MDAvatar";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useParams } from 'react-router-dom';
import { BASE_URL } from "BASE_URL";
// import
const Addteamlist = () => {
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const navigate = useNavigate();
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Added"
            content="Team Is Successfully Added."
            dateTime="1 sec"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
        />
    );
 
    const renderErrorSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Filled Error"
            content={errorMessage}
            dateTime="1 sec ago"
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );

    const [logo, setlogo] = useState(null)
    // const [other_photo, setother_photo] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [short_name, setshort_name] = useState("")
    const [team_name, setteam_name] = useState("")
    
    
    const handlelogo=(e)=>{
        const file = e.target.files[0];
        setlogo(file);
    }
   
    const handleimg = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
      };
    
    const handleSubmit = async () => {
       
        if (!logo && !selectedFile && short_name && team_name ) {
            setErrorMessage("Please Fill All Fields!")
            openErrorSB();
            return
        }
        if (!logo) {
            setErrorMessage("Please Select select-logo!")
            openErrorSB();
            return
        }
        if (!selectedFile) {
            setErrorMessage("Please Select select-image!")
            openErrorSB();
            return
        }
         if (!team_name) {
            setErrorMessage("Please Enter team_name!")
            openErrorSB();
            return
        }
        if (!short_name) {
            setErrorMessage("Please Enter short_name!")
            openErrorSB();
            return
        }
      
        
        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("other_photo", selectedFile);
        formData.append("short_name", short_name);
        
        formData.append("team_name", team_name);
        // formData.append("productprice", productprice);
      
        try {
          const response = await fetch(`${BASE_URL}/api/team/createTeam`, {
            method: "POST",
            headers: {
            //   "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
              "Access-Control-Allow-Origin": "*",
            },
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error("Team Add  faild`");
          }
          console.log(response)
          openSuccessSB();
          setTimeout(() => {
            navigate(-1);
            
           
          }, 1000);
        } catch (error) {
          
        }
      };
    

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                                style={{
                                    position: "relative",
                                }}
                            >
                                <MDTypography variant="h6" color="white">
                                    Add Team
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Team Logo</label>
                                            <MDInput
                                                type="file"
                                                label=""
                                                name="category"
                                                // value={logo}
                                                onChange={handlelogo}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Team Other-Photo</label>
                                            <MDInput
                                                type="file"
                                                label=""
                                                name="category"
                                                // value={selectedFile}
                                                onChange={handleimg}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                        <label htmlFor="">Team Name</label>
                                            <MDInput
                                                type="text"
                                                // label="Team-name"
                                                onInput={(e) => {
                                                    let value = e.target.value.replace(/[^ a-z A-Z]/g, ''); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (value.length > 0 && value[0] === ' ') {
                                                      // If the first digit is zero, remove it
                                                      value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                  }}
                                                name="category"
                                                value={team_name}
                                                onChange={(e)=>setteam_name(e.target.value)}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                        <label htmlFor="">Team Short-Name</label>
                                            <MDInput
                                                type="text"
                                                // label="short_nam"
                                                name="category"
                                                value={short_name}
                                                onInput={(e) => {
                                                    let value = e.target.value.replace(/[^A-Z]/g, ''); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (value.length > 0 && value[0] === ' ') {
                                                      // If the first digit is zero, remove it
                                                      value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                  }}
                                                onChange={(e)=>setshort_name(e.target.value)}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mt={4} mb={1}>
                                            <MDButton
                                                variant="gradient"
                                                color="info"
                                                fullWidth
                                                type="submit"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </MDButton>
                                            {renderSuccessSB}
                                            {renderErrorSB}
                                        </MDBox>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
};

export default Addteamlist;