import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { BASE_URL } from "BASE_URL";
import axios from "axios";
import { Filter } from "@material-ui/icons";
import { number, string } from "prop-types";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { Typography } from "@mui/material";

const Data = (searchTerm, contact, email, state, city, country) => {
    const [user, setuser] = useState([]);

    const navigate = useNavigate();

    const filterData = () => {
        return user?.filter((item) => {
            const nameMatch = item.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const contactMatch = item?.mobile
                .toString()
                .includes(contact.toLowerCase());
            const stateMatch = item.state
                .toLowerCase()
                .includes(state.toLowerCase());
            const emailmatch = item.email
                .toLowerCase()
                .includes(email.toLowerCase());
            const cityMatch = item.city
                .toLowerCase()
                .includes(city.toLowerCase());
            const countryMatch = item.country
                .toLowerCase()
                .includes(country.toLowerCase());

            return (
                nameMatch &&
                stateMatch &&
                cityMatch &&
                countryMatch &&
                emailmatch &&
                contactMatch
            );
        });
    };

    const filteredData = filterData();

    useEffect(() => {
        // setCountryData(Countries);
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await fetch(
                    `${BASE_URL}/api/admin/find_all_user`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                const responseData = await response.json();
                setuser(responseData.data);
                console.log(responseData.data);
            } catch (error) {
                console.error("Error fetching data from the backend", error);
            }
        };

        fetchData();
    }, []);
    return {
        columns: [
            // { Header: "", accessor: "image", width: "5%", align: "left" },
            { Header: "name", accessor: "name", width: "10%", align: "left" },
            {
                Header: "mobile",
                accessor: "mobile_email",
                width: "10%",
                align: "left",
            },
            // { Header: "email", accessor: "email",width: "10%", align: "center" },
            {
                Header: "gender",
                accessor: "gender",
                width: "10%",
                align: "center",
            },
            { Header: "DOB", accessor: "DOB", width: "10%", align: "center" },
            // { Header: "address", accessor: "address",width: "10%", align: "center" },
            // { Header: "state", accessor: "state",width: "10%", align: "center" },
            {
                Header: "country state",
                accessor: "country_state",
                width: "10%",
                align: "center",
            },
            {
                Header: "city pincode",
                accessor: "city_pincode",
                width: "10%",
                align: "center",
            },
            {
                Header: "register date",
                accessor: "register_date",
                width: "10%",
                align: "center",
            },
            {
                Header: "status",
                accessor: "status",
                width: "10%",
                align: "center",
            },
            { Header: "view", accessor: "view", width: "10%", align: "center" },
        ],

        rows:
            filteredData &&
            filteredData.map((el) => ({
                name: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        <img
                            src={el.profile_photo}
                            alt={el.profile_photo}
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                            }}
                        />
                        <br />
                        <p className="ps-1">{el.name}</p>
                    </MDTypography>
                ),
                mobile_email: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {el.mobile}
                        <br />
                        {el.email}
                    </MDTypography>
                ),
                gender: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {el.gender}
                    </MDTypography>
                ),
                DOB: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {el.dob}
                    </MDTypography>
                ),
                status: (
                    <MDBox ml={-1}>
                        <MDBadge
                            badgeContent={el.status}
                            color={el.status === "active" ? "success" : "error"}
                            variant="gradient"
                            size="sm"
                        />
                    </MDBox>
                ),

                city_pincode: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {el.city}
                        <br />
                        {el.pincode}
                    </MDTypography>
                ),
                country_state: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {el.country}
                        <br />
                        {el.state}
                    </MDTypography>
                ),
                register_date: (
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    ></MDTypography>
                ),
                view: (
                    // <link href={`userlist/view-user/${el._id}`} content="adsad" />
                    // <Typography
                    //     variant="caption"
                    //     color="text"
                    //     fontWeight="medium"
                    // >
                    //     view
                    // </Typography>
                    // </link>
                    <MDTypography
                        component="a"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                        href={`userlist/view-user/${el._id}`}
                    >
                        VIEW
                    </MDTypography>
                ),
            })),
    };
};

export default Data;
