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
// import
const Editteamplayer = () => {
  const [formData, setFormData] = useState({
    category: "",
    image: null,
  });
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const navigate = useNavigate();
  const { _id } = useParams();
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfull Added"
      content="Update TeamPlayer Is Successfully Updated."
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
      content="Please Enter Certificate Name"
      dateTime="1 sec ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );



 
 const[captain,setcaptain]=useState()
 const[vice_captain,setsetvice_captain]=useState()
  const handleSubmit = async () => {
  

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${BASE_URL}/api/team/update_c_and_vc?teamId=${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          "captain":captain ,
          "vice_captain": vice_captain
        }),
      }
    );

    openSuccessSB();
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };
  // const [player_id,setteamplayer]=useState("")
  const [player, setplayer] = useState([]);
  console.log(player);
  const fetchPlayer = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch(`${BASE_URL}/api/player/detailsList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setplayer(responseData.data);
      //   setimg(responseData.data);
      console.log(responseData.data);
      const matchedStartup = responseData.data.find(item => item._id === _id);
      if(matchedStartup){
        
      }
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchPlayer();
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
                  Edit Team
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                    <div
                          className="d-flex align-items-center"
                          style={{ gap: "15px",marginLeft:"35px"}}
                        >
                          <h6 className="mb-0">Captain</h6>
                          <select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="City"
                            name="status"
                            // onChange={""}
                            style={{
                              color: "#7b809a",
                              background: "transparent",
                              border: "1px solid #dadbda",
                              height: "44px",
                              padding: "0px 15px",
                              borderRadius: "5px",
                              fontSize: "14px",
                              
                            }}
                            fullWidth
                            onChange={(e)=>setcaptain(e.target.value)}
                          >
                            <option value="">Select</option>
                            {player &&
                              player.map((e) => (
                                
                                <option key={e._id} value={e._id} width="200px">
                                  {e.player_name}
                                </option>
                              ))}
                          </select>
                        </div>
                    </MDBox>
                    <MDBox mb={2}>
                    <div
                          className="d-flex align-items-center"
                          style={{ gap: "15px",marginLeft:""}}
                        >
                          <h6 className="mb-0">Vice captain</h6>
                          <select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="City"
                            name="status"
                            // onChange={""}
                            style={{
                              color: "#7b809a",
                              background: "transparent",
                              border: "1px solid #dadbda",
                              height: "44px",
                              padding: "0px 15px",
                              borderRadius: "5px",
                              fontSize: "14px",
                              
                            }}
                            fullWidth
                            onChange={(e)=>setsetvice_captain(e.target.value)}
                          >
                            <option value="">Select</option>
                            {player &&
                              player.map((e) => (
                                <option key={e._id} value={e._id} width="200px">
                                  {e.player_name}
                                </option>
                              ))}
                          </select>
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
      {/* <Footer /> */}
    </DashboardLayout>
  );
};

export default Editteamplayer;
