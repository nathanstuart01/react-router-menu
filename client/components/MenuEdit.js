import React from 'react';
import { Link } from 'react-router';

class MenuEdit extends React.Component{
  state = {editing: false, menu_item: this.props.menu_item };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    $.ajax({
      url: `/api/menus/${this.props.menu_id}/menu_items/${this.state.menu_item.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { menu_item: {name: this.refs.name.value, description: this.refs.description.value, price: this.refs.price.value} }
    }).done( menu_item => {
      this.setState({ editing: false, menu_item });
    }).fail( data => {
      console.log(data);
    });
  }

  display = () => {
    let menu_item = this.state.menu_item;

    if(this.state.editing) {
      return(
        <form onSubmit={ this.handleSubmit }>
        <h1>Editing: { menu_item.name }</h1>
        <input ref='name' type='text' defaultValue={ this.state.menu_item.name } required />
        <br />
        <input ref='description' type='text' defaultValue={ this.state.menu_item.description } required />
        <br />
        <input ref='price' type='text' defaultValue={ this.state.menu_item.price } required />
        <br />
        <input type='submit' className='btn btn-primary' />
        <button
        type='button'
        className='btn btn-default'
        onClick={ this.toggleEditing }
        >
        Cancel
        </button>
      </form>
      );
    } else {
      return(
        <div className="panel panel-default" key={menu_item.id}>
          <div className="panel-heading">
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#${menu_item.id}`}>
                { menu_item.name }
              </a>
            </h4>
          </div>
          <div id={menu_item.id} className="panel-collapse collapse in" role="tabpanel">
            <div className="panel-body">
              { menu_item.description }
              <hr />
              <i>Price: ${ Math.round(menu_item.price) }</i>
              <button className='btn btn-warning' onClick= { () => this.toggleEditing() }>
              Edit
              </button>
              <button className='btn btn-danger'
              onClick= { () => this.props.deleteMenuItem(menu_item.menu_id, menu_item.id) }
              >
              Delete
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  render(){
    let menu_item = this.state.menu_item;

    return (
      <div>
        <div className="panel-group" id="accordion" role="tablist">
          { this.display() }
        </div>
      </div>
    );
  }
}

export default MenuEdit;
