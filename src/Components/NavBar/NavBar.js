import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { MenuFoldOutlined, LeftOutlined } from "@ant-design/icons";
import { PersonIcon } from "@primer/octicons-react";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import { useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../../Config/Axios/Axios";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [truckDetails, setTruckDetails] = useState({});
  const [isError, setIsError] = useState(false);
  const [expenses, setExpenses] = useState({
    fuelExpenses: "Fuel Expenses",
    defExpenses: "Def Expenses",
    otherExpenses: "Other Expenses",
    totalExpenses: "Total Expenses",
    totalFuelExpenses: "Total Fuel Expenses",
    totalDefExpenses: "Total Def Expenses",
    totalOtherExpenses: "Total Other Expenses",
  });

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTruckDetails({});
    const locPath = loc.pathname.split("/")
    const truckId = locPath[1]==="calculateLoan"?locPath[2]:locPath[3];
    if (truckId) {
      Axios.get(
        `/api/v1/app/truck/getTruckById/${truckId}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          setTruckDetails(res.data);
        })
        .catch((err) => {
          setTruckDetails({});
          setIsError(true);
        });
    }
  }, [loc.pathname]);

  const showNavDrawer = () => {
    setNavOpen(true);
  };

  const showProfileDrawer = () => {
    setProfileOpen(true);
  };

  const registrationNo = truckDetails.registrationNo;

  return (
    <div className="mb-4">
      {(loc.pathname.startsWith("/expenseSummary/") || loc.pathname.startsWith("/calculateLoan/"))? (
        <Space className="p-4 bg-dark w-100 rounded-3 d-flex justify-content-between">
          <Button
            type="dark"
            className="p-2"
            style={{
              border: "1px solid white",
              borderRadius: "160px",
              height: "40px",
              width: "40px",
            }}
            onClick={() => navigate(-1)}
          >
            <LeftOutlined style={{ color: "white", fontSize: 18 }} />
          </Button>
          <div>
            <b className="text-white fw-800 fs-5">
              {registrationNo ? registrationNo : "All Trucks"} -{" "}
              {loc.pathname.split("/")[1]==="calculateLoan"?"Calculate Loan":expenses[loc.pathname.split("/")[2]]}
            </b>
          </div>
          <div></div>
        </Space>
      ) : (
        <Space className="p-4 bg-dark w-100 rounded-3 d-flex justify-content-between">
          <Button
            type="dark"
            className="p-2"
            style={{
              border: "1px solid white",
              borderRadius: "160px",
              height: "40px",
              width: "40px",
            }}
            onClick={showNavDrawer}
          >
            <MenuFoldOutlined style={{ color: "white", fontSize: 18 }} />
          </Button>
          <div>
            <b className="text-white fw-800 fs-5">Manage My Truck</b>
          </div>
          <Button
            type="dark"
            className="p-2"
            style={{
              border: "1px solid white",
              borderRadius: "160px",
              height: "40px",
              width: "40px",
            }}
            onClick={showProfileDrawer}
          >
            <PersonIcon fill={"white"} size={24} />
          </Button>
        </Space>
      )}

      <MenuDrawer navOpen={navOpen} setNavOpen={setNavOpen} />
      <ProfileDrawer
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
      />
    </div>
  );
};

export default NavBar;
