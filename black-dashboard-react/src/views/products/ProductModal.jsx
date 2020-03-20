import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import logo from '../../assets/img/mike.jpg';

export default class ProductModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        modal: false,
        product: this.props.selectedProduct
        };

        this.toggle = this.toggle.bind(this);
        this.choosingFile = this.choosingFile.bind(this);
        this.handleInputChanges = this.handleInputChanges.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selectedProduct !== state.selectedProduct) {
          return {
            product: props.selectedProduct
          };
        }
        return null;
    }

    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    handleInputChanges(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        var currentProduct = this.state.product
        if (name === "name") {
            currentProduct.itemName = value
        }
        if (name === "unit") {
            currentProduct.unit = value
        }
        if (name === "price") {
            currentProduct.price = value
        }
        if (name === "description") {
            currentProduct.description = value
        }
        this.setState({ product: currentProduct });
    }


    choosingFile() {}

    render() {

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
                <ModalHeader toggle={this.toggle}>Manage Product</ModalHeader>
                <ModalBody>
                    {
                        typeof this.props.selectedProduct !=='undefined' ?
                        <Row>
                        <Col md="2">
                            <img src={`http://localhost:8090/rosens/TotCafe/images/tot/${this.props.selectedProduct && (this.props.selectedProduct.imageUrl || logo)}`} width="100px" height="100px" alt="Product" />
                        </Col>

                        <Col md="10">
                            <Card>
                                <CardBody>
                                    <Form>
                                        <FormGroup row>
                                        <Label for="name" sm={2}>Name</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="name" id="name" placeholder="Product Name" onChange={this.handleInputChanges} value={this.state.product.itemName} />
                                        </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                        <Label for="unit" sm={2}>Unit</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="unit" id="unit" placeholder="2 Kg" onChange={this.handleInputChanges} value={this.state.product && this.state.product.unit} />
                                        </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                        <Label for="description" sm={2}>Description</Label>
                                        <Col sm={10}>
                                            <Input type="textarea" name="description" id="description" placeholder="Description" onChange={this.handleInputChanges} value={this.state.product && this.state.product.description} />
                                        </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Label for="price" sm={2}>Price</Label>
                                            <Col sm={10}>
                                                <Input type="number" name="price" id="price" placeholder="4000" onChange={this.handleInputChanges} value={this.state.product && this.state.product.price} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                        <Label for="file" sm={2}>Image</Label>
                                        <Col sm={10}>
                                            <Button color="primary">
                                                Choose File<Input type="file" name="file" id="image" accept="image/*" ref="Upload" onChange={this.choosingFile} />
                                            </Button>
                                        </Col>
                                        </FormGroup>

                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row> : null
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    <Button color="primary" onClick={() => this.props.updateSelectedProduct(this.state.product)}>Update</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}
