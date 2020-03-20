import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import '../assets/css/products.css';
import fruitsIcon from "assets/img/tot-logo.png";
import foodIcon from "assets/img/food.png";
import vegetablesIcon from "assets/img/vegetables.png";
import juiceIcon from "assets/img/juice.png";
import bitesIcon from "assets/img/bites.png";
import { getAllProducts, updateTotProduct, addProductItem } from "../redux/actionCreators/products";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loader/LoadingSpinner';
import ProductModal from '../views/products/ProductModal';
import AddProduct from '../views/products/AddProduct';
import swal from 'sweetalert';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        Fruits: true,
        Vegetables: false,
        Food: false,
        Juice: false,
        Bites: false,
        type: "",
        products: {},
        selectedProduct: {},
        productId: null
  }

  this.switchCategory =this.switchCategory.bind(this);
  this.updateSelectedProduct = this.updateSelectedProduct.bind(this);
  this.openProduct = this.openProduct.bind(this);
  this.getActiveCategory = this.getActiveCategory.bind(this);
  this.addProduct = this.addProduct.bind(this);
  this.addProductModal = this.addProductModal.bind(this);
}

componentDidMount(){
  window.scroll(0, 0)
  this.props.getAllProducts("Fruits");
  this.props.getAllProducts("Vegetables");
  this.props.getAllProducts("Food");
  this.props.getAllProducts("Juice");
  this.props.getAllProducts("Bites");
}

componentWillReceiveProps(props) {
  this.setState({products: props.fruits, type: "None", loading: props.loading});
}

switchCategory(e, category, data) {
  if (category === "Fruits") {
      this.setState({ Fruits: true, Vegetables: false, Juice: false, Food: false, Bites: false, All: false, products: data, type: "Fruits" })
  } else if (category === "Vegetables") {
      this.setState({ Fruits: false, Vegetables: true, Juice: false, Food: false, Bites: false, All: false, products: data, type: "Vegetables" })
  } else if (category === "Food") {
      this.setState({ Fruits: false, Juice: false, Food: true, Vegetables: false, Bites: false, All: false, products: data, type: "Food" })
  } else if (category === "Juice") {
      this.setState({ Juice: true, Vegetables: false, Fruits: false, Food: false, Bites: false, All: false, products: data, type: "Juice" })
  } else if (category === "Bites") {
      this.setState({ Bites: true, Juice: false, Vegetables: false, Fruits: false, Food: false, All: false, products: data, type: "Bites" })
  } else if (category === "All") {
      this.setState({ Fruits: false, Juice: false, Food: false, Vegetables: false, Bites: false, All: true, products: data, type: "All"})
  }
}

getActiveCategory() {
  var category = ""
  if (this.state.Fruits) {
    category = "Fruits";
  } else if (this.state.Vegetables) {
    category = "Vegetables";
  } else if (this.state.Juice) {
    category = "Juice";
  } else if (this.state.Bites) {
    category = "Bites";
  } else if (this.state.Food) {
    category = "Food";
  }
  return category;
}

updateSelectedProduct(product) {
  let data = { type: this.getActiveCategory(), id: this.state.productId, price: product.price, unit: product.unit, description: product.description, itemName: product.itemName, imageUrl: product.imageUrl };
  this.props.updateTotProduct(data)
  this._modal.toggle()
}

openProduct(item, productId) {
  this.setState({ selectedProduct: item, productId: productId }, () => {
    this._modal.toggle()
  })
}

addProduct(product) {
  let data = { type: this.getActiveCategory(), name: product.itemName, price: product.price, unit: product.unit, description: product.description, markets: product.markets, imageUrl: product.imageUrl };
  if (product.hasOwnProperty('itemName') && product.hasOwnProperty('price') && product.hasOwnProperty('description') && product.hasOwnProperty('imageUrl') && product.hasOwnProperty('unit') && product.hasOwnProperty('markets')) {
    this.props.addProductItem(data)
    this._add_product_modal.toggle()
  } else {
    swal("Missing Data", "Some Product Sections were not filled.", "error");
  }
}

