import React from 'react';

class AboutUs extends React.Component {
  render() {
    return(
      <div>
        <h1>Mountain View Pizza </h1>
        <img
          src={require('../../app/assets/images/wasatch-mountain.jpg')}
          alt='Mountain views' height='200px' width='200px'
          />
        <div className='well'>
        All pizzas are made with the finest ingredients found along the Wasatch 
        Front and reflect the chef's favorite ingredients to throw on a pizza.
      </div>
      </div>
    );
  }
}

export default AboutUs;
