import React, { useState } from "react";
import {
    Divider,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ProfileInfoCard from "../ProfileInfoCard";
import { Card } from "react-bootstrap";
import DataTable from "examples/Tables/DataTable";

const Transactions = ({ transactions }) => {
    const [type, setType] = useState("");

    const columns = [
        { Header: "Amount", accessor: "amount", width: "10%", align: "left" },
        {
            Header: "Payment Type",
            accessor: "payment_type",
            width: "10%",
            align: "left",
        },
        {
            Header: "Payment Mode",
            accessor: "payment_mode",
            width: "10%",
            align: "left",
        },
        { Header: "Date", accessor: "date", width: "10%", align: "left" },
    ];

    const rows = transactions
        .filter((x) => x.payment_type.includes(type))
        .map((el) => ({
            amount: (
                <MDTypography
                    component="span"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {el.amount}
                </MDTypography>
            ),
            payment_type: (
                <MDTypography
                    component="span"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {el.payment_type}
                </MDTypography>
            ),
            payment_mode: (
                <MDTypography
                    component="span"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {el.payment_mode}
                </MDTypography>
            ),
            date: (
                <MDTypography
                    component="span"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {el.createdAt}
                </MDTypography>
            ),
        }));

    return (
        <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
            <FormControl sx={{ width: "150px" }}>
                <InputLabel id="role-select-label">Payment Type</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    labelId="role-select-label"
                    id="role-select"
                    style={{ height: "43px" }}
                >
                    <MenuItem value="">Payment Type</MenuItem>
                    <MenuItem value="add_wallet">Add Walet</MenuItem>
                    <MenuItem value="withdraw">Withdraw</MenuItem>
                    <MenuItem value="contest_fee">Contest Fee</MenuItem>
                    <MenuItem value="wining_amount">Wining Amount</MenuItem>
                </Select>
            </FormControl>
            <MDBox pt={5} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card style={{ width: "100%" }}>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Transactions ({rows.length})
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2} px={2}>
                                <DataTable
                                    table={{
                                        columns,
                                        rows,
                                    }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                    style={{ width: "100%" }}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </div>
    );
};

export default Transactions;
