
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
// import
const EditCompanyStatus = () => {

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const navigate = useNavigate();
    const { _id } = useParams();
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Added"
            content="Status Updated Successfully."
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
            content="Please Select Status"
            dateTime="1 sec ago"
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );

    const [status, setStatus] = useState("")

    const handleChange = (e) => {
        setStatus(e.target.value);
    }

    const handleSubmit = () => {
        if (!status) {
            openErrorSB();
            return;
        }


        openSuccessSB();
        setTimeout(() => {
            navigate(-1)
        }, 2000);
    }


    const cname = "chemBizz pvt"
    const mail = "chembizz@gmail.com"
    const gst = "29GGGGG1314R9Z6"
    const address = "22 cradle,edii,ahmedabad"
    const pincode = "364265"
    const person = "ashokbhai sindhav"
    const country = "india"
    const state = "gujrat"
    const city = "ahmedabad"

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
                                    Change Status Of Company
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type="text"
                                                label="Company Name"
                                                name="category"
                                                value={cname}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type="text"
                                                label="Email"
                                                name="category"
                                                value={mail}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type="text"
                                                label="GST Number"
                                                name="category"
                                                value={gst}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type="text"
                                                label="Address "
                                                name="category"
                                                value={address}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type="text"
                                                label="Contact Person"
                                                name="category"
                                                value={person}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <MDInput
                                                type="text"
                                                label="Country "
                                                name="category"
                                                value={country}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2} style={{ position: 'relative' }}>
                                            <MDInput
                                                type="text"
                                                label="State"
                                                name="category"
                                                value={state}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2} style={{ position: 'relative' }}>
                                            <MDInput
                                                type="text"
                                                label="City"
                                                name="category"
                                                value={city}
                                                disable
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={4}>
                                            <Grid item xl={2}>
                                                <div className="d-flex align-items-center" style={{ gap: "15px" }}>
                                                    <h6 className="mb-0">STATUS</h6>
                                                    <select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="City"
                                                        style={{ color: "#7b809a", background: "transparent", border: "1px solid #dadbda", height: "44px", padding: "0px 15px", borderRadius: "5px", fontSize: "14px" }}
                                                        fullWidth
                                                        value={status}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" >SELECT</option>
                                                        <option value="active" >ACTIVE</option>
                                                        <option value="inactive" >INACTIVE</option>
                                                    </select>
                                                </div>
                                            </Grid>
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

export default EditCompanyStatus;