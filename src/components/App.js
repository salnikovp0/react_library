// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.notFound ? 'gaga' : 'dada'}
        <Header
          loading={this.props.loading}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  debugger;

  return {
    loading: state.ajaxCallsInProgress > 0,
    notFound: state.notFound
  };
}

export default connect(mapStateToProps)(App);
