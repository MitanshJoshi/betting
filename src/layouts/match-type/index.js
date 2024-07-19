import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
} from "@mui/material";
import { BASE_URL } from "BASE_URL";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";

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

const MatchType = () => {
    const [matchType, setMatchType] = useState([]);

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
        { Header: "delete", accessor: "delete", align: "right" },
        { Header: "edit", accessor: "edit", align: "right" },
        { Header: "view", accessor: "view", align: "right" },
    ];

    const rows = matchType?.map((item) => ({
        name: <Author name={item?.name} />,
        delete: (
            <MDButton
                onClick={() => {
                    setDeleteId(item?._id);
                    setOpenDeleteForm(true);
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
                href={`/match-type/edit-match-type/${item?._id}`}
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
        view: (
            <MDButton color={"info"} size={"small"}>
                <MDTypography
                    component="a"
                    variant="caption"
                    color="white"
                    fontWeight="medium"
                >
                    View
                </MDTypography>
            </MDButton>
        ),
    }));

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
            if (responseData.success) {
                setMatchType(responseData.data);
            }
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                `${BASE_URL}/api/matchtype/${deleteId}`,
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
                fetchMatchType();
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
        fetchMatchType();
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
                                    Match Type
                                </MDTypography>
                                <MDButton
                                    size={"small"}
                                    href={"/match-type/add-match-type"}
                                >
                                    <MDTypography
                                        variant="button"
                                        color="black"
                                    >
                                        Add Match Type
                                    </MDTypography>
                                </MDButton>
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

export default MatchType;
