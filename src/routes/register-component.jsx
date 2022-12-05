import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/public-api";

export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
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
    const { error } = await register(userData);
    if (!error) {
      navigate("/");
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
          type="text"
          name="name"
          value={userData.name}
          placeholder="username"
          onChange={(e) => {
            onChangeHandler(e.target.name, e.target.value);
          }}
        />
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
