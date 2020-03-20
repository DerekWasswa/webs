import React from 'react';
import { Modal, ModalHeader, ModalBody, Table, Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, Button} from 'reactstrap';


export default class OrderModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeTab: "1",
      popoverOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.togglePopOver = this.togglePopOver.bind(this);
    this.getDateFromTimestamp = this.getDateFromTimestamp.bind(this)
    this.getActions = this.getActions.bind(this);
  }

  togglePopOver() {
    this.setState(prevState => ({
      modal: !prevState.popoverOpen
    }));
  }


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  tabToggle(tab) {
    this.setState(({
      activeTab: tab
    }));
  }

  getDateFromTimestamp(timestamp) {
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp)
  }

  getActions(orderId, owner) {
    if (this.props.selectedOrder && this.props.selectedOrder.status && (this.props.selectedOrder.status.toLowerCase() === "served")) {
      return <Button color="primary" onClick={() => this.props.serveOrder(orderId, owner, "Delivered")}>Delivered</Button>
    } else if (this.props.selectedOrder && this.props.selectedOrder.status && (this.props.selectedOrder.status.toLowerCase() === "rejected")) {
      return <Button color="primary" onClick={() => this.props.serveOrder(orderId, owner, "Recall")}>Recall</Button>
    } else if (this.props.selectedOrder && this.props.selectedOrder.status && (this.props.selectedOrder.status.toLowerCase() === "not served")) {
      return <div><Button color="primary" onClick={() => this.props.serveOrder(orderId, owner, "Served")}>Serve Order</Button><Button color="primary" onClick={() => this.props.serveOrder(orderId, owner, "Cancelled")}>Reject Order</Button></div>
    }
  }

  render() {

    return (
        <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
                <ModalHeader toggle={this.toggle}>Order</ModalHeader>
                <ModalBody>
                    <div>
                        <p><strong>OrderID:</strong> {this.props.orderId && this.props.orderId}</p>
                        <p><strong>Contact:</strong> {this.props.selectedOrder && this.props.selectedOrder.contact}</p>
                        <p><strong>Address:</strong> {this.props.selectedOrder &&
                          this.props.selectedOrder.address && (this.props.selectedOrder.address.companyBuildingStreet + ", " + this.props.selectedOrder.address.location) }</p>
                        <p><strong>Payment:</strong> {this.props.selectedOrder && this.props.selectedOrder.payment}</p>
                        <p><strong>Status:</strong> {this.props.selectedOrder && this.props.selectedOrder.status}</p>

                        <p><strong>Total:</strong> {this.props.selectedOrder && Number(this.props.selectedOrder.total).toLocaleString("en-US", {style:"currency", currency:"UGX"})}</p>
                        <p><strong>Order Date:</strong> {this.props.selectedOrder && this.getDateFromTimestamp(this.props.selectedOrder.timestamp)}</p>
                    </div>


                    <div>
                      <br />
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h4">Order Products</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th>Product</th>
                                <th>Market</th>
                                <th>Units</th>
                              </tr>
                            </thead>
                            <tbody>

                              {
                                this.props.selectedOrder && this.props.selectedOrder.products && this.props.selectedOrder.products.map((product, index) =>
                                  <tr key={index}>
                                    <td>{product.product.itemName + " (" + product.product.unit + ")"}</td>
                                    <td>Tot</td>
                                    <td>{product.quantity}</td>
                                  </tr>
                                )
                            }
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>

                      <Row>
                      <Col md="12">
                        {this.getActions((this.props.orderId && this.props.orderId), (this.props.owner && this.props.owner))}
                        </Col>
                      </Row>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
  }
}