addProductModal() {
  this._add_product_modal.toggle()
}

  render() {

    const { vegetables } = this.props;
    const { fruits } = this.props;
    const { food } = this.props;
    const { juice } = this.props;
    const { bites } = this.props;
    const { loading } = this.state;

    const totProducts = Object.keys(this.state.products).map(key =>
      <div className="col-md-6 col-lg-4 col-xl-3" key={key}>
          <div className="card text-center card-product">
              <div className="card-product__img">
              <img className="card-img" src={`http://localhost:8090/rosens/TotCafe/images/tot/${this.state.products[key].imageUrl}`} style={{padding: '10px'}} alt="" />

              <ul className="card-product__imgOverlay">
                  <li><button title="Delete Product"><i className="fa fa-trash"></i></button></li>
                  <li><button title="Edit Product" onClick={() => this.openProduct(this.state.products[key], key)}><i className="fa fa-edit"></i></button></li>
                  <li><button title="Archive Product"><i className="fa fa-archive"></i></button></li>
              </ul>
              </div>
              <div className="card-body product_details">
              <p>{this.state.products[key].unit}</p>
              <h4 className="card-product__title">
                  <Link to={{ pathname: "/product",
                      state: {
                          name: this.state.products[key].itemName,
                          description: this.state.products[key].description,
                          price: this.state.products[key].price,
                          type: this.state.type,
                          unit: this.state.products[key].unit,
                          image: this.state.products[key].imageUrl,
                          availability: "In Stock",
                          productID: key,
                          fruits: fruits,
                          vegetables: vegetables,
                          bites: bites,
                          food: food,
                          juice: juice
                      } }} >{this.state.products[key].itemName}</Link>
              </h4>
              <p className="card-product__price">{Number(this.state.products[key].price).toLocaleString("en-US", {style:"currency", currency:"UGX"})}</p>
              </div>
          </div>
      </div>
    );

    return (

        <div className="content">
          <ProductModal selectedProduct={this.state.selectedProduct} updateSelectedProduct={this.updateSelectedProduct}  ref={(modal) => { this._modal = modal; }} />
          <AddProduct ref={(add_product_modal) => { this._add_product_modal = add_product_modal; }} addProduct={this.addProduct} />
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Manage Products</h5>
                  <p className="category">
                    Products are enlisted by category
                  </p>
                </CardHeader>
                <CardBody className="all-icons">

                  <Row>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                      onClick={ (e) => this.switchCategory(e, "Fruits", fruits)}
                    >
                      <div className={`${this.state.Fruits ? 'font-icon-detail type type_active' : 'font-icon-detail'}`}>
                        <img src={fruitsIcon} alt="Fruits" width="30px" height="30px" />
                        <p className="categories">Fruits</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                      onClick={ (e) => this.switchCategory(e, "Vegetables", vegetables)}

                    >
                      <div className={`${this.state.Vegetables ? 'font-icon-detail type type_active' : 'font-icon-detail'}`}>
                        <img src={vegetablesIcon} alt="Food" width="30px" height="30px" />
                        <p>Vegetables</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                      onClick={(e) => this.switchCategory(e, "Food", food)}
                    >
                      <div className={`${this.state.Food ? 'font-icon-detail type type_active' : 'font-icon-detail'}`}>
                        <img src={foodIcon} alt="Food" width="30px" height="30px" />
                        <p>Food</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                      onClick={(e) => this.switchCategory(e, "Juice", juice)}
                    >
                      <div className={`${this.state.Juice ? 'font-icon-detail type type_active' : 'font-icon-detail'}`}>
                        <img src={juiceIcon} alt="Juice" width="30px" height="30px" />
                        <p>Juice</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                      onClick={(e) => this.switchCategory(e, "Bites", bites)}
                    >
                      <div className={`${this.state.Bites ? 'font-icon-detail type type_active' : 'font-icon-detail'}`}>
                        <img src={bitesIcon} alt="Food" width="30px" height="30px" />
                        <p>Bites</p>
                      </div>
                    </Col>

                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                      onClick={(e) => this.addProductModal(e)}
                    >
                      <div className='font-icon-detail'>
                        <i className="tim-icons icon-simple-add" />
                        <p>Add Products</p>
                      </div>
                    </Col>


                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Products</h5>
                </CardHeader>
                <CardBody className="all-icons">
                  {loading
                    ? <LoadingSpinner loader={"loader"} />
                    :
                        Object.keys(this.state.products).length > 0
                        ? <Row>{totProducts}</Row>
                        : <div className="col-md-12 col-lg-12 col-xl-12" >{`No Products for ${this.state.type}`}</div>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

    );
  }
}

Products.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  updateTotProduct: PropTypes.func.isRequired,
  addProductItem: PropTypes.func.isRequired,
  vegetables: PropTypes.object,
  food: PropTypes.object,
  fruits: PropTypes.object,
  bites: PropTypes.object,
  juice: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  food: state.productReducers.food,
  fruits: state.productReducers.fruits,
  vegetables: state.productReducers.vegetables,
  juice: state.productReducers.juice,
  bites: state.productReducers.bites,
  loading: state.productReducers.loading,
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllProducts, updateTotProduct, addProductItem }
  )(Products)
);
