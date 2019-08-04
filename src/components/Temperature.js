import React, { useState, useEffect } from 'react';

const Temperature = props => {
  const [celcius, setCelcius] = useState(0);

  useEffect(() => {
    setCelcius(parseInt(props.kelvin - 273.15))
  }, [props.kelvin]);

  return <div className='col-xs-12' style={{ opacity: props.opacity }}>{celcius}&#176;</div>
};

export default Temperature;
