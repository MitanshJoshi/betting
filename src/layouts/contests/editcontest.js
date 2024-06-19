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
import { MDSelect } from "@mui/material";

const Addcontests = () => {
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
      title="Successful Update"
      content="Contest is successfully added."
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
      title="Field Error"
      content={errorMessage}
      dateTime="1 sec ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const {_id}=useParams()
  const [match_id, setMatchId] = useState("");
  const [contest_type_id, setContestId] = useState("");
  const [price_pool, setPrice] = useState("");
  const [entry_fees, setEntry] = useState("");
  const [total_entry, setTotal] = useState("");
  const [max_team_per_user, setMax] = useState("");
  const [profit, setProfit] = useState("");

  const handleSubmit = async () => {
    if (!match_id || !contest_type_id || !entry_fees || !price_pool || !total_entry || !max_team_per_user) {
      setErrorMessage("Please fill all fields!");
      openErrorSB();
      return;
    }
    if (!match_id) {
      setErrorMessage("Please select a match name!");
      openErrorSB();
      return;
    }
    if (!contest_type_id) {
      setErrorMessage("Please select a contest name!");
      openErrorSB();
      return;
    }
    if (!price_pool) {
      setErrorMessage("Please select a Price Pool!");
      openErrorSB();
      return;
    }
    if (!profit) {
      setErrorMessage("Please select a Profit!");
      openErrorSB();
      return;
    }
    if (!entry_fees) {
      setErrorMessage("Please select Entry Fees!");
      openErrorSB();
      return;
    }
    if (!total_entry) {
      setErrorMessage("Please select Total Entry!");
      openErrorSB();
      return;
    }
    if (!max_team_per_user) {
      setErrorMessage("Please select Total Max Team per User!");
      openErrorSB();
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/contest/update?contestId=${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          match_id: match_id,
          contest_type_id: contest_type_id,
          price_pool: Number(price_pool),
          entry_fees: Number(entry_fees),
          total_participant: Number(total_entry),
          max_team_per_user: Number(max_team_per_user),
          profit: profit
        }),
      });

      if (!response.ok) {
        throw new Error("Contest creation failed");
      }
      openSuccessSB();
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      openErrorSB();
    }
  };

  const [Team, setTeam] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/match/displayList?leagueId`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setTeam(responseData?.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [Display, setDisplay] = useState([]);
  const contestType = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/contestType/display`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setDisplay(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    contestType();
  }, []);

  const [League, setLeague] = useState([]);
  const fetchLeagueData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/contest/displayList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setLeague(responseData.data);
      const editdata=responseData.data.filter((item)=>item._id===_id)
      console.log(editdata)
      if(editdata){
        setMatchId(editdata?.[0].match_id)
        setContestId(editdata?.[0].contest_type_id)
        setPrice(editdata?.[0].price_pool)
        setTotal(editdata?.[0].total_participant)
        setMax(editdata?.[0].max_team_per_user)
        setProfit(editdata?.[0].profit)
        setEntry(editdata?.[0].entry_fees)
      }
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchLeagueData();
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
                  Contests Add
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <label htmlFor="match-name">Match Name</label>
                      <select
                        onChange={(e) => setMatchId(e.target.value)}
                        fullWidth
                        value={match_id}
                        style={{
                          marginBottom: "20px",
                          width: "400px",
                          height: "40px",
                        }}
                      >
                        <option value="">Select</option>
                        {Team?.map((e) => (
                          <option key={e._id} value={e._id}>
                            {e.match_name}
                          </option>
                        ))}
                      </select>
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="contest-name">Contest Name</label>
                      <select
                        value={contest_type_id}
                        onChange={(e) => setContestId(e.target.value)}
                        fullWidth
                        style={{
                          marginBottom: "20px",
                          width: "400px",
                          height: "40px",
                        }}
                      >
                        <option value="">Select</option>
                        {Display && Display.map((e) => (
                          <option key={e._id} value={e._id}>
                            {e.contest_type}
                          </option>
                        ))}
                      </select>
                    </MDBox>
                    <MDBox mb={1}>
                      <label htmlFor="price-pool">Price Pool</label>
                      <MDInput
                        type="number"
                        label=""
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length > 0 && value[0] === ' ') {
                            value = value.slice(1);
                          }
                          e.target.value = value;
                        }}
                        value={price_pool}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={1}>
                      <label htmlFor="profit">Profit</label>
                      <MDInput
                        type="text"
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9% ]/g, '');
                          if (value.length > 0 && value[0] === ' ') {
                            value = value.slice(1);
                          }
                          e.target.value = value;
                        }}
                        value={profit}
                        onChange={(e) => setProfit(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "10px" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <label htmlFor="entry-fees">Entry Fees</label>
                      <MDInput
                        type="number"
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length > 0 && value[0] === ' ') {
                            value = value.slice(1);
                          }
                          e.target.value = value;
                        }}
                        value={entry_fees}
                        onChange={(e) => setEntry(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="total-entry">Total Entry</label>
                      <MDInput
                        type="number"
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length > 0 && value[0] === ' ') {
                            value = value.slice(1);
                          }
                          e.target.value = value;
                        }}
                        value={total_entry}
                        onChange={(e) => setTotal(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="max-team-per-user">Max Team per User</label>
                      <MDInput
                        type="number"
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length > 0 && value[0] === ' ') {
                            value = value.slice(1);
                          }
                          e.target.value = value;
                        }}
                        value={max_team_per_user}
                        onChange={(e) => setMax(e.target.value)}
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
    </DashboardLayout>
  );
};

export default Addcontests;
