import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Badge, CardTitle, Table
} from "reactstrap";
import '../assets/css/products.css';
import { getAllOrders, serveUserOrder, getAllSubscriptions, updateSubscription} from "../redux/actionCreators/orders";
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
    const { onClose, selectedValue, selectedSubscriptionID, selectedSubscriptionProducts, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleApproveSubscription = () => {
        onClose(selectedValue);
        props.triggerApproveSubscription()
    }

    return (
      <Dialog fullWidth={true} maxWidth='xs' onClose={handleClose} aria-labelledby="subscriptions_dialog" open={open}>
      <DialogTitle id="alert-dialog-title" ><span className={classes.title}>Subscription</span></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {`Order ID (${selectedSubscriptionID})`}
            <br />
            {`Products (${selectedSubscriptionProducts.map((element) => element.itemName).join(", ")})`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleApproveSubscription} color="primary">
          Approve
        </Button>
      </DialogActions>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    triggerApproveSubscription: PropTypes.func.isRequired,
    selectedSubscriptionID: PropTypes.string.isRequired,
    selectedSubscriptionProducts: PropTypes.array.isRequired,
    selectedValue: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
  };



class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        type: "",
        products: {},
        orders: {},
        subscriptions: {},
        allOrders: {},
        filtered: {},
        dropdownOpen: false,
        served: false,
        pending: true,
        rejected: false,
        summary: false,
        approved: false,
        paused: false,
        unsubscribed: false,
        selectedOrder: {},
        orderId: null,
        owner: '',
        selectedSubscriptionProducts: [],
        selectedSubscriptionID: "",
        open: false,
        selectedValue: '',
    }

    this.getDateFromTimestamp = this.getDateFromTimestamp.bind(this);
    this.getOrderStatusBadge = this.getOrderStatusBadge.bind(this);
    this.openOrder = this.openOrder.bind(this);
    this.getCategoryOrders = this.getCategoryOrders.bind(this);
    this.showOrders = this.showOrders.bind(this);
    this.serveOrder = this.serveOrder.bind(this);
    this.deliverOrder = this.deliverOrder.bind(this);
    this.recallOrder = this.recallOrder.bind(this);
    this.getUnsubscribedOrders = this.getUnsubscribedOrders.bind(this);
    this.performSubscriptionAction = this.performSubscriptionAction.bind(this);
    this.triggerApproveSubscription = this.triggerApproveSubscription.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    window.scroll(0, 0)
    this.props.getAllSubscriptions()
  }

  componentWillReceiveProps(props) {
    this.setState({subscriptions: props.subscriptions, allOrders: props.subscriptions, filtered: props.subscriptions, loading: props.loading})
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

  getCategoryOrders(category) {
      const subscriptions = this.state.subscriptions && Object.keys(this.state.subscriptions).map(key =>
        Object.keys(this.state.subscriptions[key]).map((index) =>
          ((this.state.subscriptions[key][index].status).toLowerCase() === category.toLowerCase()) ?
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

  showOrders() {
    var category = ""
    if (this.state.pending) {
      category = "Pending";
    } else if (this.state.paused) {
      category = "Paused";
    } else if (this.state.unbsubscribed) {
      category = "Unsubscribed";
    } else if (this.state.approved) {
      category = "Approved";
    }
    return category;
  }

  switchCategory(e, category) {
    e.preventDefault();
    if (category === "pending") {
        this.setState({ pending: true, approved: false, paused: false, unsubscribed: false, type: "pending" }, () => {this.getCategoryOrders("Pending")})
    } else if (category === "paused") {
      this.setState({ pending: false, approved: false, paused: true, unsubscribed: false, type: "paused" }, () => {this.getCategoryOrders("Paused")})
    } else if (category === "approved") {
      this.setState({ pending: false, approved: true, paused: false, unsubscribed: false, type: "approved" }, () => {this.getCategoryOrders("Approved")})
    } else if (category === "unsubscribed") {
      this.setState({ pending: false, approved: false, paused: false, unsubscribed: true, type: "unsubscribed" }, () => {this.getUnsubscribedOrders()})
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

  serveOrder(orderId, owner, action) {
    let email = {
      to: "wasswadero@gmail.com",
      from: "derick.wasswa@andela.com",
      subject: "TotCafe Order",
      title: "Order has been Served",
      body: `Hello, Your Order ${orderId} for ${owner} has been served. Now awaits Delivery.`
    }
    let data = { action: action, id: orderId, owner: owner, email: email };
    this.props.serveUserOrder(data)
    this._modal.toggle()
  }

  deliverOrder() {

  }

  recallOrder() {

  }

  performSubscriptionAction(key, products, owner) {
    this.setState({open: true, selectedSubscriptionID: key, selectedSubscriptionProducts: products, owner: owner})
  }

  triggerApproveSubscription() {
    let data = {id: this.state.selectedSubscriptionID, status: "Approved", owner: this.state.owner}
    this.props.updateSubscription(JSON.stringify(data))
  }

  handleClose = (value) => {
    this.setState({open: false, selectedValue: value})
  }

  render() {

    const { loading } = this.state;

    const subscriptions = this.state.subscriptions && Object.keys(this.state.subscriptions).map(key =>
        Object.keys(this.state.subscriptions[key]).map((index) =>
          (this.state.subscriptions[key][index].status === this.showOrders()) ?
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

    return (

        <div className="content">

            <SimpleDialog open={this.state.open} selectedValue={this.state.selectedValue} onClose={this.handleClose} triggerApproveSubscription={this.triggerApproveSubscription} selectedSubscriptionID={this.state.selectedSubscriptionID} selectedSubscriptionProducts={this.state.selectedSubscriptionProducts}  />

            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                    <h5 className="title">Manage Subscriptions</h5>
                    <p className="category">
                        Subscriptions are enlisted by category
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
                        onClick={(e) => this.switchCategory(e, "approved")}
                        >
                        <div className={`${this.state.approved ? 'order-type type order_active' : 'order-type'}`}>
                            <p>Approved</p>
                        </div>
                        </Col>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "paused")}
                        >
                        <div className={`${this.state.paused ? 'order-type type order_active' : 'order-type'}`}>
                            <p>Paused</p>
                        </div>
                        </Col>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "unsubscribed")}
                        >
                        <div className={`${this.state.unsubscribed ? 'order-type type order_active' : 'order-type'}`}>
                            <p>Unsubscribed</p>
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
                            <CardTitle tag="h4">Subscriptions</CardTitle>
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
                                      <th>Product(s)</th>
                                      <th>OrderID</th>
                                      <th>Date</th>
                                      <th>Type</th>
                                      <th>Status</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      {
                                        subscriptions
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

Subscriptions.propTypes = {
    getAllOrders: PropTypes.func.isRequired,
    serveUserOrder: PropTypes.func.isRequired,
    getAllSubscriptions: PropTypes.func.isRequired,
    updateSubscription: PropTypes.func.isRequired,
    orders: PropTypes.object,
    subscriptions: PropTypes.object,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    orders: state.ordersReducers.orders,
    subscriptions: state.ordersReducers.subscriptions,
    loading: state.ordersReducers.loading
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllOrders, serveUserOrder, getAllSubscriptions, updateSubscription }
  )(Subscriptions)
);
