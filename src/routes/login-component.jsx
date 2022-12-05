import { useState } from "react";
import { login } from "../utils/public-api";
import { PropTypes } from "prop-types";
export const Login = ({ loginSuccess }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (name, value) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmitHandler = async () => {
    const { error, data } = await login(userData);
    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="email"
          onChange={(e) => {
            onChangeHandler(e.target.name, e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          placeholder="password"
          autoComplete="current-password"
          onChange={(e) => {
            onChangeHandler(e.target.name, e.target.value);
          }}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};
