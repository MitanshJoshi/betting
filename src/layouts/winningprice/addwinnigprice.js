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

const Addwinnigprice = () => {
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
    if (!ranges.every(range => /^[1-9][0-9]*(-[1-9][0-9]*)?$/.test(range))) {
      setErrorMessage("Invalid range format! Please use either single number or hyphenated range (e.g., 1, 2-5)");
      openErrorSB();
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/api/winngPriceRange/create`, {
        wpr_no: winnig,
        range: ranges,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
  
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
                  Add Winning Price
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Winning Price No"
                        name="contest types"
                        value={winnig}
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9 a-z A-Z]/g, ''); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === ' ') {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                        onChange={(e) => setwinnig(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <div>
                        {ranges.map((range, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              placeholder="Range (1 or 2-5)"
                              value={range}
                              onChange={handleRangeChange(index)}
                            />
                          </div>
                        ))}
                        <button onClick={addRange} className="btn btn-primary mt-2">Add Range</button>
                      </div>
                    </MDBox>
                    <MDBox mt={2} mb={1}>
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
    </DashboardLayout>
  );
};

export default Addwinnigprice;
