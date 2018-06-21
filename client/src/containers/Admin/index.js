import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { isUserCapable } from '../../utils/reactcms';

import NotFound from '../../components/NotFound';
import Posts from './Posts';
import Post from './Post';
import Tags from './Tags';
import Tag from './Tag';

class Admin extends Component {
  render() {
    const { user, match: { url } } = this.props;

    const canEditPosts = isUserCapable('edit', 'post', user);
    const canEditPages = isUserCapable('edit', 'page', user);
    const canManageCategories = isUserCapable('manage', 'category', user);

    return (
      <Switch>

        {canEditPosts && (
          <Route exact path={`${url}/post/new`} component={Post} key="new-post" />
        )}
        {canEditPosts && (
          <Route exact path={`${url}/post/:_id`} component={Post} key="edit-post" />
        )}
        {canEditPosts && (
          <Route exact path={`${url}/posts`} render={props =>
            <Posts type="post" title="Posts" key="posts" {...props} />
          } />
        )}
        {canManageCategories && (
          <Route exact path={`${url}/categories`} key="categories" render={props =>
            <Tags type="category" title="Categories" {...props} />
          } />
        )}
        {canManageCategories &&
          <Route exact path={`${url}/category/:_id`} key="edit-category" render={props =>
            <Tag type="category" {...props} />
          } />
        }

        {canManageCategories && (
          <Route exact path={`${url}/tags`} key="tags" render={props =>
            <Tags type="tag" title="Tags" {...props} />
          } />
        )}
        {canManageCategories &&
          <Route exact path={`${url}/tag/:_id`} key="edit-tag" render={props =>
            <Tag type="tag" {...props} />
          } />
        }

        {canEditPages && (
          <Route exact path={`${url}/page/new`} component={Post} key="new-page" />
        )}
        {canEditPages && (
          <Route exact path={`${url}/page/:_id`} component={Post} key="edit-page" />
        )}
        {canEditPages && (
          <Route exact path={`${url}/pages`} render={props =>
            <Posts type="page" title="Pages" key="pages" {...props} />
          } />
        )}

        <Route component={NotFound} />

      </Switch>
    );
  }
}

function mapStateToProps({ auth: { user } }) {
  return { user };
}

export default connect(mapStateToProps)(Admin);
