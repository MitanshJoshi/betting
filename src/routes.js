/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import Changepassword from "layouts/change-password";
import Grade from "layouts/grade";
import Addgrade from "layouts/grade/add-subcategory";
import Editgrade from "layouts/grade/edit-subcategory";
import Userlist from "layouts/user-list/index";
import Displaychat from "layouts/display-chat";
import Playerlist from "layouts/playerlist";
import Teamcreate from "layouts/teamlist";
import Leaguge from "layouts/league-detail";
import Matchdetail from "layouts/match-list";
import Teamplayer from "layouts/team-playere";
import Viewuser from "layouts/user-list/viewuser";
import Playerview from "layouts/playerlist/viewplayer";
import Editplayerlist from "layouts/playerlist/editplayerlist";
import Addplayerlist from "layouts/playerlist/addplayerlist";
import Viewteamlist from "layouts/teamlist/viewteamlist";
import Addteamlist from "layouts/teamlist/addteamlist";
import Editteamlist from "layouts/teamlist/editteamlist";
import Editleague from "layouts/league-detail/editleague";
import Addleague from "layouts/league-detail/addleague";
import Editteamplayer from "layouts/team-playere/editteampplayer";
import Addteamplayer from "layouts/team-playere/addteamplayer";
import Editmatch from "layouts/match-list/editmatch";
import Addmatch from "layouts/match-list/addmatch";
import Viewmatch from "layouts/match-list/viewmatch";
import Contests from "layouts/contests";
import Editcontects from "layouts/contests/editcontest";
import Addcontests from "layouts/contests/addcontest";
import Playerteamview from "layouts/team-playere/viewteamplyer";
import Conteststype from "layouts/contesttype";
import Addconteststype from "layouts/contesttype/addcontesttype";
import Editcontectstype from "layouts/contesttype/editcontesttype";
import Viewcontest from "layouts/contests/viewcontest";
import Winningprice from "layouts/winningprice";
import Editwinnigprice from "layouts/winningprice/editwinnigprice";
import Addwinnigprice from "layouts/winningprice/addwinnigprice";
import Winningpricerange from "layouts/winningpricerange";
import Addwinningrange from "layouts/winningpricerange/addwinningrange";
import Editwinnigrange from "layouts/winningpricerange/editwinnigrange";
import Addwinning from "layouts/contests/addwinning";
import Winningrange from "layouts/winning-range";
import Addwinningranges from "layouts/winning-range/addwinningrange";
import Viewwinning from "layouts/winning-range/viewwinnig";
import UserDetails from "layouts/user-list/user-details/userdetails";

