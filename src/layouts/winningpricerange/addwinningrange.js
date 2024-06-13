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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Addwinningrange = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const navigate = useNavigate();

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfull Updated"
      content=" Winning Price-range Is Successfully Add."
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

  const [winnigrange, setwinningrange] = useState("");
  const [contest, setcontestid] = useState("");

  const handleSubmit = async () => {
    if (!winnigrange) {
      setErrorMessage("Please Select Winnnig price No!");
      openErrorSB();
      return;
    }
    if (!contest) {
      setErrorMessage("Please Select Range!");
      openErrorSB();
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/winngPrice/create`,
        {
          wpr_id: winnigrange,
          contest_id: contest,
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
  const [Display, setDisplay] = useState([]);
  console.log(Display);
  // const filteredData = startupdata.filter((e) => (e.startupName?.toLowerCase().includes(startup)))
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch(
        `${BASE_URL}/api/winngPriceRange/displayAll`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = await response.json();
      setDisplay(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [League, setleague] = useState([]);
  const contestid = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch(`${BASE_URL}/api/contest/displayList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setleague(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    contestid();
  }, []);
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
                  Add Winning Price Range
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ paddingBottom: "10px" }}
                          id="demo-simple-select-label"
                        >
                          Range
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setwinningrange(e.target.value)}
                          value={winnigrange}
                          label="Select Team1"
                          style={{ padding: "10px 0px" }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {Display &&
                            Display.map((e) => (
                              <MenuItem value={e._id}>{e.range.join(",")}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ paddingBottom: "10px" }}
                          id="demo-simple-select-label"
                        >
                          contest
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setcontestid(e.target.value)}
                          value={contest}
                          label="Select Team1"
                          style={{ padding: "10px 0px" }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {League &&
                            League.map((e) => (
                              <MenuItem value={e._id}>
                                {e.contestTypeData?.[0]?.contest_type}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
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

                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                      <MDInput
                        type="text"
                        label="price"
                        name="price"
                        // value={date}
                        // onChange={(e) => setdate(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                      </FormControl>
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

export default Addwinningrange;
