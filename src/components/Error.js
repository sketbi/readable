import React from 'react';
import { connect } from 'react-redux';
import { ErrorMessage } from './Loader';


const Error = props => {
  return (
    <ErrorMessage message='Error communicatiing with API Server'/>
  );
}

export default connect(null, null)(Error);


 
