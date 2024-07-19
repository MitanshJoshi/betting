import {
    Card,
    Grid,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { BASE_URL } from "BASE_URL";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPointType = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [pointTypeName, setPointTypeName] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    const [takenPointFor, setTakenPointFor] = useState([]);

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Added"
            content="Successfully Added"
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

    const fetchPointsFor = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/pointfor`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            console.log(responseData);
            setData(responseData.point_for);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchPointsType = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/pointtype/displayAll`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.success) {
                const array = responseData.data;
                let finalData = [];
                array.forEach((x) => {
                    finalData = finalData.concat(...x.point_for);
                });
                setTakenPointFor(finalData);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((item) => item !== id)
                : [...prevSelectedIds, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pointTypeName) {
            setErrorMessage("Please Fill Point Type Name");
            openErrorSB();
            return;
        }

        if (selectedIds.length === 0) {
            setErrorMessage("Please select at least one Point For");
            openErrorSB();
            return;
        }

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/pointtype/insertpointType`,
                {
                    method: "POST",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        point_type_name: pointTypeName,
                        point_for: selectedIds,
                    }),
                }
            );
            const responseData = await response.json();
            if (responseData.success) {
                openSuccessSB();
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            } else {
                setErrorMessage(responseData.message);
                openErrorSB();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPointsFor();
        fetchPointsType();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={3} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={2}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <MDTypography variant="h6" color="white">
                                    Add Point Type
                                </MDTypography>
                            </MDBox>
                            <MDBox mx={2} mt={-3} py={2} px={2}>
                                <Grid container pt={2} pb={3} px={3}>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "20px",
                                        }}
                                    >
                                        <MDBox mb={2} sx={{ minWidth: "50%" }}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Point Type Name
                                            </label>
                                            <MDInput
                                                value={pointTypeName}
                                                type="text"
                                                onChange={(e) =>
                                                    setPointTypeName(
                                                        e.target.value
                                                    )
                                                }
                                                fullWidth
                                            />
                                        </MDBox>
                                    </Grid>
                                </Grid>
                                <MDBox mx={2} mt={-3} py={2} px={2}>
                                    <FormGroup>
                                        <Grid container spacing={2}>
                                            {data.map((item) => (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={3}
                                                    key={item._id}
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={selectedIds.includes(
                                                                    item._id
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        item._id
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            item.point_for_name
                                                        }
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </FormGroup>
                                </MDBox>
                                <MDBox mt={2} sx={{ minWidth: "30%" }}>
                                    <MDButton
                                        onClick={handleSubmit}
                                        variant="gradient"
                                        color="info"
                                        type="submit"
                                    >
                                        Submit
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            {renderSuccessSB}
            {renderErrorSB}
        </DashboardLayout>
    );
};

export default AddPointType;
