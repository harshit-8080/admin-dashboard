const LoginPage = () => {
  return (
    <>
      <h1>Sign in</h1>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <button>Log in</button>
      <label htmlFor="rememer-me">Remember me </label>
      <input type="checkbox" id="rememer-me" />
      <a href="#">Forgot password</a>
    </>
  );
};

export default LoginPage;
