import React from "react";
import Userfront from "@userfront/react";

Userfront.init("rbv5jmqn");

const LoginForm = Userfront.build({
  toolId: "aladarr"
});

export default function Loggedin() {
  return(
  <div className='signupformstyle'>
  <LoginForm />
  </div>
  )
}
