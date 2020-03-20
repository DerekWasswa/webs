import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Badge, CardTitle, Table
} from "reactstrap";
import '../assets/css/products.css';
import { getAllOrders, serveUserOrder } from "../redux/actionCreators/orders";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loader/LoadingSpinner';
import OrderModal from '../views/orders/OrderModal';
import {getCurrentDate} from '../variables/mdate';


class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        type: "",
        products: {},
        orders: {},
        allOrders: {},
        filtered: {},
        dropdownOpen: false,
        served: false,
        pending: true,
        rejected: false,
        summary: false,
        approved: false,
        cancelled: false,
        delivered: false,
        selectedOrder: {},
        orderId: null,
        owner: null
    }

    this.getDateFromTimestamp = this.getDateFromTimestamp.bind(this);
    this.getOrderStatusBadge = this.getOrderStatusBadge.bind(this);
    this.openOrder = this.openOrder.bind(this);
    this.getCategoryOrders = this.getCategoryOrders.bind(this);
    this.showOrders = this.showOrders.bind(this);
    this.serveOrder = this.serveOrder.bind(this);
    this.deliverOrder = this.deliverOrder.bind(this);
    this.recallOrder = this.recallOrder.bind(this);
  }

  componentDidMount(){
    window.scroll(0, 0)
    this.props.getAllOrders()
  }

  componentWillReceiveProps(props) {
    this.setState({orders: props.orders, allOrders: props.orders, filtered: props.orders, loading: props.loading})
  }

  getCategoryOrders(category) {
      const orders = this.state.orders && Object.keys(this.state.orders).map(key =>
        Object.keys(this.state.orders[key]).map((index) =>
          ((this.state.orders[key][index].status).toLowerCase() === category.toLowerCase()) ?
            <tr key={index} onClick={() => this.openOrder(this.state.orders[key][index], index)}>
                <td>
                    <div className="media">
                    <Badge color="secondary">{`+${this.state.orders[key][index].products && this.state.orders[key][index].products.length}`}</Badge>
                        <div className="d-flex">
                        <img src={`http://localhost:8090/rosens/TotCafe/images/tot/${this.state.orders[key][index].products && this.state.orders[key][index].products[0].product.imageUrl}`} width="60px" height="60px" alt="Order" />
                        </div>
                        <div className="media-body">
                        <Link to="/" title="View Order" className="view-order">{this.state.orders[key][index].productName}</Link>
                        </div>
                    </div>
                </td>
                <td>
                {index}
                </td>

                <td>
                {this.getDateFromTimestamp(this.state.orders[key][index].timestamp)}
                </td>
                <td>
                    {Number(this.state.orders[key][index].total).toLocaleString("en-US", {style:"currency", currency:"UGX"})}
                </td>
                <td>
                {this.getOrderStatusBadge(this.state.orders[key][index].status)}
                </td>
            </tr> : null
        )
    );

    return orders;
  }

  showOrders() {
    var category = ""
    if (this.state.pending) {
      category = "Not Served";
    } else if (this.state.cancelled) {
      category = "Cancelled";
    } else if (this.state.served) {
      category = "Served";
    } else if (this.state.delivered) {
      category = "Delivered";
    }
    return category;
  }

  switchCategory(e, category) {
    e.preventDefault();
    if (category === "pending") {
        this.setState({ pending: true, cancelled: false, delivered: false, served: false, summary: false, type: "pending" }, () => {this.getCategoryOrders("Not Served")})
    } else if (category === "cancelled") {
      this.setState({ pending: false, cancelled: true, delivered: false, served: false, summary: false, type: "cancelled" }, () => {this.getCategoryOrders("Not Served")})
    } else if (category === "delivered") {
      this.setState({ pending: false, cancelled: false, delivered: true, served: false, summary: false, type: "delivered" }, () => {this.getCategoryOrders("Not Served")})
    } else if (category === "served") {
      this.setState({ pending: false, cancelled: false, delivered: false, served: true, summary: false, type: "served" }, () => {this.getCategoryOrders("Served")})
    } else if (category === "summary") {
      this.setState({ pending: false, cancelled: false, delivered: false, served: false, summary: true, type: "summary" })
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
    if (status === "SERVED") {
      return <Badge color="success" className="order-status">{status}</Badge>
    } else if (status === "REJECTED") {
      return <Badge color="info" className="order-status">{status}</Badge>
    } else if (status === "CANCELLED") {
      return <Badge color="danger" className="order-status">{status}</Badge>
    }  else if (status === "DELIVERED") {
      return <Badge color="success" className="order-status">{status}</Badge>
    } else {
      return <Badge color="primary" className="order-status">{status}</Badge>
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

  render() {

    const { loading } = this.state;

    const orders = this.state.orders && Object.keys(this.state.orders).map(key =>
        Object.keys(this.state.orders[key]).map((index) =>
          (this.state.orders[key][index].status === this.showOrders()) ?
            <tr key={index} onClick={() => this.openOrder(this.state.orders[key][index], index, key)}>
                <td>
                    <div className="media">
                    <Badge color="secondary">{`+${this.state.orders[key][index].products && this.state.orders[key][index].products.length}`}</Badge>
                        <div className="d-flex">
                        <img src={`http://localhost:8090/rosens/TotCafe/images/tot/${this.state.orders[key][index].products && this.state.orders[key][index].products[0].product.imageUrl}`} width="60px" height="60px" alt="Order" />
                        </div>
                        <div className="media-body">
                        <Link to="/" title="View Order" className="view-order">{this.state.orders[key][index].productName}</Link>
                        </div>
                    </div>
                </td>
                <td>
                {index}
                </td>

                <td>
                {this.getDateFromTimestamp(this.state.orders[key][index].timestamp)}
                </td>
                <td>
                    {Number(this.state.orders[key][index].total).toLocaleString("en-US", {style:"currency", currency:"UGX"})}
                </td>
                <td>
                {this.getOrderStatusBadge(this.state.orders[key][index].status)}
                </td>
            </tr> : null
        )
    );

    return (

        <div className="content">

            <OrderModal selectedOrder={this.state.selectedOrder} orderId={this.state.orderId} owner={this.state.owner} serveOrder={this.serveOrder} ref={(modal) => { this._modal = modal; }} />

            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                    <h5 className="title">Manage Orders</h5>
                    <p className="category">
                        Orders are enlisted by category
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
                            <p className="categories">PENDING</p>
                        </div>
                        </Col>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "served")}
                        >
                        <div className={`${this.state.served ? 'order-type type order_active' : 'order-type'}`}>
                            <p>SERVED</p>
                        </div>
                        </Col>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "cancelled")}
                        >
                        <div className={`${this.state.cancelled ? 'order-type type order_active' : 'order-type'}`}>
                            <p>CANCELLED</p>
                        </div>
                        </Col>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "delivered")}
                        >
                        <div className={`${this.state.delivered ? 'order-type type order_active' : 'order-type'}`}>
                            <p>DELIVERED</p>
                        </div>
                        </Col>
                        <Col
                        className="font-icon-list col-xs-6 col-xs-6"
                        lg="2"
                        md="3"
                        sm="4"
                        onClick={(e) => this.switchCategory(e, "summary")}
                        >
                        <div className={`${this.state.summary ? 'order-type type order_active' : 'order-type'}`}>
                            <p>SUMMARY</p>
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
                            <CardTitle tag="h4">Orders</CardTitle>
                            <p className="category">
                              {getCurrentDate()}
                            </p>
                            </CardHeader>
                            <CardBody>
                            {
                              this.state.summary ?
                              <Table className="tablesorter" responsive>
                              <thead className="text-primary">
                                <tr>
                                  <th>Served</th>
                                  <th>Delivered</th>
                                  <th>Rejected</th>
                                  <th className="text-center">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>230</td>
                                  <td>210</td>
                                  <td>13</td>
                                  <td className="text-center">244</td>
                                </tr>
                              </tbody>
                            </Table> :
                              <Table className="tablesorter" responsive>
                                  <thead className="text-primary">
                                  <tr>
                                      <th>Product(s)</th>
                                      <th>OrderID</th>
                                      <th>Date</th>
                                      <th className="text-center">Total (UGX)</th>
                                      <th>Status</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      {
                                        orders
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

Orders.propTypes = {
    getAllOrders: PropTypes.func.isRequired,
    serveUserOrder: PropTypes.func.isRequired,
    orders: PropTypes.object,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    orders: state.ordersReducers.orders,
    loading: state.ordersReducers.loading
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllOrders, serveUserOrder }
  )(Orders)
);
