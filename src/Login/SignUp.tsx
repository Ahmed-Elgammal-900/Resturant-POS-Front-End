import { useState } from "react";
import { useAuth } from "../Utils/Auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [formInfo, setInfo] = useState({ email: "", password: "", user: "" });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const { SignUp, massege, setMassege } = useAuth();

  const onMassegeClick = (e: any) => {
    e.preventDefault();
    setMassege("");
  };
  return (
    <form onSubmit={(e) => SignUp(e, formInfo)}>
      <div className="form-grouper">
        <h1>Get Started</h1>
        <p>
          Already have account? <Link to="/Login/SignIn">Sign in</Link>
        </p>
        <p
          style={{ display: massege ? "flex" : "none" }}
          className="massege-box"
        >
          {massege}{" "}
          <button onClick={onMassegeClick} className="delete">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
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
        <label htmlFor="job" style={{marginBottom: '10px'}}>Job</label>
        <select name="user" id="job" onChange={onChange} defaultValue="">
          <option value="" disabled>Select Job</option>
          <option value="cashier">cashier</option>
          <option value="chief">chief</option>
          <option value="manager">manager</option>
        </select>
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
