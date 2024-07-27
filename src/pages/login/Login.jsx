import React, { memo, useEffect, useState } from "react";
import "./login.scss";
import logo from "../../assets/header/logo.svg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../context/slices/loginSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [password, setPassword] = useState("12345678");
  let [userName, setUserName] = useState("john32");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin.value);

  useEffect(() => {
    if (isLogin) {
      navigate("/admin/productManage");
    }
  }, [isLogin]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password == "12345678" && userName == "john32") {
      dispatch(login(true));
      navigate("/admin/productManage");
      toast.success("Login successfully");
    } else {
      toast.error("Invalid username or password");
    }
  };
  return (
    <div className="huge__container login">
      <div className="login__left">
        <NavLink to={'/'}>
          <img width={200} className="login__left__logo" src={logo} alt="" />
        </NavLink>
        <img
          className="login__left__main-img"
          src="https://s3-alpha-sig.figma.com/img/2c01/ae8d/ce147d8554c2cda7530244569e9d8515?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I15Mt~2KdaFfGc2OOklZYgtD8uMEFVxtLngiQwJ~HXX~~NhC~TKw8Q4LZao5lL872zuDlT76YHqx19u9XFP8WfLDuIx8le9mvqrQp30-0Ia2UzR9ywVvsGoYeAHUES-Gf2kODpN4LfZ7fB0VnRZTetAtf46oemy8QVEGLeuCD2zmAD-G3zSjS-Hbnku6MGG1hKNnJXNVQbE-5QpKaKGy2vYyJBi-~cS4~kjqRWwLUVyPSX7X3Bwm6DzZ5fAfWR2fNMgvzjt0YrQJaYYIMGMA2agn4HXelbEZ1TUplSx7a~Uw4z5UkpIJ2SYbG51NR-wGhvwGQdkJ9AaQRw~cx-xczQ__"
          alt=""
        />
      </div>
      <div className="login__right">
        <h2>Sign In</h2>
        <p>Don’t have an accout yet? Sign Up</p>
        <form onSubmit={handleLogin} action="">
          <div className="password__input">
            <div className="input">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Your usernam or email address"
                id="username"
              />
            </div>
            <div className="input">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          <div className="remember">
            <label htmlFor="remember">
              <input id="remember" type="checkbox" />
              <h3>Remember me</h3>
            </label>
            <h3>Forget Password?</h3>
          </div>
          <button className="sign__in-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default memo(Login);
