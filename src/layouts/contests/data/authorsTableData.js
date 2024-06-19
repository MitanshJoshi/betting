import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { BASE_URL } from "BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AuthorsTableData(contest, leaguename, prize, entry, total,profite, max) {
  const [League, setLeague] = useState([]);

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
      setLeague(responseData.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    columns: [
      { Header: "contests_name", accessor: "contests_name", align: "left" },
      { Header: "league_name", accessor: "league_name", align: "left" },
      { Header: "prize_pool", accessor: "prize_pool", align: "left" },
      { Header: "total participant", accessor: "total_participant", align: "left" },
      { Header: "entry_fees", accessor: "entry_fees", align: "left" },
      { Header: "profit", accessor: "profit", align: "left" },
      { Header: "maxteam per user", accessor: "max_team_per_user", align: "left" },
      { Header: "time", accessor: "time", align: "left" },
      { Header: "edit", accessor: "action", align: "center" },
      { Header: "view", accessor: "view", align: "center" },
    ],

    rows: League.filter((item) =>
        item?.contestTypeData?.[0]?.contest_type.toLowerCase().includes(contest.toLowerCase()) &&
        item?.leagueData?.[0]?.league_name.toLowerCase().includes(leaguename.toLowerCase()) &&
        item?.profit.toString().toLowerCase().includes(profite.toLowerCase()) &&
        item?.price_pool.toString().includes(prize.toLowerCase()) &&
        item?.entry_fees.toString().includes(entry.toLowerCase()) &&
        item?.total_participant.toString().includes(total.toString()) &&
        item?.max_team_per_user.toString().includes(max.toString())
      )
      .map((e) => ({
        contests_name: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.contestTypeData?.[0]?.contest_type}
          </MDTypography>
        ),
        league_name: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.leagueData?.[0]?.league_name}
          </MDTypography>
        ),
        prize_pool: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.price_pool}
          </MDTypography>
        ),
        total_participant: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.total_participant}
          </MDTypography>
        ),
        entry_fees: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.entry_fees}
          </MDTypography>
        ),
        profit: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.profit}
          </MDTypography>
        ),
        time: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.date_time.slice(11, 16)}
          </MDTypography>
        ),
        max_team_per_user: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {e?.max_team_per_user}
          </MDTypography>
        ),
        view: (
          <MDTypography component="a" href={`/view-contest/${e._id}`} variant="caption" color="text" fontWeight="medium">
            view
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href={`/edit-contest/${e._id}`} variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      }))
  };
}
