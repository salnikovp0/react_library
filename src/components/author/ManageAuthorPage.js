import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

export class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: Object({}, this.props.courses),
      author: Object.assign({}, props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (this.props.author.id !== nextProps.author.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({author: Object.assign({}, nextProps.author)});
    }
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author: author});
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length === 0 && this.state.author.lastName.length === 0 ) {
      errors.title = 'name must be at least 1 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveAuthor(this.state.author)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  deleteAuthor(event) {
    event.preventDefault();

    const course = this.props.courses.find(course => course.authorId === this.state.author.id);

    if(course) {
      toastr.error(`First delete the course: ${course.title} from this author`);
      return;
    }

    this.props.actions.deleteAuthor(this.state.author)
      .then(() => {
        this.redirect();
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Author saved');
    this.context.router.push('/authors');
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onSave={this.saveAuthor}
        onChange={this.updateAuthorState}
        errors={this.state.errors}
        saving={this.state.saving}
        onDelete={this.deleteAuthor}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object,
  courses: PropTypes.array,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, authorId) {
  return authors.find(author => author.id === authorId);
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id;

  let author = { id:'', firstName:'', lastName:'' };

  if(authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);

    if(!author) {
      author = { id:'', firstName:'', lastName:'' };
    }
  }

  return {
    courses: state.courses,
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
