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
import { useParams } from "react-router-dom";
import { BASE_URL } from "BASE_URL";

const Editwinnigprice = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const navigate = useNavigate();

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const {_id}=useParams()
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfull Updated"
      content=" Winnig Price Is Successfully Updated."
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
  const [ranges, setRanges] = useState([{ start: 1, end: 10 }]);

  const addRange = () => {
    setRanges([...ranges, { start: 1, end: 10 }]);
  };

  const handleRangeChange = (index, field) => (event) => {
    const newRanges = [...ranges];
    newRanges[index][field] = parseInt(event.target.value);
    setRanges(newRanges);
  };

  const handleSubmit = async () => {
    if (!winnig) {
      setErrorMessage("Please Select Winnnig price No!");
      openErrorSB();
      return;
    }
    if (!ranges || !ranges.length) {
      setErrorMessage("Please Select Range!");
      openErrorSB();
      return;
    }
  
    try {
      const formattedRanges = ranges.map(range => `${range.start}-${range.end}`);
  
      const response = await axios.put(`${BASE_URL}/api/winngPriceRange/update?id=${_id}`, {
        wpr_no: winnig,
        range: formattedRanges,
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
                  Update Winnigprice Range
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Winnig Price No"
                        name="contest types"
                        value={winnig}
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
                              type="range"
                              min="1"
                              max="100"
                              value={range.start}
                              onChange={handleRangeChange(index, "start")}
                            />
                            <span>{range.start} - </span>
                            <input
                              type="range"
                              min="1"
                              max="100"
                              value={range.end}
                              onChange={handleRangeChange(index, "end")}
                            />
                            <span>{range.end}</span>
                          </div>
                        ))}
                        <button onClick={addRange}>Add Range</button>
                      </div>
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
    </DashboardLayout>
  );
};

export default Editwinnigprice;
