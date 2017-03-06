import React from 'react';
import MenuEdit from './MenuEdit';
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
      return(<MenuEdit key={menu_item.id} menu_item={menu_item} deleteMenuItem={this.deleteMenuItem} menu_id={this.props.params.id} menu={this.state.menu}/>);
    });
  }

  addMenuItem = (e) => {
    e.preventDefault();
    $.ajax({
      url: `/api/menus/${this.props.params.id}/menu_items`,
      type: 'POST',
      dataType: 'JSON',
      data: { menu_item: { name: this.refs.name.value,
                           description: this.refs.description.value,
                           price: this.refs.price.value }}
    }).done( menu_item => {
      this.setState({ menu_items: [...this.state.menu_items, menu_item ]});
      this.refs.addItem.reset();
    }).fail( data => {
      console.log(data);
    });
  }

  render() {
    return(
      <div>
        <h1>{this.state.menu.name}</h1>
        <form ref='addItem' onSubmit={this.addMenuItem}>
        <input type='text' required placeholder='Menu Item Name' ref='name' />
        <input type='text' required placeholder='Description' ref='description' />
        <input type='text' required placeholder='Price' ref='price' />
        <input type='submit' className='btn btn-primary' value='Add Menu Item' />
        </form>
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
