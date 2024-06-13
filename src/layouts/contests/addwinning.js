import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "BASE_URL";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { CardContent } from "@mui/material";

const Addwinning = () => {
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
      title="Successful Updated"
      content="Winning Price Is Successfully Add."
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

  const [winnig, setwinnig] = useState("");
  const [ranges, setRanges] = useState([""]);

  const addRange = () => {
    setRanges([...ranges, ""]);
  };

  const handleRangeChange = (index) => (event) => {
    const newRanges = [...ranges];
    newRanges[index] = event.target.value;
    setRanges(newRanges);
  };

  const handleSubmit = async () => {
    if (!winnig) {
      setErrorMessage("Please Select Winning price No!");
      openErrorSB();
      return;
    }
    if (!ranges.every((range) => /^[1-9][0-9]*(-[1-9][0-9]*)?$/.test(range))) {
      setErrorMessage(
        "Invalid range format! Please use either single number or hyphenated range (e.g., 1, 2-5)"
      );
      openErrorSB();
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/winngPriceRange/create`,
        {
          wpr_no: winnig,
          range: ranges,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create winning price range");
      }

      openSuccessSB();
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error creating winning price range:", error);
      openErrorSB();
    }
  };

  return (
    <DashboardLayout>
      {/* Your DashboardLayout and other components */}
      {/* Your DashboardNavbar and other components */}
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
                  Add Winning
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <CardContent>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="container mt-5"
                          style={{ width: "500px" }}
                        >
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <h5 className="card-title">Rank</h5>
                                  <p className="card-text">1</p>
                                </div>
                                <div className="col-md-6">
                                  <h5 className="card-title">Winning</h5>
                                  <p className="card-text">1cr</p>
                                </div>
                              </div>
                              <div className="text-center mt-3">
                                <button className="btn btn-success">
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="container mt-5">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <h5 className="card-title">Rank</h5>
                                  <p className="card-text">1</p>
                                </div>
                                <div className="col-md-6">
                                  <h5 className="card-title">Winning</h5>
                                  <p className="card-text">1cr</p>
                                </div>
                              </div>
                              <div className="text-center mt-3">
                                <button className="btn btn-success">
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Addwinning;
