import React from 'react';

const NotFound = () =>
  <div>
    <h1>404 page not found</h1>
    <p>The page you are looking for does not exist</p>
    <img src={`${process.env.PUBLIC_URL}/404.gif`} alt="Page not found"/>
  </div>

  export default NotFound;
