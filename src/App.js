import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { useFormik } from "formik";

function App() {
  const [value, ResetForm] = useState("");
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
    },

    onSubmit: async (values) => {
      try {
        await fetch("https://61c4cef8f1af4a0017d997ea.mockapi.io/users", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type": "application/json",
          },
        });
        alert("data saved");
        ResetForm("")
      } catch (error) {
        console.log(error);
      }
    },
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let items = await fetch(
          "https://61c4cef8f1af4a0017d997ea.mockapi.io/users"
        );
        let userdata = await items.json();
        setUsers(userdata);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="background">
        <div className="form">
          <form onSubmit={formik.handleSubmit}>
            <h1>Info</h1>
            <input
              type="text"
              placeholder="First Name"
              name="FirstName"
              class="form-control"
              onChange={formik.handleChange}
              value={formik.values.value}
              required
            ></input>
            <br />
            <input
              type="text"
              placeholder="Last Name"
              name="LastName"
              class="form-control"
              onChange={formik.handleChange}
              value={formik.values.value}
              required
            ></input>
            <br />
            <input
              type="Email"
              placeholder="Email"
              name="Email"
              class="form-control"
              onChange={formik.handleChange}
              value={formik.values.value}
              required
            ></input>
            <br />
            <input
              type="number"
              placeholder="Phone Number"
              name="PhoneNumber"
              class="form-control"
              onChange={formik.handleChange}
              value={formik.values.value}
              required
            ></input>
            <br />
            <button type="submit">Submit</button>
            <br />

            <button type="reset" onClick={() => ResetForm(() => "")}>
              Reset
            </button>
          </form>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.FirstName}</td>
                    <td>{user.Email}</td>
                    <td>{user.PhoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
