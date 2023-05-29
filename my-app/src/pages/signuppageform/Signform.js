import Userfront from "@userfront/react";


Userfront.init("rbv5jmqn");

const SignupForm = Userfront.build({
  toolId: "ramlmoa"
});

export default function Sign() {
  return(
  <div className='signupformstyle'>
    <SignupForm />
  </div>
  )
};