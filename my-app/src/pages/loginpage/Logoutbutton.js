import React from "react";
import Userfront from "@userfront/react";

Userfront.init("rbv5jmqn");

const LogoutButton = Userfront.build({
  toolId: "bamlmrd"
});

export default function Logoutb() {
  return <LogoutButton />;
}
