import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DEFAULT_CATEGORY_FILTER } from './constants';
import * as actions from './actions';

class NavMenu extends Component {
  componentDidMount () {
    this.props.dispatch(actions.getCategories());
  }

  render() {
    const { categories } = this.props.state;
    const { visibleCategory } = this.props;
    return (
      <div>
        <AppBar
          title="Readable"
          iconElementLeft={
            <IconButton containerElement={<Link to="/" />}>
              <ActionHome />
            </IconButton>
          }>
        </AppBar>
        <div>
          <ul style={{
              "listStyleType": "none",
              "textAlign": "center"
          }}>
            {categories.map((category, index) =>
              <li style={{
                  "display": "inline",
                  "textTransform": "capitalize"
                }} key={category.path}>
                {
                  category.name === visibleCategory ?
                    <span>{category.name}</span>
                      :
                    <Link to={`/category/${category.path}`} >{category.name}</Link>
                }
                {/* Append a | after each element except the last */}
                {categories[index + 1] ? ' | ' : ''}
                </li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, routerParams) {
  const pathName = routerParams.location.pathname;
  const visibleCategory = pathName.includes('category') ?
            pathName.split('/').pop() :
            DEFAULT_CATEGORY_FILTER;

  return {
    state,
    visibleCategory
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu));
