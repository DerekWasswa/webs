import React from 'react';
import '../../assets/css/loading_spinner.css';

const LoadingSpinner = props => (
  <div className={props.loader}>
    <i className="fa fa-spinner fa-spin" /> Loading...
  </div>
);

export default LoadingSpinner;
