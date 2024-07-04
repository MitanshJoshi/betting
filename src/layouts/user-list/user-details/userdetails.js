import React, { useEffect, useState } from "react";
import { Divider, Grid, Snackbar } from "@mui/material";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Header from "./Header";
import ProfileInfoCard from "./ProfileInfoCard";
import Document from "./DocumentDetails/documentDetails";
import Transactions from "./Transactions/transactions";

import { BASE_URL } from "BASE_URL";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const [user, setuser] = useState({});
    const [img, setimg] = useState();
    const [img2, setimg2] = useState();
    const [id, setid] = useState("");
    const [adhaar_card_status, setadhar] = useState("");
    const [pan_card_status, setpan] = useState("");

    const [tabValue, setTabValue] = useState(0);

    const { _id } = useParams();

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/admin/findUser?userId=${_id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            setuser(responseData.data);
            console.log(responseData);
            if (responseData.data.document_details.length > 0) {
                setimg(responseData.data.document_details.adhaar_card_photo);
                setimg2(responseData.data.document_details.pan_card_photo);
                setid(responseData.data.document_details._id);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} />
            <Header
                status={user?.status || ""}
                profile_image={user.profile_photo || ""}
                tabValue={tabValue}
                setTabValue={setTabValue}
            >
                {tabValue === 0 && (
                    <MDBox mt={5} mb={3}>
                        <Grid container spacing={1}>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                xl={4}
                                sx={{ display: "flex" }}
                            >
                                <Divider
                                    orientation="vertical"
                                    sx={{ ml: -2, mr: 1 }}
                                />
                                <ProfileInfoCard
                                    title="User Information"
                                    info={{
                                        name: user.name || "",
                                        mobileNumber: user.mobile,
                                        email: user.email,
                                        gender: user.gender,
                                        DOB: user.dob,
                                        address: user.address,
                                        country: user.country,
                                        state: user.state,
                                        city: user.city,
                                        pincode: user.pincode,
                                    }}
                                    social={[]}
                                    isSocial={false}
                                    action={{
                                        route: "",
                                        tooltip: "Edit Profile",
                                    }}
                                    shadow={false}
                                />
                                <Divider
                                    orientation="vertical"
                                    sx={{ mx: 0 }}
                                />
                            </Grid>
                            {user.wallet_details[0] && (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    xl={4}
                                    sx={{ display: "flex" }}
                                >
                                    <Divider
                                        orientation="vertical"
                                        sx={{ ml: -2, mr: 1 }}
                                    />
                                    <ProfileInfoCard
                                        title="Wallet"
                                        info={{
                                            funds: user.wallet_details[0].funds,
                                            fundsUtilized:
                                                user.wallet_details[0]
                                                    .fundsUtilized,
                                        }}
                                        social={[]}
                                        isSocial={false}
                                        action={{
                                            route: "",
                                            tooltip: "Edit Profile",
                                        }}
                                        shadow={false}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </MDBox>
                )}

                {tabValue === 1 && (
                    <MDBox mt={5} mb={3}>
                        <Document />
                    </MDBox>
                )}

                {tabValue === 2 && user.wallet_details[0] && user.transactions && (
                    <MDBox mt={5} mb={3}>
                        <Transactions
                            funds={user?.wallet_details[0]?.funds || "0"}
                            fundsUtilized={
                                user?.wallet_details[0]?.fundsUtilized || "0"
                            }
                            transactions={user?.transactions}
                        />
                    </MDBox>
                )}
            </Header>
            <Footer />
        </DashboardLayout>
    );
};

export default UserDetails;
