import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Badge, CardTitle, Table
} from "reactstrap";
import '../assets/css/products.css';
import { getAllOrders, serveUserOrder, getAllSubscriptions, updateSubscription, getAllReturns, updateReturns} from "../redux/actionCreators/orders";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loader/LoadingSpinner';
import {getCurrentDate} from '../variables/mdate';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
      backgroundColor: "#fafdff",
      color: "#5c6bc0 !important",
    },
  });

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, selectedReturnID, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleHandleReturn = () => {
        onClose(selectedValue);
        props.triggerHandleReturn()
    }

    return (
      <Dialog fullWidth={true} maxWidth='xs' onClose={handleClose} aria-labelledby="subscriptions_dialog" open={open}>
      <DialogTitle id="alert-dialog-title" ><span className={classes.title}>Customer Returns</span></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {`Order ID (${selectedReturnID})`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleHandleReturn} color="primary">
          Handled
        </Button>
      </DialogActions>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    triggerApproveSubscription: PropTypes.func.isRequired,
    selectedReturnID: PropTypes.string.isRequired,
    selectedValue: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
  };



class Returns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        type: "",
        products: {},
        returns: {},
        subscriptions: {},
        allOrders: {},
        filtered: {},
        dropdownOpen: false,
        served: false,
        pending: true,
        rejected: false,
        summary: false,
        handled: false,
        paused: false,
        unsubscribed: false,
        selectedOrder: {},
        orderId: null,
        owner: '',
        selectedSubscriptionProducts: [],
        selectedReturnID: "",
        open: false,
        selectedValue: '',
    }

    this.getDateFromTimestamp = this.getDateFromTimestamp.bind(this);
    this.getOrderStatusBadge = this.getOrderStatusBadge.bind(this);
    this.openOrder = this.openOrder.bind(this);
    this.getCategoryReturns = this.getCategoryReturns.bind(this);
    this.showReturns = this.showReturns.bind(this);
    this.getUnsubscribedOrders = this.getUnsubscribedOrders.bind(this);
    this.performSubscriptionAction = this.performSubscriptionAction.bind(this);
    this.triggerHandleReturn = this.triggerHandleReturn.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    window.scroll(0, 0)
    this.props.getAllReturns()
  }

  componentWillReceiveProps(props) {
    this.setState({returns: props.returns, allOrders: props.returns, filtered: props.returns, loading: props.loading})
  }

  getUnsubscribedOrders(){
    const subscriptions = this.state.subscriptions && Object.keys(this.state.subscriptions).map(key =>
        Object.keys(this.state.subscriptions[key]).map((index) =>
          (!(this.state.subscriptions[key][index].active)) ?
            <tr key={index} onClick={() => this.performSubscriptionAction(index, this.state.subscriptions[key][index].products, key)}>
                <td>
                    <div className="media">
                    <Badge color="secondary">{`+${this.state.subscriptions[key][index].products && this.state.subscriptions[key][index].products.length}`}</Badge>
                        <div className="d-flex">
                        <img src={`http://localhost:8090/rosens/TotCafe/images/tot/${this.state.subscriptions[key][index].products && this.state.subscriptions[key][index].products[0].imageUrl}`} width="60px" height="60px" alt="Order" />
                        </div>
                        <div className="media-body">
                        <Link to="/" title="View Order" className="view-order">{this.state.subscriptions[key][index].productName}</Link>
                        </div>
                    </div>
                </td>
                <td>
                {index}
                </td>

                <td>
                {this.getDateFromTimestamp(this.state.subscriptions[key][index].timestamp)}
                </td>
                <td>
                    {this.state.subscriptions[key][index].type}
                </td>
                <td>
                {this.getOrderStatusBadge(this.state.subscriptions[key][index].status)}
                </td>
            </tr> : null
        )
    );

    return subscriptions;
  }

  getCategoryReturns(category) {
      const returns = this.state.returns && Object.keys(this.state.returns).map(key =>
        Object.keys(this.state.returns[key]).map((index) =>
          ((this.state.returns[key][index].status).toLowerCase() === category.toLowerCase()) ?
            <tr key={index} onClick={() => this.performSubscriptionAction(index, key)}>
                <td>
                {index}
                </td>
                <td>
                    {this.state.returns[key][index].reason}
                </td>
                <td>
                    {this.state.returns[key][index].products.join(', ')}
                </td>
                <td>
                {this.getDateFromTimestamp(this.state.returns[key][index].timestamp)}
                </td>
            </tr> : null
        )
    );

    return returns;
  }

  showReturns() {
    var category = ""
    if (this.state.pending) {
      category = "Pending";
    } else if (this.state.handled) {
      category = "Handled";
    }
    return category;
  }

  switchCategory(e, category) {
    e.preventDefault();
    if (category === "pending") {
        this.setState({ pending: true, handled: false, type: "pending" }, () => {this.getCategoryReturns("Pending")})
    } else if (category === "handled") {
      this.setState({ pending: false, handled: true, type: "paused" }, () => {this.getCategoryReturns("Handled")})
    }
  }

  openOrder(item, orderId, owner) {
    this.setState({ selectedOrder: item, orderId: orderId, owner: owner }, () => {
      this._modal.toggle()
    })
 }

  getDateFromTimestamp(timestamp) {
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp)
  }

  getOrderStatusBadge(status) {
    if (status === "Pending") {
      return <Badge color="secondary" className="order-status">{status.toUpperCase()}</Badge>
    } else if (status === "Paused") {
      return <Badge color="info" className="order-status">{status.toUpperCase()}</Badge>
    } else if (status === "Unsubscribed") {
      return <Badge color="danger" className="order-status">{status.toUpperCase()}</Badge>
    }  else if (status === "Approved") {
      return <Badge color="primary" className="order-status">{status.toUpperCase()}</Badge>
    } else {
      return <Badge color="primary" className="order-status">{status.toUpperCase()}</Badge>
    }
  }

  performSubscriptionAction(key, owner) {
    this.setState({open: true, selectedReturnID: key, owner: owner})
  }

  triggerHandleReturn() {
    let data = {id: this.state.selectedReturnID, status: "Handled", owner: this.state.owner}
    this.props.updateReturns(JSON.stringify(data))
  }

  handleClose = (value) => {
    this.setState({open: false, selectedValue: value})
  }

  render() {
    const { loading } = this.state;

    const returns = this.state.returns && Object.keys(this.state.returns).map(key =>
        Object.keys(this.state.returns[key]).map((index) =>
        ((this.state.returns[key][index].status).toLowerCase() === this.showReturns().toLowerCase()) ?
            <tr key={index} onClick={() => this.performSubscriptionAction(index, key)}>
                <td>
                {index}
                </td>

                <td>
                    {this.state.returns[key][index].reason}
                </td>
                <td>
                    {this.state.returns[key][index].products.join(', ')}
                </td>
                <td>
                {this.getDateFromTimestamp(this.state.returns[key][index].timestamp)}
                </td>
            </tr> : null
        )
    );

    console.log(returns)


    return (

        <div className="content">

            <SimpleDialog open={this.state.open} selectedValue={this.state.selectedValue} onClose={this.handleClose} triggerHandleReturn={this.triggerHandleReturn} selectedReturnID={this.state.selectedReturnID}  />

            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                    <h5 className="title">Manage Customer Returns</h5>
                    <p className="category">
                        Returns are enlisted by category
                    </p>
                    </CardHeader>
                    <CardBody className="all-icons">

                    <Row>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "pending")}
                        >
                        <div className={`${this.state.pending ? 'order-type type order_active' : 'order-type'}`}>
                            <p className="categories">Pending</p>
                        </div>
                        </Col>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "handled")}
                        >
                        <div className={`${this.state.handled ? 'order-type type order_active' : 'order-type'}`}>
                            <p>Handled</p>
                        </div>
                        </Col>

                    </Row>
                    </CardBody>
                </Card>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    {
                        loading
                        ?
                        <div><LoadingSpinner loader={"loaderShoppingCart"} /></div>
                        :
                        <Card>
                            <CardHeader>
                            <CardTitle tag="h4">Customer Order Returns</CardTitle>
                            <p className="category">
                                {getCurrentDate()}
                            </p>
                            </CardHeader>
                            <CardBody>
                            {
                              this.state.summary ?
                              <div className="tablesorter" responsive>
                                <h4>No Subscriptions</h4>
                              </div> :
                              <Table className="tablesorter" responsive>
                                  <thead className="text-primary">
                                  <tr>
                                      <th scope="col" width="20%">OrderID</th>
                                      <th scope="col" width="40%">Reason</th>
                                      <th scope="col" width="30%">Products</th>
                                      <th scope="col" width="10%">Date</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      {
                                        returns
                                      }
                                  </tbody>
                              </Table>
                            }
                            </CardBody>
                        </Card>
                    }
                </Col>
            </Row>

        </div>

    );
  }
}

Returns.propTypes = {
    getAllOrders: PropTypes.func.isRequired,
    serveUserOrder: PropTypes.func.isRequired,
    getAllSubscriptions: PropTypes.func.isRequired,
    updateSubscription: PropTypes.func.isRequired,
    updateReturns: PropTypes.func.isRequired,
    getAllReturns: PropTypes.func.isRequired,
    returns: PropTypes.object,
    subscriptions: PropTypes.object,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    returns: state.ordersReducers.returns,
    subscriptions: state.ordersReducers.subscriptions,
    loading: state.ordersReducers.loading
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllOrders, serveUserOrder, getAllSubscriptions, updateSubscription, getAllReturns, updateReturns }
  )(Returns)
);
