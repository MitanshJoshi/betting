import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Audio } from "react-loader-spinner";
import MDAvatar from "components/MDAvatar";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useParams } from "react-router-dom";
import { BASE_URL } from "BASE_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import profilesListData from "layouts/profile/data/profilesListData";
import { Email } from "@material-ui/icons";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Modal } from "@mui/material";

const Viewuser = () => {
    const [errorMessage, setErrorMessage] = useState("");
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
            content="Admin Is Successfully Updated."
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
    const [user, setuser] = useState({});
    const [img, setimg] = useState();
    const [img2, setimg2] = useState();
    const [id, setid] = useState("");
    const [adhaar_card_status, setadhar] = useState("");
    const [pan_card_status, setpan] = useState("");
    // console.log(user);

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
            console.log(responseData)
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

    const handlesubmit = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/document/updateStatus?documentId=${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        adhaar_card_status,
                        pan_card_status,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Chat inquiry failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedImage("");
    };

    const handleCloseOnOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseModal();
        }
    };
    const [selectedOption, setSelectedOption] = useState("all");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        // Add any additional logic you need when the selection changes
    };

    const tableContainerStyle = {
        width: "400px",
        height: "400px",
        overflow: "auto",
        border: "1px solid #ddd", // Optional: for better visibility of the boundary
        margin: "auto", // Center the table
        padding: "20px", // Add some padding for better appearance
        backgroundColor: "#f8f9fa", // Light background for a subtle look
    };
    const filteredPayments =
        user && user.wallet_details
            ? user.wallet_details.filter((payment) => {
                  if (selectedOption === "all") {
                      return true;
                  }
                  return payment.payment_type === selectedOption;
              })
            : [];
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
                                style={{ position: "relative" }}
                            >
                                <MDTypography variant="h6" color="white">
                                    User Profile
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
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
                                                sx={{ ml: -1, mr: 1 }}
                                            />
                                            <ProfileInfoCard
                                                title="User information"
                                                info={{
                                                    Name: user?.name || "",
                                                    mobile: user?.mobile || "",
                                                    Email: user?.email || "",
                                                    gender: user?.gender || "",
                                                    DOB: user?.dob || "",
                                                    address:
                                                        user?.address || "",
                                                    country:
                                                        user?.country || "",
                                                    state: user?.state || "",
                                                    city: user?.city || "",
                                                    pincode:
                                                        user?.pincode || "",
                                                    status: user?.status || "",
                                                }}
                                                action={{
                                                    route: "",
                                                    tooltip: "Edit Profile",
                                                }}
                                                shadow={false}
                                            />
                                        </Grid>
                                        <MDBox style={tableContainerStyle}>
                                            <h6>Wallet Details</h6>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <div>
                                                    {/* Empty div to balance the flex layout */}
                                                </div>
                                                <div
                                                    style={{
                                                        marginLeft: "auto",
                                                    }}
                                                >
                                                    <select
                                                        value={selectedOption}
                                                        onChange={
                                                            handleSelectChange
                                                        }
                                                        style={{
                                                            padding: "5px",
                                                            borderRadius: "5px",
                                                            border: "1px solid #ccc",
                                                            backgroundColor:
                                                                "#fff",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        <option value="all">
                                                            All
                                                        </option>
                                                        <option value="add_wallet">
                                                            Add Wallet
                                                        </option>
                                                        <option value="redeem">
                                                            Redeem
                                                        </option>
                                                        {/* add more options as needed */}
                                                    </select>
                                                </div>
                                            </div>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Amount</th>
                                                        <th
                                                            style={{
                                                                paddingRight:
                                                                    "20px",
                                                                paddingLeft:
                                                                    "20px",
                                                            }}
                                                        >
                                                            Payment Method
                                                        </th>
                                                        <th>Payment Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredPayments.map(
                                                        (payment) => (
                                                            <tr
                                                                key={payment.id}
                                                            >
                                                                <td>
                                                                    {
                                                                        payment.amount
                                                                    }
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        paddingRight:
                                                                            "20px",
                                                                        paddingLeft:
                                                                            "20px",
                                                                    }}
                                                                >
                                                                    {
                                                                        payment.payment_mode
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        payment.payment_type
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </Table>
                                        </MDBox>
                                    </Grid>
                                </MDBox>
                            </MDBox>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                xl={4}
                                sx={{ display: "flex " }}
                            >
                                <Divider
                                    orientation="vertical"
                                    sx={{ ml: 5, mt: -1 }}
                                />
                                <div className="document d-flex justify-content-center align-item-center gap-5">
                                    <div
                                        className="card-container d-flex gap-5"
                                        style={{
                                            marginTop: "20px",
                                            maxWidth: 1000,
                                        }}
                                    >
                                        <div className="adhar">
                                            <Card sx={{ maxWidth: 500 }}>
                                                <CardActionArea
                                                    onClick={() =>
                                                        handleImageClick(
                                                            "/adhaar.jpg"
                                                        )
                                                    }
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        height="100"
                                                        image="/adhaar.jpg"
                                                        alt="Aadhar Card"
                                                    />
                                                    <CardContent>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h5"
                                                            component="div"
                                                        >
                                                            Aadhar Detail
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Aadhar Card Number:
                                                            <br />
                                                            7276 9602 1205{" "}
                                                            <br />
                                                            Status: Approve
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                        <div
                                            className="pan"
                                            style={{ marginTop: "20px" }}
                                        >
                                            <Card sx={{ maxWidth: 500 }}>
                                                <CardActionArea
                                                    onClick={() =>
                                                        handleImageClick(
                                                            "/pan.webp"
                                                        )
                                                    }
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        height="100"
                                                        image="/pan.webp"
                                                        alt="Pan Card"
                                                    />
                                                    <CardContent>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h5"
                                                            component="div"
                                                        >
                                                            Pan Detail
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Pan Card Number:
                                                            <br />
                                                            7276 9602 1205{" "}
                                                            <br />
                                                            Status: Approve
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    </div>
                                    <Modal
                                        open={modalOpen}
                                        onClose={handleCloseModal}
                                        aria-labelledby="image-modal"
                                        aria-describedby="full-size-image"
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100vh",
                                            }}
                                            onClick={handleCloseOnOverlayClick}
                                        >
                                            <img
                                                src={selectedImage}
                                                alt="Full size"
                                                style={{
                                                    maxWidth: "600px",
                                                    maxHeight: "600px",
                                                    width: "auto",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                    </Modal>
                                </div>

                                <Divider
                                    orientation="vertical"
                                    sx={{ ml: 15, mt: -1 }}
                                />
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default Viewuser;
