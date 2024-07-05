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

    const [rank, setRank] = useState([]);
    const [price, setPrice] = useState("");
    const [pricePercentage, setPricePercent] = useState("");
    const [contestid, setContestId] = useState("");
    const [display, setDisplay] = useState("");
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [league_id, setLeague_id] = useState("");
    const [Leagues, setLeagues] = useState([]);
    const [match_id, setMatchId] = useState("");
    const [contest, setContest] = useState([]);

    const [entryFees, setEntryFees] = useState("");
    const [totalEntry, setTotalEntry] = useState("");
    const [profitPercent, setProfitPercent] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [after, setAfterAmount] = useState("");
    const [minRange, setMinrange] = useState(1);
    const [maxRange, setMaxrange] = useState(100);
    const [dataArray, setDataArray] = useState([]);
    const [remaining, setremaining] = useState(null);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

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

    const fetchLeagues = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(`${BASE_URL}/api/league/displayList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            setLeagues(responseData.data);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchMatches = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/match/displayList?leagueId=${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            setMatches(responseData?.data);
            console.log(responseData);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    const fetchContests = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/match/displaycontestList?matchId=${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();
            setContest(responseData?.data[0].contests);
            console.log(responseData?.data[0].contests);
        } catch (error) {
            console.error("Error fetching data from the backend", error);
        }
    };

    useEffect(() => {
        fetchLeagues();
    }, []);

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

    const handleSubmit = async () => {
        if (!contestid || !rank.length || !price || !pricePercentage) {
            setErrorMessage("Please fill all fields!");
            openErrorSB();
            return;
        }

        const ranksArray = rank.split("-").map((r) => parseInt(r.trim()));
        const totalNumbersInRank = ranksArray[1] - ranksArray[0] + 1;
        const totalWinningPrice = price * totalNumbersInRank;

        if (totalWinningPrice > remaining) {
            setErrorMessage("Total winning price exceeds remaining value!");
            openErrorSB();
            return;
        }

        try {
            const response = await fetch(
                `${BASE_URL}/api/contestDetails/insert`,
                {
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
                }
            );

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

    const fetchData = async () => {
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
            setEntryFees(responseData.data.entry_fees);
            setTotalEntry(responseData.data.total_participant);
            setProfitPercent(responseData.data.profit);
            setTotalAmount(
                responseData.data.entry_fees *
                    responseData.data.total_participant
            );
            setMaxrange(responseData.data.total_participant);

            const totalAmount =
                responseData.data.entry_fees *
                responseData.data.total_participant;
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
        fetchData();
    }, [contestid]);

    const handleSliderChange = (event, newValue) => {
        if (newValue[1] > totalEntry) {
            newValue[1] = totalEntry;
        }
        setMaxrange(newValue[1]);
        setValue([newValue[0], newValue[1]]);
        setRank(`${minRange} - ${newValue[1]}`);
    };

    const handleInputChange = (event) => {
        let newValue = Number(event.target.value);
        if (newValue > totalEntry) {
            newValue = totalEntry;
        }
        setMaxrange(newValue);
        setRank(`${minRange} - ${newValue}`);
    };

    const handlePriceChange = (e) => {
        const value = parseFloat(e.target.value); // Convert input value to a number

        if (!isNaN(value) && !isNaN(after)) {
            setPrice(value);
            const calculatedPercentage =
                ((value * (maxRange - minRange + 1)) / after) * 100;
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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const totalWiningPrice = Number(price) * (maxRange - minRange + 1);

        if (after < price * (maxRange - minRange + 1)) {
            setErrorMessage("Amount should be less than after amount");
            openErrorSB();
            return;
        }

        if (minRange > maxRange) {
            setErrorMessage("Max Participants Reached!");
            openErrorSB();
            return;
        }

        if (totalWiningPrice > remaining) {
            setErrorMessage("Insufficient remaining amount");
            openErrorSB();
            return;
        }

        const data = {
            ranks: [minRange, maxRange],
            winningPrice: price * (maxRange - minRange + 1),
            winningPercentage: pricePercentage,
        };
        setDataArray([...dataArray, data]);
        setremaining(remaining - price * (maxRange - minRange + 1));

        const lastElement = maxRange + 1;

        setValue([lastElement, totalEntry]);
        if (lastElement < totalEntry) {
            setRank(`${lastElement} - ${totalEntry}`);
        }
        setMinrange(lastElement);
        setMaxrange(totalEntry);
        setPricePercent(0);
        setPrice(0);
    };

    // TODO: complete this function
    const handleRemove = (index) => {
        const newDataArray = dataArray.filter((_, i) => i < index);
        setDataArray(newDataArray);
        setMinrange(newDataArray[newDataArray.length - 1].ranks[0] + 1);
        setMaxrange(totalEntry);
    };

    return (
        <DashboardLayout>
            <MDBox pt={6} pb={3}>
                {!contestid && (
                    <MDBox py={3} px={2}>
                        <Grid container pt={4} pb={3} px={3}>
                            <Grid item xs={12} md={6} xl={6} px={2}>
                                <MDBox mb={2}>
                                    <label htmlFor="match-name">
                                        League Name
                                    </label>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={(e) => {
                                                setMatches([]);
                                                setLeague_id(e.target.value);
                                                fetchMatches(e.target.value);
                                            }}
                                            value={league_id}
                                            style={{
                                                padding: "10px 0px",
                                            }}
                                        >
                                            <MenuItem
                                                value=""
                                                style={{
                                                    fontWeight: "200",
                                                }}
                                            >
                                                Select
                                            </MenuItem>
                                            {Leagues &&
                                                Leagues.map((e) => (
                                                    <MenuItem value={e._id}>
                                                        {e.league_name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </MDBox>
                                {league_id && (
                                    <MDBox mb={2}>
                                        <label htmlFor="match-name">
                                            Match Name
                                        </label>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={(e) => {
                                                    setMatchId(e.target.value);
                                                    fetchContests(
                                                        e.target.value
                                                    );
                                                }}
                                                value={match_id}
                                                style={{
                                                    padding: "10px 0px",
                                                }}
                                            >
                                                <MenuItem
                                                    value=""
                                                    style={{
                                                        fontWeight: "200",
                                                    }}
                                                >
                                                    Select
                                                </MenuItem>
                                                {matches[0] &&
                                                    matches.map((e) => (
                                                        <MenuItem value={e._id}>
                                                            {e.match_name}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </MDBox>
                                )}
                                {match_id && (
                                    <MDBox mb={2}>
                                        <label htmlFor="contest-name">
                                            Contest Name
                                        </label>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={(e) =>
                                                    setContestId(e.target.value)
                                                }
                                                style={{
                                                    padding: "10px 0px",
                                                }}
                                            >
                                                <MenuItem
                                                    value=""
                                                    style={{
                                                        fontWeight: "200",
                                                    }}
                                                >
                                                    Select
                                                </MenuItem>
                                                {contest[0] &&
                                                    contest.map((e) => (
                                                        <MenuItem
                                                            key={
                                                                e?.contest_type
                                                                    ?._id
                                                            }
                                                            value={e?._id}
                                                        >
                                                            {
                                                                e.contest_type
                                                                    ?.contest_type
                                                            }
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </MDBox>
                                )}
                            </Grid>
                        </Grid>
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
                                        style={{
                                            position: "absolute",
                                            top: "13px",
                                            right: "2%",
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        {"Save winning price"}
                                    </MDButton>
                                </MDBox>
                                <MDBox py={3} px={2}>
                                    <Grid container spacing={12} mb={5}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <MDBox mb={1.5}>
                                                <ComplexStatisticsCard
                                                    title="CONTEST DETAILS"
                                                    totalPaticipants={
                                                        totalEntry
                                                    }
                                                    entryfess={entryFees}
                                                    totalAmount={totalAmount}
                                                    profit={profitPercent}
                                                    afterprofit={after}
                                                />
                                            </MDBox>
                                            <MDBox mb={1.5}>
                                                <h6>
                                                    Remaining Value :{" "}
                                                    {remaining -
                                                        Number(price) *
                                                            (maxRange -
                                                                minRange +
                                                                1)}
                                                </h6>
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={12} mb={5} px={10}>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Rank</th>
                                                        <th>Winning Price</th>
                                                        <th>Action</th>{" "}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataArray &&
                                                        dataArray.map(
                                                            (e, index) => (
                                                                <tr key={index}>
                                                                    <td>{`${e?.ranks?.[0]} - ${e?.ranks?.[1]}`}</td>
                                                                    <td>
                                                                        {
                                                                            e?.winningPrice
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemove(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                </tbody>
                                            </table>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <form onSubmit={handleFormSubmit}>
                                                <MDBox mb={3}>
                                                    <InputLabel>
                                                        Rank Range
                                                    </InputLabel>
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                    >
                                                        <Slider
                                                            value={[
                                                                minRange,
                                                                maxRange,
                                                            ]}
                                                            onChange={(
                                                                e,
                                                                newValue
                                                            ) =>
                                                                handleSliderChange(
                                                                    e,
                                                                    newValue
                                                                )
                                                            }
                                                            valueLabelDisplay="auto"
                                                            min={1}
                                                            max={totalEntry}
                                                            disableSwap
                                                        />
                                                        <MDInput
                                                            type="number"
                                                            value={maxRange}
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            style={{
                                                                marginLeft:
                                                                    "10px",
                                                            }}
                                                            inputProps={{
                                                                min: 1,
                                                                max: totalEntry,
                                                            }}
                                                        />
                                                    </Box>
                                                </MDBox>
                                                <MDBox mb={3}>
                                                    <InputLabel>
                                                        Ranks
                                                    </InputLabel>
                                                    <MDInput
                                                        type="text"
                                                        value={rank}
                                                        readOnly
                                                        fullWidth
                                                    />
                                                </MDBox>
                                                <MDBox mb={3}>
                                                    <InputLabel>
                                                        Winning Price
                                                    </InputLabel>
                                                    <MDInput
                                                        onInput={(e) =>
                                                            (e.target.value =
                                                                e.target.value.replace(
                                                                    /[^0-9]/g,
                                                                    ""
                                                                ))
                                                        }
                                                        type="number"
                                                        value={price}
                                                        onChange={
                                                            handlePriceChange
                                                        }
                                                        fullWidth
                                                    />
                                                </MDBox>
                                                <MDBox mb={3}>
                                                    <InputLabel>
                                                        Winning Percentage
                                                    </InputLabel>
                                                    <MDInput
                                                        type="text"
                                                        value={pricePercentage}
                                                        onInput={(e) =>
                                                            (e.target.value =
                                                                e.target.value.replace(
                                                                    /[^0-9]%/g,
                                                                    ""
                                                                ))
                                                        }
                                                        maxLength={2}
                                                        onChange={
                                                            handlePricePercentageChange
                                                        }
                                                        fullWidth
                                                    />
                                                </MDBox>
                                                <MDButton
                                                    type="submit"
                                                    variant="gradient"
                                                    color="info"
                                                >
                                                    Submit
                                                </MDButton>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </MDBox>
            {renderSuccessSB}
            {renderErrorSB}
        </DashboardLayout>
    );
};

export default Addwinningranges;
