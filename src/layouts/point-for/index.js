import { Card, Dialog, DialogActions, DialogTitle, Grid } from "@mui/material";
import { BASE_URL } from "BASE_URL";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox lineHeight={0}>
            <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
            </MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
    </MDBox>
);

const PointFor = () => {
    const [value, setValue] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");

    const [data, setData] = useState([]);

    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Added"
            content={successMessage}
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

    const cols = [
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "created", accessor: "created", align: "right" },
        { Header: "updated", accessor: "updated", align: "right" },
        { Header: "delete", accessor: "delete", align: "right" },
        { Header: "edit", accessor: "edit", align: "right" },
    ];

    const rows = data?.map((item) => ({
        name: <Author name={item?.point_for_name} />,
        created: (
            <MDTypography
                component="a"
                variant="caption"
                color="text"
                fontWeight="medium"
            >
                {item?.createdAt}
            </MDTypography>
        ),
        updated: (
            <MDTypography
                component="a"
                variant="caption"
                color="text"
                fontWeight="medium"
            >
                {item?.updatedAt}
            </MDTypography>
        ),
        delete: (
            <MDButton
                onClick={() => {
                    setOpenDeleteForm(true);
                    setDeleteId(item?._id);
                }}
                color={"error"}
                size={"small"}
            >
                <MDTypography
                    component="a"
                    variant="caption"
                    color="white"
                    fontWeight="medium"
                >
                    Delete
                </MDTypography>
            </MDButton>
        ),
        edit: (
            <MDButton
                color={"info"}
                size={"small"}
                onClick={() => {
                    setId(item?._id);
                    setValue(item?.point_for_name);
                    setStatus(item?.status);
                }}
            >
                <MDTypography
                    component="a"
                    variant="caption"
                    color="white"
                    fontWeight="medium"
                >
                    Edit
                </MDTypography>
            </MDButton>
        ),
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!value) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/pointfor`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ point_for_name: value, status: status }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                setSuccessMessage("added successfully");
                openSuccessSB();
                setValue("");
                setId("");
                setStatus("");
            } else {
                setErrorMessage(responseData.message);
                openErrorSB();
            }
        } catch (error) {
            console.error(error);
        }
        fetchPointsFor();
    };

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

    const handleEdit = async () => {
        if (!value) {
            setErrorMessage("Please Fill All Fields!");
            openErrorSB();
            return;
        }

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/pointfor/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ point_for_name: value, status: status }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                setSuccessMessage("edited successfully");
                openSuccessSB();
                setValue("");
                setId("");
                setStatus("");
                fetchPointsFor();
            } else {
                setErrorMessage(responseData.message);
                openErrorSB();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/pointfor/${deleteId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const responseData = await response.json();
            if (responseData.success) {
                setSuccessMessage("Deleted successfully");
                openSuccessSB();
                setDeleteId("");
                fetchPointsFor();
                setOpenDeleteForm(false);
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
                                    Add Point For
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
                                                {id && "Edit"} Value
                                            </label>
                                            <MDInput
                                                value={value}
                                                type="text"
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
                                                fullWidth
                                            />
                                        </MDBox>
                                        <MDBox mb={2} sx={{ minWidth: "50%" }}>
                                            <label
                                                htmlFor=""
                                                style={{ fontWeight: "200" }}
                                            >
                                                {id && "Edit"} Status
                                            </label>
                                            <MDInput
                                                value={status}
                                                type="text"
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                                fullWidth
                                            />
                                        </MDBox>
                                        <MDBox mt={2} sx={{ minWidth: "30%" }}>
                                            <MDButton
                                                variant="gradient"
                                                color="info"
                                                type="submit"
                                                onClick={
                                                    id
                                                        ? handleEdit
                                                        : handleSubmit
                                                }
                                            >
                                                Submit
                                            </MDButton>
                                        </MDBox>
                                        {id && (
                                            <MDBox
                                                mt={2}
                                                sx={{ minWidth: "30%" }}
                                            >
                                                <MDButton
                                                    variant="gradient"
                                                    color="error"
                                                    type="button"
                                                    onClick={() => {
                                                        setValue("");
                                                        setId("");
                                                        setStatus("");
                                                    }}
                                                >
                                                    Cancel
                                                </MDButton>
                                            </MDBox>
                                        )}
                                    </Grid>
                                </Grid>
                            </MDBox>
                            <MDBox mx={2} mt={-3} py={2} px={2}>
                                <DataTable
                                    table={{
                                        columns: cols,
                                        rows: rows,
                                    }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            {renderSuccessSB}
            {renderErrorSB}

            <Dialog
                open={openDeleteForm}
                onClose={() => {
                    setOpenDeleteForm(false);
                    setDeleteId("");
                }}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenDeleteForm(false);
                            setDeleteId("");
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => handleDelete()} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
};

export default PointFor;
