import React, { Component } from "react";
import "./App.css";


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rollno: null,
      firstName: null,
      lastName: null,
      formErrors: {
        rollno: "",
        firstName: "",
        lastName: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Roll No.: ${this.state.rollno}
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "rollno":
        formErrors.rollno =
          value.length < 2 ? "minimum 2 integer digits required" : "";
        break;
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Student Form</h1>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="rollno">
              <label htmlFor="rollno">Roll No.</label>
              <input
                className={formErrors.rollno.length > 0 ? "error" : null}
                placeholder="rollno"
                type="number"
                name="rollno"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.rollno.length > 0 && (
                <span className="errorMessage">{formErrors.rollno}</span>
              )}
            </div>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="submitDetails">
              <button type="submit">Submit Details</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