const routes = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "User List",
        key: "userlist",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/userlist",
        component: <Userlist />,
    },
    {
        type: "collapse",
        name: "Player List",
        key: "player-list",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/player-list",
        component: <Playerlist />,
    },
    {
        type: "collapse",
        name: "Create Team",
        key: "team-create",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/team-create",
        component: <Teamcreate />,
    },
    {
        type: "collapse",
        name: "League List",
        key: "team-Leaguge",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/team-Leaguge",
        component: <Leaguge />,
    },
    {
        type: "collapse",
        name: "Team player",
        key: "team-player",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/team-player",
        component: <Teamplayer />,
    },
    {
        type: "collapse",
        name: "Create Match",
        key: "match-detail",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/match-detail",
        component: <Matchdetail />,
    },
    {
        type: "collapse",
        name: "Displaychat",
        key: "Displaychat",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/Displaychat",
        component: <Displaychat />,
    },
    // {
    //   type: "collapse",
    //   name: "Grade",
    //   key: "grade-list",
    //   icon: <Icon fontSize="small">people</Icon>,
    //   route: "/grade-list",
    //   component: <Grade />,
    // },
    {
        type: "collapse",
        name: "Contests List",
        key: "contest-list",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/contest-list",
        component: <Contests />,
    },
    {
        type: "collapse",
        name: "Contests Type",
        key: "contest-type",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/contest-type",
        component: <Conteststype />,
    },
    {
        type: "collapse",
        name: "Winning Price",
        key: "winning-price",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/winning-price",
        component: <Winningprice />,
    },
    // {
    //   type: "collapse",
    //   name: "Winning Pricerange",
    //   key: "winning-pricerange",
    //   icon: <Icon fontSize="small">people</Icon>,
    //   route: "/winning-pricerange",
    //   component: <Winningpricerange/>,
    // },
    {
        type: "collapse",
        name: "Winning Range",
        key: "winning-range",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/winning-range",
        component: <Winningrange />,
    },
    // {
    //   type: "collapse",
    //   name: "Employee",
    //   key: "employee",
    //   icon: <Icon fontSize="small">receipt_long</Icon>,
    //   route: "/employee-list",
    //   component: <Employee />,
    // },

    {
        type: "collapse",
        name: "Change Password",
        key: "change-password",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/change-password",
        component: <Changepassword />,
    },
    {
        type: "route",
        name: "Profile",
        key: "productdetail",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/userlist/view-user/:_id",
        component: <UserDetails />,
    },
    {
        type: "routes",
        name: "edit-team",
        key: "productdetail",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/View-user-details/:_id",
        component: <Viewuser />,
    },

    {
        type: "routes",
        name: "edit-team",
        key: "productdetail",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/Player-view/:_id",
        component: <Playerview />,
    },
    {
        type: "routes",
        name: "edit-team",
        key: "productdetail",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/edit-playerlist/:_id",
        component: <Editplayerlist />,
    },
    {
        type: "routes",
        name: "Addplayerlist",
        key: "Addplayerlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/add-playerlist",
        component: <Addplayerlist />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/view-teamlist/:_id",
        component: <Viewteamlist />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/add-teamlist",
        component: <Addteamlist />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/edit-teamlist/:_id",
        component: <Editteamlist />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/edit-league/:_id",
        component: <Editleague />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/add-league",
        component: <Addleague />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/edit-teamplayer/:_id",
        component: <Editteamplayer />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/add-teamplayer",
        component: <Addteamplayer />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/edit-match/:_id",
        component: <Editmatch />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/add-match",
        component: <Addmatch />,
    },
    {
        type: "routes",
        name: "Viewteamlist",
        key: "Viewteamlist",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/view-match/:_id",
        component: <Viewmatch />,
    },
    {
        type: "routes",
        name: "viewcontest",
        key: "viewcontest",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/view-contest/:_id",
        component: <Viewcontest />,
    },
    {
        type: "collapse",
        name: "Sign In",
        key: "sign-in",
        icon: <Icon fontSize="small">login</Icon>,
        route: "/authentication/sign-in",
        component: <SignIn />,
    },

    {
        type: "routes",
        name: "Add Grade",
        key: "add-grade",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/add-grade",
        component: <Addgrade />,
    },
    {
        type: "routes",
        name: "Add contest",
        key: "add-contest",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/add-contests",
        component: <Addcontests />,
    },
    {
        type: "routes",
        name: "Add contesttype",
        key: "add-contesttype",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/add-conteststype",
        component: <Addconteststype />,
    },
    {
        type: "routes",
        name: "add-winningprice",
        key: "add-winningprice",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/add-winningprice",
        component: <Addwinnigprice />,
    },
    {
        type: "routes",
        name: "add-winningrange",
        key: "add-winningrange",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/add-winningrange",
        component: <Addwinningrange />,
    },
    {
        type: "routes",
        name: "Addwinningranges",
        key: "Addwinningranges",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/addwinningranges",
        component: <Addwinningranges />,
    },
    {
        type: "routes",
        name: "Edit Grade",
        key: "edit-grade",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/edit-grade/:_id",
        component: <Editgrade />,
    },
    {
        type: "routes",
        name: "Edit contest",
        key: "edit-contest",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/edit-contest/:_id",
        component: <Editcontects />,
    },
    {
        type: "routes",
        name: "Edit Grade",
        key: "edit-grade",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/edit-contecttype/:_id",
        component: <Editcontectstype />,
    },
    {
        type: "routes",
        name: "winningprice",
        key: "dit-winningprice",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/edit-winningprice/:_id",
        component: <Editwinnigprice />,
    },
    {
        type: "routes",
        name: "winning",
        key: "winningprice",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/add-winning",
        component: <Addwinning />,
    },
    {
        type: "routes",
        name: "edit-winningrange",
        key: "edit-winningrange",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/edit-winningrange/:_id",
        component: <Editwinnigrange />,
    },
    {
        type: "routes",
        name: "Playerteamview",
        key: "Playerteamview",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/playerteamview/:_id",
        component: <Playerteamview />,
    },
    {
        type: "routes",
        name: "viewwinning",
        key: "viewwinning",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/viewwinning/:_id",
        component: <Viewwinning />,
    },
];

export default routes;
