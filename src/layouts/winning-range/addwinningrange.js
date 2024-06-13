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
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/WinningRangeStatickCard";

const Addwinningranges = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [value, setValue] = useState([]);

  const [rank, setRank] = useState([]); // Store rank as an array of numbers
  const [price, setPrice] = useState("");
  const [pricePercentage, setPricePercent] = useState("");
  const [contestid, setContestId] = useState("");
  const [display, setDisplay] = useState("");
  const [contest, setContest] = useState([]);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const navigate = useNavigate();

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value); // Convert input value to a number

    if (!isNaN(value) && !isNaN(after)) {
      setPrice(value);
      const calculatedPercentage = ((value * rank.length) / after) * 100;
      setPricePercent(calculatedPercentage.toFixed(2));
    }
  };

  const handlePricePercentageChange = (e) => {
    const value = e.target.value;
    setPricePercent(value);

    const pricePercentageNumber = parseFloat(value);

    if (!isNaN(after) && !isNaN(pricePercentageNumber)) {
      const calculatedPrice =
        (after * pricePercentageNumber) / (100 * rank.length);
      setPrice(calculatedPrice.toFixed(2));
    }
  };

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

  const handleChange = (event, newValue) => {
    const [start, end] = newValue;

    if (start > end) {
      setErrorMessage("Start value cannot be greater than end value!");
      openErrorSB();
      return;
    }

    const rangeArray = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
        
    setValue([start, end]); 
    setRank(rangeArray);
  };

  function valuetext(value) {
    return `${value}`;
  }

  const displayData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/contestDetails/displayList`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = await response.json();
      setDisplay(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/contest/displayList`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setContest(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!contestid || !rank.length || !price) {
      setErrorMessage("Please fill all fields!");
      openErrorSB();
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/contestDetails/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          contest_id: contestid,
          rankes: dataArray,
        }),
      });

      if (!response.ok) {
        throw new Error("Contest creation failed");
      }
      openSuccessSB();
      displayData();
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      openErrorSB();
    }
  };
  const handleRemove = (index) => {
    const newDataArray = dataArray.filter((_, i) => i !== index);
    setDataArray(newDataArray);
  
    const newMinRange = Math.min(...newDataArray.map((data) => data.range[0]));
    const newMaxRange = Math.max(...newDataArray.map((data) => data.range[1]));
    const newValue = [newMinRange, newMaxRange];
  
    setValue([newMinRange, newMaxRange]); // Reset the slider
    setRank([]); // Reset the rank array
    setMinrange(newMinRange);
    setMaxrange(newMaxRange);
  };

  const [entryFees, setEntryFees] = useState("");
  const [totalEntry, setTotalEntry] = useState("");
  const [profitPercent, setProfitPercent] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [after, setAfterAmount] = useState("");
  const [minRange, setMinrange] = useState(1);
  const [maxRange, setMaxrange] = useState(100);
  const [dataArray, setDataArray] = useState([]);
  const [remaining, setremaining] = useState(null);

  const handleSubmit1 = () => {
    if (after < price * rank.length) {
      setErrorMessage("Amount should be less than after amount");
      openErrorSB();
      return;
    }

    if (value[0] > value[1]) {
      setErrorMessage("Max Participants Reached!");
      openErrorSB();
      return;
    }

    if (remaining - price * rank.length < 0) {
      setErrorMessage("Insufficient remaining amount!");
      openErrorSB();
      return;
    }

    const newData = {
      range: value,
      price: price * rank.length,
    };
    setDataArray([...dataArray, newData]);
    setremaining(remaining - price * rank.length);

    const lastElement = value[1] + 1;

    setValue([lastElement, totalEntry]);
    if (lastElement < totalEntry) {
      setRank([lastElement, totalEntry]);
    }
    setMinrange(lastElement);
    setMaxrange(totalEntry);
  };

  const [displaye, setdisplay] = useState("");

  const fetchDataa = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/contest/displayDetails?contestId=${contestid}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = await response.json();
      setdisplay(responseData.data);
      setEntryFees(responseData.data.entry_fees);
      setTotalEntry(responseData.data.total_participant);
      setProfitPercent(responseData.data.profit);
      setTotalAmount(
        responseData.data.entry_fees * responseData.data.total_participant
      );
      setMaxrange(responseData.data.total_participant);

      const totalAmount =
        responseData.data.entry_fees * responseData.data.total_participant;
      setTotalAmount(totalAmount);

      const profitPercentNumber = parseFloat(responseData.data.profit);

      const afterAmount =
        totalAmount - totalAmount * (profitPercentNumber / 100);
      setAfterAmount(afterAmount);
      setremaining(afterAmount);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchDataa();
  }, [contestid]);

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        {!contestid && (
          <MDBox mb={2}>
            <label htmlFor="" style={{ fontWeight: "200" }}>
              Select Contest
            </label>
            <FormControl fullWidth>
              <InputLabel
                style={{ paddingBottom: "10px" }}
                id="demo-simple-select-label"
              ></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setContestId(e.target.value)}
                value={contestid}
                style={{ padding: "10px 0px" }}
              >
                <MenuItem value="" style={{ fontWeight: "200" }}>
                  Select
                </MenuItem>
                {contest &&
                  contest.map((e) => (
                    <MenuItem key={e._id} value={e._id}>
                      {e?.contestTypeData?.[0]?.contest_type}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </MDBox>
        )}
        {contestid && (
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
                  <MDButton
                    variant="gradient"
                    color="dark"
                    style={{ position: "absolute", top: "13px", right: "2%" }}
                    onClick={handleSubmit}
                  >
                    {"Save winning price"}
                  </MDButton>
                </MDBox>
                <MDBox py={3} px={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                          title="CONTEST DETAILS"
                          totalPaticipants={totalEntry}
                          entryfess={entryFees}
                          totalAmount={totalAmount}
                          profit={profitPercent}
                          afterprofit={after}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                  <Grid container pt={4} pb={3} px={3}>
                    <Grid item xs={6} md={6} xl={6} px={2}>
                      <div className="container d-flex align-items-center justify-content-center">
                        <div className="range-1 me-5 col-md-12">
                          <div className="container">
                            <MDBox mb={1}>
                              <h6>REMAINING VALUE&nbsp;:-&nbsp;{remaining}</h6>
                            </MDBox>
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Rank</th>
                                  <th>Winning Price</th>
                                  <th>Action</th>{" "}
                                  {/* New column for Remove button */}
                                </tr>
                              </thead>
                              <tbody>
                                {dataArray &&
                                  dataArray.map((e, index) => (
                                    <tr key={index}>
                                      <td>{`${e?.range?.[0]} - ${
                                        e?.range?.[e.range.length - 1]
                                      }`}</td>
                                      <td>{e?.price}</td>
                                      <td>
                                        <button
                                          onClick={() => handleRemove(index)}
                                        >
                                          Remove
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={3} xl={6} px={1}>
                      {remaining !== 0 && (
                        <div className="rang-2 md-col-6">
                          <div>
                            <Box sx={{ width: 300 }}>
                              <Slider
                                getAriaLabel={() => "Winning Rank"}
                                value={[Math.min(...value), Math.max(...value)]}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                min={minRange}
                                max={maxRange}
                              />
                            </Box>
                            <MDBox mb={1}>
                              <label htmlFor="" style={{ fontWeight: "500" }}>
                                Winning Rank
                              </label>
                              <MDInput
                                type="text"
                                readOnly
                                value={rank.join(", ")} // Display the full range
                                fullWidth
                                style={{ marginBottom: "20px" }}
                              />
                            </MDBox>
                          </div>
                          <MDBox mb={1}>
                            <label htmlFor="" style={{ fontWeight: "500" }}>
                              Winning Price
                            </label>
                            <MDInput
                              type="text"
                              value={price}
                              onInput={(e) =>
                                (e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                ))
                              }
                              maxLength={2}
                              onChange={handlePriceChange}
                              fullWidth
                              style={{ marginBottom: "20px" }}
                            />
                          </MDBox>
                          <MDBox mb={1}>
                            <label htmlFor="" style={{ fontWeight: "500" }}>
                              Winning Price(%)
                            </label>
                            <MDInput
                              type="text"
                              value={pricePercentage}
                              onInput={(e) =>
                                (e.target.value = e.target.value.replace(
                                  /[^0-9]%/g,
                                  ""
                                ))
                              }
                              maxLength={2}
                              onChange={handlePricePercentageChange}
                              fullWidth
                              style={{ marginBottom: "20px" }}
                            />
                          </MDBox>
                          <MDBox mt={2} mb={1}>
                            <MDButton
                              variant="gradient"
                              color="info"
                              fullWidth
                              onClick={handleSubmit1}
                            >
                              Submit
                            </MDButton>
                            {renderSuccessSB}
                            {renderErrorSB}
                          </MDBox>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </DashboardLayout>
  );
};

export default Addwinningranges;
