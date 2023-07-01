import { createContext, React, useContext, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import TableWisata from "views/admin/TableWisata.js";
import TableUsers from "views/admin/TableUsers.js";
import FormWisata from "components/Cards/FormWisata";
import CardTableTransaksi from "components/Cards/CardTableTransaksi";

export const ThemeContext = createContext({});

export default function Admin() {
  const history = useHistory();
  const [context, setContext] = useState({
    addWisata: false,
    dataWisata: [],
    editWisata: false,
    idWisata: "",
    dataTransaksi: [],
    dataTransaksiPaket: [],
    dataTransaksiWisata: [],
    dataTransaksiTravel: [],
    dataTransaksiHotel: [],
  });
  const login = localStorage.getItem("login");
  if (!login) {
    history.push("/auth/login");
  }
  return (
    <>
      <ThemeContext.Provider value={{ context, setContext }}>
        {/* {context.addWisata ? <FormWisata /> : ""} */}
        {context.addWisata && <FormWisata />}
        {context.editWisata && <FormWisata />}
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100 flex flex-col h-full">
          {/* <div className="relative md:ml-64 flex flex-col h-full bg-black"> */}
          <AdminNavbar />
          {/* Header */}
          {/* <HeaderStats /> */}
          <div className="px-4 md:px-10 mx-auto w-full m-24 h-auto">
            <Switch>
              <Route path="/admin/dashboard" exact component={Dashboard} />
              <Route path="/admin/maps" exact component={Maps} />
              <Route path="/admin/settings" exact component={Settings} />
              <Route path="/admin/users" exact component={TableUsers} />
              <Route
                path="/admin/wisataIndonesia"
                exact
                component={TableWisata}
              />
              <Route
                path="/admin/transaksi"
                exact
                component={CardTableTransaksi}
              />

              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
            <FooterAdmin />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
