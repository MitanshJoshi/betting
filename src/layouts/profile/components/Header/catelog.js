import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";



function Catelog() {
    return (

        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                    <ComplexStatisticsCard
                        color="dark"
                        icon="weekend"
                        title="Selling Inquiries"
                        count={20}
                        percentage={{
                            color: "success",
                            amount: "+55%",
                            label: "than last week",
                        }}
                        name="xyz"
                        price="800 - 850 rs"
                        quantity="2kg"
                        storage="Room Temperature"
                        packaging_size="10 * 10 sqf"
                        packaging_type="box"
                        appearance="Solid White Powder"
                    />
                </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                    <ComplexStatisticsCard
                        color="dark"
                        icon="weekend"
                        title="Selling Inquiries"
                        count={20}
                        percentage={{
                            color: "success",
                            amount: "+55%",
                            label: "than last week",
                        }}
                        name="xyz"
                        price="800 - 850 rs"
                        quantity="2kg"
                        storage="Room Temperature"
                        packaging_size="10 * 10 sqf"
                        packaging_type="box"
                        appearance="Solid White Powder"
                    />
                </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                    <ComplexStatisticsCard
                        color="dark"
                        icon="weekend"
                        title="Selling Inquiries"
                        count={20}
                        percentage={{
                            color: "success",
                            amount: "+55%",
                            label: "than last week",
                        }}
                        name="xyz"
                        price="800 - 850 rs"
                        quantity="2kg"
                        storage="Room Temperature"
                        packaging_size="10 * 10 sqf"
                        packaging_type="box"
                        appearance="Solid White Powder"
                    />
                </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                    <ComplexStatisticsCard
                        color="dark"
                        icon="weekend"
                        title="Selling Inquiries"
                        count={20}
                        percentage={{
                            color: "success",
                            amount: "+55%",
                            label: "than last week",
                        }}
                        name="xyz"
                        price="800 - 850 rs"
                        quantity="2kg"
                        storage="Room Temperature"
                        packaging_size="10 * 10 sqf"
                        packaging_type="box"
                        appearance="Solid White Powder"
                    />
                </MDBox>
            </Grid>
        </Grid>
    );
}

export default Catelog;
