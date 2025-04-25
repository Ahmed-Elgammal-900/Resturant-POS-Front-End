import { useState } from "react";
import { useAuth } from "../Utils/Auth";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formInfo, setInfo] = useState({ email: "", password: "" });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const { handleAuth } = useAuth();
  return (
    <form onSubmit={(e) => handleAuth(e, formInfo)}>
      <div className="form-grouper">
        <h1>Get Started</h1>
        <p>
          Already have account? <Link to="/Login/SignIn">Sign in</Link>
        </p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={onChange}
          value={formInfo.email}
          formNoValidate
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={onChange}
          value={formInfo.password}
          formNoValidate
          autoComplete="off"
        />
        <button className="submit-button" type="submit">
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUp;
