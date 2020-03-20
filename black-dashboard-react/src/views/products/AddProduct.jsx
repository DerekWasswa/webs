import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import Chips, { Chip } from 'react-chips';
import logo from '../../assets/img/image-placeholder.png';
import { markets } from '../../variables/totconstants';
import { chipTheme } from './suggestions-css';
import theme from './suggestions-css';

export default class AddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            add_product_modal: false,
            product: {
                itemName: '',
                price: '',
                unit: '',
                description: ''
            },
            chips: ["Tot"],
            fileName: '',
            imgSrc: ''
        };

        this.toggle = this.toggle.bind(this);
        this.choosingFile = this.choosingFile.bind(this);
        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.onMarketChange = this.onMarketChange.bind(this);
        this.addProductTrigger = this.addProductTrigger.bind(this);
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
            add_product_modal: !prevState.add_product_modal
        }));
    }

    addProductTrigger(e) {
        e.preventDefault()
        let product = this.state.product
        this.props.addProduct(product)
        const emptyProduct = { itemName: '', price: '', unit: '', description: '' }
        this.setState({ product: emptyProduct, fileName: '', chips: ["Tot"] });
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

    choosingFile(e) {
        var currentProduct = this.state.product
        currentProduct.imageUrl = e.target.files[0].name
        this.setState({ fileName: e.target.files[0].name, product: currentProduct });
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result]
            })
        }.bind(this);

    }

    onMarketChange = chips => {
        var currentProduct = this.state.product
        currentProduct.markets = chips
        this.setState({ chips });
        this.setState({ product: currentProduct });
    }

    render() {

        const { fileName } = this.state;
        let file = null;

        file = fileName
            ? ( <span>{fileName}</span>)
            : ( <span>No File Choosen</span> );

        return (
            <div>
                <Modal isOpen={this.state.add_product_modal} toggle={this.toggle} className={this.props.className} size="lg">
                <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="2">
                            <img src={(this.state.fileName === '') ? logo : this.state.imgSrc} width="100px" height="100px" alt="Product" />
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
                                        <Label for="image" sm={2}>Image</Label>
                                        <Col sm={10}>
                                            <Button color="primary">
                                                Choose File<Input type="file" name="file" id="image" accept="image/*" ref="file" onChange={(event) => this.choosingFile(event)} multiple={true} />
                                            </Button>
                                            <Label for="image" sm={6}>{file}</Label>
                                        </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Label for="markets" sm={2}>Markets</Label>
                                            <Col sm={10}>
                                                <Chips
                                                    theme={theme}
                                                    chipTheme={chipTheme}
                                                    placeholder="Type Market"
                                                    value={this.state.chips}
                                                    onChange={this.onMarketChange}
                                                    renderChip={value => <Chip>{value}</Chip>}
                                                    suggestions={markets}
                                                    fromSuggestionsOnly={true}
                                                />
                                            </Col>
                                        </FormGroup>

                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                    <Button color="primary" onClick={this.addProductTrigger}>Save</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}
