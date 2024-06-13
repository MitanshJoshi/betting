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
import countries from "../../CountryStateCity.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import
const Addplayerlist = () => {
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
      content="Player Is Successfully Added."
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

  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [age, setage] = useState("");
  const [nationality, setnationality] = useState("");
  // const [dob,setdob]=useState("")
  const [date, setdate] = useState("");
  const [role, setrole] = useState("");
  const [bat, setbat] = useState("");
  const [ball, setball] = useState("");
  const handleimg = (e) => {
    const file = e.target.files[0];

    if (!file || file.type !== "image/png") {
      setErrorMessage("Please select a PNG image file.");
      openErrorSB();
      return;
    }

    setimg(file);
  };
  const handleSubmit = async () => {
    if (
      !name &&
      !img &&
      !age &&
      !nationality &&
      !date &&
      !date &&
      !role &&
      !bat &&
      !ball
    ) {
      setErrorMessage("Please Fill All Fields!");
      openErrorSB();
      return;
    }
    if (!name) {
      setErrorMessage("Please Select Plyare Name!");
      openErrorSB();
      return;
    }
    if (!img) {
      setErrorMessage("Please Enter Player-image!");
      openErrorSB();
      return;
    }
    if (!age) {
      setErrorMessage("Please Enter Player-Age!");
      openErrorSB();
      return;
    }
    if (!nationality) {
      setErrorMessage("Please Enter Player-Nationality!");
      openErrorSB();
      return;
    }
    if (!date) {
      setErrorMessage("Please Enter Player Dob!");
      openErrorSB();
      return;
    }
    if (!role) {
      setErrorMessage("Please Enter Player-Role!");
      openErrorSB();
      return;
    }
    if (!bat) {
      setErrorMessage("Please Enter Player Bat-Type!");
      openErrorSB();
      return;
    }
    if (!ball) {
      setErrorMessage("Please Enter Player Bow-Type!");
      openErrorSB();
      return;
    }

    const formData = new FormData();
    formData.append("player_name", name);
    formData.append("player_photo", img);
    formData.append("age", age);
    formData.append("nationality", nationality);
    formData.append("birth_date", date);
    formData.append("role", role);
    formData.append("bat_type", bat);
    formData.append("bowl_type", ball);
    // formData.append("productprice", productprice);

    try {
      const response = await fetch(`${BASE_URL}/api/player/createPlayer`, {
        method: "POST",
        headers: {
          //   "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Team Add  faild`");
      }
      console.log(response);
      openSuccessSB();
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {}
  };
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 20); // 20 years ago from today

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100); // 100 years ago from today

    if (selectedDate > maxDate) {
      setErrorMessage("Please select a date within the last 20 years.");
      openErrorSB();
      return;
    }

    if (selectedDate < minDate) {
      setErrorMessage("Please select a date within the last 100 years.");
      openErrorSB();
      return;
    }

    setdate(e.target.value);
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
                  Add Player
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <label htmlFor="">Player Name</label>
                      <MDInput
                        type="text"
                        // label="Player name"
                        name="category"
                        onInput={(e) => {
                          let value = e.target.value.replace(
                            /[^a-z A-Z]/g,
                            ""
                          ); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === " ") {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                        onChange={(e) => setname(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Player Image</label>
                      <MDInput
                        type="file"
                        label=""
                        name="category"
                        // value={img}
                        onChange={handleimg}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Player Age</label>
                      <MDInput
                        type="text"
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ))
                        }
                        maxLength={2}
                        name="category"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={0} mt={0}>
                      <FormControl fullWidth>
                        <label htmlFor="">Player Nationality</label>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setnationality(e.target.value)}
                          value={nationality}
                          label="Select Team1"
                          style={{ padding: "10px 0px" }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {countries &&
                            countries.map((e) => (
                              <MenuItem value={e.name}>{e.name}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <label htmlFor="">Player Dob</label>
                      <MDInput
                        type="date"
                        label=""
                        name="category"
                        value={date}
                        onChange={handleDateChange}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Player Role</label>
                      <select
                        label="Role"
                        name="category"
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                        fullWidth
                        style={{
                          marginBottom: "20px",
                          width: "400px",
                          height: "40px",
                        }}
                      >
                        <option value="">Select Role</option>
                        <option value="Wicket Keeper">Wicket Keeper</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Allrounder">Allrounder</option>
                        <option value="Bowler">Bowler</option>
                      </select>
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Player Bat-Type</label>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ paddingBottom: "10px" }}
                          id="demo-simple-select-label"
                        ></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setbat(e.target.value)}
                          value={bat}
                          // label="Search Bat-type"
                          style={{ height: "43px" }}
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem width="150px" value="Right hand">
                            Right hand
                          </MenuItem>
                          <MenuItem width="150px" value="Left hand">
                            Left hand
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Player Bow-Type</label>

                      <FormControl fullWidth>
                        <InputLabel
                          style={{ paddingBottom: "10px" }}
                          id="demo-simple-select-label"
                        >
                          
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => setball(e.target.value)}
                          value={ball}
                          // label="Search Bow-type"
                          style={{ height: "43px" }}
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem width="150px" value="Right hand">
                            Right hand
                          </MenuItem>
                          <MenuItem width="150px" value="Left hand">
                            Left hand
                          </MenuItem>
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

export default Addplayerlist;
