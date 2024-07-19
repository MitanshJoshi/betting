import {
    Card,
    Grid,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormControl,
    Select,
    MenuItem,
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

const AddPointSystem = () => {
    const navigate = useNavigate();

    const [selectedIds, setSelectedIds] = useState([]);

    const [matchType, setMatchType] = useState([]);
    const [pointTypes, setPointTypes] = useState([]);
    const [pointFor, setPointFor] = useState([]);

    const [matchTypeId, setMatchTypeId] = useState("");
    const [pointTypeId, setPointTypeId] = useState("");

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
            title="Successfully Added"
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
            title="Field Error"
            content={errorMessage}
            dateTime="1 sec ago"
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );

    const fetchMatchType = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/matchtype`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            console.log(responseData);
            setMatchType(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchPointType = async (id) => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/pointtype/display/${id}`,
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
                setPointFor(responseData.data[0].point_for);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.some((item) => item.id === id)
                ? prevSelectedIds.filter((item) => item.id !== id)
                : [...prevSelectedIds, { id, value: "" }]
        );
    };

    const handleInputChange = (id, value) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.map((item) =>
                item.id === id ? { ...item, value } : item
            )
        );
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        try {
            const requests = selectedIds.map((item) => {
                return fetch(`${BASE_URL}/api/pointsystem`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        matchType: matchTypeId,
                        pointType: pointTypeId,
                        pointFor: item.id,
                        points: item.value,
                    }),
                }).then((response) => response.json());
            });

            const responses = await Promise.all(requests);

            const allSuccessful = responses.every(
                (response) => response.success
            );

            if (allSuccessful) {
                openSuccessSB();
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            } else {
                const errorMessage =
                    responses.find((response) => !response.success).message ||
                    "Error";
                setErrorMessage(errorMessage);
                openErrorSB();
            }
        } catch (error) {
            console.error("Error adding point system", error);
            setErrorMessage("Error adding point system");
            openErrorSB();
        }
    };

    useEffect(() => {
        fetchMatchType();
    }, []);

    useEffect(() => {
        if (pointTypeId) {
            fetchPointType(pointTypeId);
        }
    }, [pointTypeId]);

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
                                    Add Match Type
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
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Match Type
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={matchTypeId}
                                                    onChange={(e) => {
                                                        setMatchTypeId(
                                                            e.target.value
                                                        );
                                                        const type =
                                                            matchType.filter(
                                                                (x) =>
                                                                    x._id ===
                                                                    e.target
                                                                        .value
                                                            );
                                                        console.log(type);
                                                        setPointTypes(
                                                            type[0].pointType
                                                        );
                                                        setSelectedIds([]);
                                                        setPointFor([]);
                                                    }}
                                                    // label="Select Team1"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        Select
                                                    </MenuItem>
                                                    {matchType &&
                                                        matchType.map((e) => (
                                                            <MenuItem
                                                                key={e._id}
                                                                value={e._id}
                                                            >
                                                                {e.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                Point Type
                                            </label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={pointTypeId}
                                                    onChange={(e) =>
                                                        setPointTypeId(
                                                            e.target.value
                                                        )
                                                    }
                                                    // label="Select Team1"
                                                    style={{
                                                        padding: "10px 0px",
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        Select
                                                    </MenuItem>
                                                    {pointTypes &&
                                                        pointTypes.map((e) => (
                                                            <MenuItem
                                                                key={e._id}
                                                                value={e._id}
                                                            >
                                                                {e.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                    </Grid>
                                </Grid>
                                <MDBox mx={2} mt={-3} py={2} px={2}>
                                    <FormGroup>
                                        {pointFor?.map((item) => (
                                            <MDBox
                                                key={item._id}
                                                display="flex"
                                                alignItems="center"
                                                sx={{ marginY: "10px" }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={selectedIds.some(
                                                                (selected) =>
                                                                    selected.id ===
                                                                    item._id
                                                            )}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    item._id
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label={item.point_for_name}
                                                />
                                                {selectedIds.some(
                                                    (selected) =>
                                                        selected.id === item._id
                                                ) && (
                                                    <MDInput
                                                        value={
                                                            selectedIds.find(
                                                                (selected) =>
                                                                    selected.id ===
                                                                    item._id
                                                            )?.value || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                item._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        label="Input"
                                                        variant="outlined"
                                                        style={{
                                                            marginLeft: "10px",
                                                            width: "100px",
                                                        }}
                                                    />
                                                )}
                                            </MDBox>
                                        ))}
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

export default AddPointSystem;
