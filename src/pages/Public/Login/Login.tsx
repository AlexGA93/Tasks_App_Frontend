import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/states/auth";
import { AppDispatch, RootState } from "../../../redux/store";
import "../../../sass/main.scss";
import { LoginUserType, PublicPropsType } from "../../../types/types";


const Login = ({ handleToast }: PublicPropsType) => {
  const initialLoginValue: LoginUserType = { email: "", password: "" };

  const [validated, setValidated] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<LoginUserType>(initialLoginValue);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.authReducer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if(form.checkValidity() === false){
      event.stopPropagation();
    }else{
      // dispatch register action
      dispatch(loginUser(formValue))
      .then(() => {
        // toast success - update root state to true
        handleToast({value: true, toastFlag: 'success', toastMessage: 'User loged successfully!' });
        
      }).catch((err: Error) => {
        //toast error
        handleToast({value: true, toastFlag: 'danger', toastMessage: err.message });
        console.error(err.message);
      }).finally(() => {
        // navigate to dashboard
        navigate("/private/");
      });
    }
    // update local state
    setValidated(true);
  };

  return (
    <section className="login">
      <div className="login-container">
        {/* title */}
        <h1 className="login-container__title">LOGIN</h1>
        {/* form */}
        <Form
          className="login-container__form form"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-auto">
            <Form.Group as={Col} md="auto" controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={formValue.email}
                  onChange={(e) =>
                    setFormValue({ ...formValue, email: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a valid email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-auto">
            <Form.Group as={Col} md="auto" controlId="validationCustomPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">🔒</InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={formValue.password}
                  onChange={(e) =>
                    setFormValue({ ...formValue, password: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Password error detected.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading…" : "Submit Form"}
          </Button>
        </Form>

        <p className="login-container__redirect">
          Not an account?{" "}
          <span>
            <Link to={"/public/register"}>Register</Link> here
          </span>
        </p>
      </div>
    </section>
  );
};
export default Login;
