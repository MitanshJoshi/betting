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
import { useParams } from "react-router-dom";
import { BASE_URL } from "BASE_URL";
import countries from "../../CountryStateCity.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import { Paper } from "@mui/material";
// import
const Editplayerlist = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const navigate = useNavigate();
    const [imgPreview, setImgPreview] = useState(null);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Updated"
            content="Player Is Successfully Updated."
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

    const [player_name, setname] = useState("");
    const [img, setimg] = useState("");
    const [age, setage] = useState("");
    const [nationality, setnationality] = useState("");
    // const [dob,setdob]=useState("")
    const [birth_date, setdate] = useState("");
    const [role, setrole] = useState("");
    const [bat_type, setbat] = useState("");
    const [bowl_type, setball] = useState("");

    const handleimg = (e) => {
        const file = e.target.files[0];

        if (!file || file.type !== "image/png") {
            setErrorMessage("Please select a PNG image file.");
            openErrorSB();
            return;
        }

        setimg(file);
        setImgPreview(URL.createObjectURL(file));
    };

    const { _id } = useParams();

    const handleSubmit = async () => {
        if (
            !player_name &&
            !img &&
            !age &&
            !nationality &&
            !birth_date &&
            !role &&
            !bat_type &&
            !bowl_type
        ) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }
        if (!player_name) {
            setErrorMessage("Please Select Plyare Name!");
            openErrorSB();
            return;
        }
        if (!img) {
            setErrorMessage("Please Enter Player-image!");
            openErrorSB();
            return;
        }
        if (!age) {
            setErrorMessage("Please Enter Player-Age!");
            openErrorSB();
            return;
        }
        if (!nationality) {
            setErrorMessage("Please Enter Player-Nationality!");
            openErrorSB();
            return;
        }
        if (!birth_date) {
            setErrorMessage("Please Enter Player Dob!");
            openErrorSB();
            return;
        }
        if (!role) {
            setErrorMessage("Please Enter Player-Role!");
            openErrorSB();
            return;
        }
        if (!bat_type) {
            setErrorMessage("Please Enter Player Bat-Type!");
            openErrorSB();
            return;
        }
        if (!bowl_type) {
            setErrorMessage("Please Enter Player Bow-Type!");
            openErrorSB();
            return;
        }
        const formData = new FormData();
        formData.append("player_name", player_name);
        formData.append("player_photo", img);
        formData.append("age", age);
        formData.append("nationality", nationality);
        formData.append("birth_date", birth_date);
        formData.append("role", role);
        formData.append("bat_type", bat_type);
        formData.append("bowl_type", bowl_type);
        // formData.append("productprice", productprice);

        try {
            const response = await fetch(
                `${BASE_URL}/api/player/update?playerId=${_id}`,
                {
                    method: "PUT",
                    headers: {
                        //   "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Team Add  faild`");
            }
            console.log(response);
            openSuccessSB();
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } catch (error) {}
    };
    // const [player, setplayer] = useState([])
    // const [matchedStartup,setMacheStartup]=useState('')
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/player/detailsList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            // setplayer(responseData.data);
            console.log(responseData.data);
            const matchedStartup = responseData.data.find(
                (item) => item._id === _id
            );
            console.log(matchedStartup);
            // setMacheStartup(matchedStartup)
            if (matchedStartup) {
                setname(matchedStartup.player_name);
                setage(matchedStartup.age);
                setnationality(matchedStartup.nationality);
                setdate(matchedStartup.birth_date);
                setrole(matchedStartup.role);
                setball(matchedStartup.bowl_type);
                setbat(matchedStartup.bat_type);
                setimg(matchedStartup.player_photo);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    function handleDateChange(selectedDate) {
        // Check if the selected date is not in the future
        if (new Date(selectedDate) > new Date()) {
            setErrorMessage("Please select a date that is not in the future.");
            openErrorSB();
            return;
        }

        // Check if the selected date is within 60 years ago
        if (
            new Date().getFullYear() - new Date(selectedDate).getFullYear() >
            60
        ) {
            setErrorMessage("Please select a date within the last 60 years.");
            openErrorSB();
            return;
        }

        // If the date is valid, set it to state or do whatever you need
        setage(moment().diff(selectedDate, "year"));
        setdate(selectedDate);
    }

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function getMinDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear() - 60; // 60 years ago
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

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
                                    Edit Player
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Player Name
                                            </label>
                                            <MDInput
                                                type="text"
                                                // label="Player name"

                                                // name="category"
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^a-z A-Z]/g,
                                                            ""
                                                        ); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (
                                                        value.length > 0 &&
                                                        value[0] === " "
                                                    ) {
                                                        // If the first digit is zero, remove it
                                                        value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                }}
                                                value={player_name}
                                                onChange={(e) =>
                                                    setname(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Player Image
                                            </label>
                                            <Paper
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "start",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <MDInput
                                                    type="file"
                                                    label=""
                                                    name="category"
                                                    // value={img}
                                                    onChange={handleimg}
                                                />
                                                {imgPreview && (
                                                    <MDBox>
                                                        <img
                                                            src={imgPreview}
                                                            alt="Player Preview"
                                                            style={{
                                                                width: "300px",
                                                                height: "auto",
                                                            }}
                                                        />
                                                    </MDBox>
                                                )}
                                            </Paper>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Player Age</label>
                                            <MDInput
                                                type="number"
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^0-9]/g,
                                                            ""
                                                        ); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (
                                                        value.length > 0 &&
                                                        value[0] === " "
                                                    ) {
                                                        // If the first digit is zero, remove it
                                                        value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                }}
                                                name="category"
                                                value={age}
                                                onChange={(e) =>
                                                    setage(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={0} mt={0}>
                                            <label htmlFor="">
                                                Player nationality
                                            </label>
                                            <MDInput
                                                type="text"
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^ a-z A-Z]/g,
                                                            ""
                                                        ); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (
                                                        value.length > 0 &&
                                                        value[0] === " "
                                                    ) {
                                                        // If the first digit is zero, remove it
                                                        value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                }}
                                                name="nationality"
                                                value={nationality}
                                                onChange={(e) =>
                                                    setnationality(
                                                        e.target.value
                                                    )
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Player Dob</label>
                                            <MDInput
                                                type="date"
                                                label=""
                                                name="category"
                                                value={birth_date}
                                                max={getCurrentDate()}
                                                min={getMinDate()}
                                                onChange={(e) =>
                                                    handleDateChange(
                                                        e.target.value
                                                    )
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Player Role
                                            </label>
                                            <FormControl fullWidth>
                                                <InputLabel
                                                    style={{
                                                        paddingBottom: "10px",
                                                    }}
                                                    id="demo-simple-select-label"
                                                ></InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={role}
                                                    onChange={(e) =>
                                                        setrole(e.target.value)
                                                    }
                                                    // label="Search Bat-type"
                                                    style={{ height: "43px" }}
                                                >
                                                    <MenuItem value="">
                                                        Select Role
                                                    </MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="Wicket Keeper"
                                                    >
                                                        Wicket Keeper
                                                    </MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="Batsman"
                                                    >
                                                        Batsman
                                                    </MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="All Rounder"
                                                    >
                                                        All Rounder
                                                    </MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="Bowler"
                                                    >
                                                        Bowler
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        {/* <MDBox mb={2}>
                                            <label htmlFor="">
                                                Player Bat-Type
                                            </label>
                                            <MDInput
                                                type="text"
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^ a-z A-Z]/g,
                                                            ""
                                                        ); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (
                                                        value.length > 0 &&
                                                        value[0] === " "
                                                    ) {
                                                        // If the first digit is zero, remove it
                                                        value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                }}
                                                name="bat_type"
                                                value={bat_type}
                                                onChange={(e) =>
                                                    setbat(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Player Bow-Type
                                            </label>
                                            <MDInput
                                                type="text"
                                                onInput={(e) => {
                                                    let value =
                                                        e.target.value.replace(
                                                            /[^a-z A-Z]/g,
                                                            ""
                                                        ); // Remove non-numeric characters
                                                    // Check if the first digit is zero
                                                    if (
                                                        value.length > 0 &&
                                                        value[0] === " "
                                                    ) {
                                                        // If the first digit is zero, remove it
                                                        value = value.slice(1);
                                                    }
                                                    // Set the updated value
                                                    e.target.value = value;
                                                }}
                                                name="bowl_type"
                                                value={bowl_type}
                                                onChange={(e) =>
                                                    setball(e.target.value)
                                                }
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
                                        </MDBox> */}
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Player Bat-Type
                                            </label>
                                            <FormControl fullWidth>
                                                <InputLabel
                                                    style={{
                                                        paddingBottom: "10px",
                                                    }}
                                                    id="demo-simple-select-label"
                                                ></InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setbat(e.target.value)
                                                    }
                                                    value={bat_type}
                                                    // label="Search Bat-type"
                                                    style={{ height: "43px" }}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="Right hand"
                                                    >
                                                        Right hand
                                                    </MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="Left hand"
                                                    >
                                                        Left hand
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label htmlFor="">
                                                Player Bow-Type
                                            </label>

                                            <FormControl fullWidth>
                                                <InputLabel
                                                    style={{
                                                        paddingBottom: "10px",
                                                    }}
                                                    id="demo-simple-select-label"
                                                ></InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) =>
                                                        setball(e.target.value)
                                                    }
                                                    value={bowl_type}
                                                    // label="Search Bow-type"
                                                    style={{ height: "43px" }}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="Right hand"
                                                    >
                                                        Right hand
                                                    </MenuItem>
                                                    <MenuItem
                                                        width="150px"
                                                        value="Left hand"
                                                    >
                                                        Left hand
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
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

export default Editplayerlist;
