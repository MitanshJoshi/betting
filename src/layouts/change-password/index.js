
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MDSnackbar from "components/MDSnackbar";
import { useParams } from 'react-router-dom';
import { IconButton, InputAdornment } from "@mui/material";
import { BASE_URL } from "BASE_URL";
// import
const Changepassword = () => {

    const [errorMessage, setErrorMessage] = useState("")

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });



    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

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
            content="Password Changed Successfully."
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


    // Separate state variables for each password field
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };

    // Separate functions to toggle the visibility of each password field
    const handleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async () => {
        const { oldPassword, newPassword, confirmPassword } = passwords;

        if (!oldPassword && !newPassword && !confirmPassword) {
            setErrorMessage("Please Fill All Fields!")
            openErrorSB();
            return;
        }

        if (!oldPassword) {
            setErrorMessage("Please Enter Old Password!")
            openErrorSB();
            return;
        }

        if (!newPassword) {
            setErrorMessage("Please Enter New Password!")
            openErrorSB();
            return;
        }

        if (!confirmPassword) {
            setErrorMessage("Please Confirm Your Password!")
            openErrorSB();
            return;
        }

        if (newPassword != confirmPassword) {
            setErrorMessage("Please New Password And Cofirm Password Not Matched!")
            openErrorSB();
            return;
        }
        const token = `Bearer ${localStorage.getItem("chemToken")}`;
        const username = localStorage.getItem("userName")
        const response = await fetch(`${BASE_URL}/api/superadmin/changePassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                username: username,
                password: oldPassword,
                newPassword: newPassword
            }),
        });


        openSuccessSB();
        setTimeout(() => {
            navigate("/dashboard")
        }, 2000);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" style={{ position: "relative" }}>
                                <MDTypography variant="h6" color="white">
                                    Change Status Of Admin
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type={showOldPassword ? "text" : "password"}
                                                label="Old Password"
                                                name="oldPassword"
                                                fullWidth
                                                value={passwords.oldPassword}
                                                onChange={handlePasswordChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleShowOldPassword}>
                                                                {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type={showNewPassword ? "text" : "password"}
                                                label="New Password"
                                                name="newPassword"
                                                fullWidth
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleShowNewPassword}>
                                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type={showConfirmPassword ? "text" : "password"}
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                fullWidth
                                                value={passwords.confirmPassword}
                                                onChange={handlePasswordChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleShowConfirmPassword}>
                                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mt={4} mb={1}>
                                            <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={handleSubmit}>
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
        </DashboardLayout>
    );
};

export default Changepassword;