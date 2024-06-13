
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
import { useParams } from 'react-router-dom';
import { BASE_URL } from "BASE_URL";
// import
const Editcontectstype = () => {

    const [errorMessage, setErrorMessage] = useState("");

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const navigate = useNavigate();
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Successfull Updated"
            content=" contest-type Is Successfully Updated."
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

    const { _id } = useParams();

    const [contest_type,settypes]=useState("")


    const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log(token);
          const response = await fetch(`${BASE_URL}/api/contestType/display`, {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });
          const responseData = await response.json();
        //   setDisplay(responseData.data);
          console.log(responseData.data);
          const contestdata=responseData.data.find(item=>item._id===_id)
          if(contestdata){
            settypes(contestdata.contest_type)
          }
        } catch (error) {
          console.error("Error fetching data from the backend", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    const handleSubmit = async () => {

        if (!contest_type) {
            setErrorMessage("Please Select types!")
            openErrorSB();
            return
        }
     

        try {
          const response = await fetch(
            `${BASE_URL}/api/contestType/update?_id=${_id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({
                "contest_type": contest_type,
                
              }),
            }
          );

          
          if (!response.ok) {
            throw new Error("Chat inquiry failed");
          }
            openSuccessSB();
        setTimeout(() => {
            navigate(-1)
        }, 2000);
        } catch (error) {
          if (error) {
           console.log("hello")
            };
          }
        }

 

    // const fetchUserList = async () => {
    //     try {
    //         const token = `Bearer ${localStorage.getItem("chemToken")}`;
    //         const response = await axios.get(
    //             `${BASE_URL}/api/category/categories`,
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setCategoryId(response.data.categories);


    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserList()
    // }, []);

    // useEffect(() => {
    //     const fetchUserList = async () => {
    //         try {
    //             const token = `Bearer ${localStorage.getItem("chemToken")}`;
    //             const response = await axios.get(
    //                 `${BASE_URL}/api/subcategory/subcategories/${_id}`,
    //                 {
    //                     headers: {
    //                         Authorization: token,
    //                     },
    //                 }
    //             );
    //             setSubCategory(response?.data?.subcategory?.subcategory_name);
    //             setCategory(response?.data?.subcategory?.category_id);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchUserList();
    // }, []);

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
                                    Update Contests-types
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container pt={4} pb={3} px={3}>
                                    <Grid item xs={12} md={6} xl={6} px={2}>
                                        <MDBox mb={2}>
                                            <label htmlFor="">Contest-types</label>
                                        <MDInput
                                                type="text"
                                                // label=""
                                                name="contest types"
                                                value={contest_type}
                                                onChange={(e)=>settypes(e.target.value)}
                                                fullWidth
                                                style={{ marginBottom: "20px" }}
                                            />
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

export default Editcontectstype;