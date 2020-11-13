import React, {useState} from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";

const initialFormValues = {
    username: '',
    password: ''
}

const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const {push} = useHistory();

  const handleChange = e => {
        const {name, value} = e.target;
        setFormValues({
          ...formValues, [name]: value
        })
    };
    const submit = (e) =>{
      e.preventDefault();
      
    }
    axios.post(`http://localhost:5000/api/login`, formValues)
    .then((req)=>{
      // console.log(req)
      localStorage.setItem("token", req.data.payload);
      push("/bubble-page")
    })
    .catch((err)=>{
      console.log(err)
    })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form onSubmit={submit}>
                <input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                />
                <input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                />
                <button>Log in</button>
        </form>
    </>
  );
};

export default Login;

