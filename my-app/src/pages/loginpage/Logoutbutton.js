import React from "react";
import Userfront from "@userfront/react";

Userfront.init("rbv5jmqn");

export default function Logoutb() {
  const handleLogout = () => {
    Userfront.logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

