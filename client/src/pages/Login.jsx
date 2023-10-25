import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_CHILD, ADD_ADULT } from '../utils/mutations';
import AuthService from '../utils/auth';

const Login = () => {
  const [loginFormState, setLoginFormState] = useState({ username: '', password: '' });
  const [childFormState, setChildFormState] = useState({ username: '', password: '' });
  const [adultFormState, setAdultFormState] = useState({ username: '', email: '', password: '' });

  const [login, { error: loginError, data: loginData }] = useMutation(LOGIN_USER);
  const [addChild, { error: childError, data: childData }] = useMutation(ADD_CHILD);
  const [addAdult, { error: adultError, data: adultData }] = useMutation(ADD_ADULT);

  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;

    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleChildFormChange = (event) => {
    const { name, value } = event.target;

    setChildFormState({
      ...childFormState,
      [name]: value,
    });
  };

  const handleAdultFormChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updating state for ${name} with value: ${value}`);

    setAdultFormState({
      ...adultFormState,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(loginFormState)
    try {
      const { data } = await login({
        variables: { ...loginFormState },
      });

      AuthService.login(data.login.token);

      // Redirect to the homepage after successful login
      window.location.assign('/');
    } catch (error) {
      console.error(error);
    }

    // Clear form values
    setLoginFormState({ username: '', password: '' });
  };

  const handleChildSignup = async (event) => {
    event.preventDefault();
    console.log("Inside handleChildSignup"); 
    console.log("childFormState: ", childFormState)
    try {
      console.log("Before addChild mutation");
      const { data, error } = await addChild({
        variables: { addChildInput: childFormState },
      });
      console.log(error)
      AuthService.login(data.addChild.token);

      // Redirect to the homepage after successful signup
      window.location.assign('/');
    } catch (error) {
      console.error(error);
    }

    // Clear form values
    setChildFormState({ username: '', password: '' });
  };

  const handleAdultSignup = async (event) => {
    event.preventDefault();
    console.log("Inside handleAdultSignup"); 
    console.log("adultFormState: ", adultFormState)

    try {
      console.log("Before addAdult mutation");
      const { data, error } = await addAdult({
        variables: { addAdultInput: adultFormState }, //!
      });
      console.log(error)
      AuthService.login(data.addAdult.token);

      // // Redirect to the homepage after successful signup
      // window.location.assign('/');
    } catch (error) {
      console.error(error);
    }

    // Clear form values
    setAdultFormState({ username: '', email: '', password: '' });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-title text-light p-2 login">Login</h4>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              console.log(handleLogin)
              <h5>Login</h5>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="text"
                value={loginFormState.username}
                onChange={handleLoginFormChange}
              />
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                value={loginFormState.password}
                onChange={handleLoginFormChange}
              />
              <button className="btn btn-block btn-info" type="submit">
                Login
              </button>
            </form>

            {loginError && (
              <div className="my-3 p-3 bg-danger text-white">{loginError.message}</div>
            )}

            <form onSubmit={handleChildSignup}>
              <h5>Sign Up as Child</h5>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="text"
                value={childFormState.username}
                onChange={handleChildFormChange}
              />
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                value={childFormState.password}
                onChange={handleChildFormChange}
              />
              <button className="btn btn-block btn-info" type="submit">
                Sign Up as Child
              </button>
            </form>

            {childError && (
              <div className="my-3 p-3 bg-danger text-white">{childError.message}</div>
            )}

            <form onSubmit={handleAdultSignup}>
              <h5>Sign Up as Parent</h5>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="text"
                value={adultFormState.username}
                onChange={handleAdultFormChange}
              />
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                value={adultFormState.email}
                onChange={handleAdultFormChange}
              />
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                value={adultFormState.password}
                onChange={handleAdultFormChange}
              />
              <button className="btn btn-block btn-info" type="submit">
                Sign Up as Parent
              </button>
            </form>

            {adultError && (
              <div className="my-3 p-3 bg-danger text-white">{adultError.message}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
