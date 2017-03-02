import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
  state = { menu: {}, menu_items: [] };

  componentDidMount() {
    $.ajax({
      url: `/api/menus/${this.props.params.id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( menu => {
      this.setState({ ...menu });
    }).fail( data => {
      console.log(data);
    });
  }

  deleteMenuItem = (menu_id ,id) => {
    $.ajax({
      url: `/api/menus/${menu_id}/menu_items/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      let menu_items = this.state.menu_items.filter( menu_item => { return menu_item.id !== id });
      this.setState({ menu_items });
    }).fail( data => {
      console.log(data);
    })
  }


  displayMenuItems = () => {
    return this.state.menu_items.map( menu_item => {
      let id = `collapse${menu_item.id}`;

      return(
        <div className="panel panel-default" key={menu_item.id}>
          <div className="panel-heading">
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#${id}`}>
                { menu_item.name }
              </a>
            </h4>
          </div>
          <div id={id} className="panel-collapse collapse in" role="tabpanel">
            <div className="panel-body">
              { menu_item.description }
              <hr />
              <i>Price: ${ Math.round(menu_item.price) }</i>
              <button className='btn btn-warning'>
              Edit
              </button>
              <button className='btn btn-danger' onClick= { () => this.deleteMenuItem(menu_item.menu_id, menu_item.id) }>Delete</button>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return(
      <div>
        <h1>{this.state.menu.name}</h1>
        <Link to='/menus' className='btn btn-default'>All Menus</Link>
        <h3>All Menu Items</h3>
        <div className="panel-group" id="accordion" role="tablist">
          { this.displayMenuItems() }
        </div>
      </div>
    );
  }
}

export default Menu;
