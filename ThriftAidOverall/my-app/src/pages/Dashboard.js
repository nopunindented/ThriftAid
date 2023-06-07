import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:4000/auth/verify",
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );
          const { status, user } = response.data;
          if (status) {
            setUsername(user);
            toast.success(`Hello ${user}`, {
              position: "top-right",
            });
          } else {
            removeCookie("token");
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
          toast.error("Server Error");
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="Dashboard">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Dashboard;
