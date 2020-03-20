import React from "react";
import avatar from '../assets/img/default-avatar.png';
import { adminLogin, adminSession } from "../redux/actionCreators/authenticaton";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        code: '',
        auth: {
          user_id: "",
          logInStatus: false,
          user_name: "",
          totUserToken: "",
          number: "",
          email: "",
          admin: ""
        }
    }

    this.adminLogin =this.adminLogin.bind(this);
    this.inputChanges = this.inputChanges.bind(this);
  }

  componentDidMount() {
    this.props.adminSession()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({ auth: nextProps.auth });
    }
  }

  adminLogin(event) {
    let data = {name: this.state.name, code: this.state.code}
    this.props.adminLogin(data)
  }

  inputChanges(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  render() {
    return (

        <div className="content">
          <Row>
            <Col md="8" hidden={(localStorage.getItem("admin") === null || localStorage.getItem("admin") === '') ? false : true}>
              <Card>
                <CardHeader>
                  <h5 className="title">Authentication</h5>
                </CardHeader>
                <CardBody>
                  <Form>

                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            name='name'
                            placeholder="Navy Oswan"
                            onChange={this.inputChanges} value={this.state.name || ''}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Code</label>
                          <Input
                            name='code'
                            placeholder="*****"
                            onChange={this.inputChanges} value={this.state.code || ''}
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.adminLogin}>
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />

                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={avatar}
                      />
                      <h5 className="title">{localStorage.getItem("admin")}</h5>
                    </a>
                    <p className="description">******</p>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="instagram">
                      <i className="fab fa-instagram" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>

    );
  }
}

UserProfile.propTypes = {
  adminLogin: PropTypes.func.isRequired,
  adminSession: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.authenticationReducer.auth,
});

export default withRouter(
  connect(
    mapStateToProps,
    { adminLogin, adminSession }
  )(UserProfile)
);
