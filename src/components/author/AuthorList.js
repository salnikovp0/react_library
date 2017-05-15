import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {authorsFormattedForDropdown} from '../../selectors/selectors';

const AuthorList = ({authors}) => {
  const formattedAuthors = authorsFormattedForDropdown(authors);


  return (
    <div>
      <ul className="list-group" >
        {formattedAuthors.map(author =>
          (<li key={author.value} className="list-group-item">
            <Link to={'/author/' + author.value}>{author.text}</Link>
          </li>)
        )}
      </ul>
    </div>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired
};

export default AuthorList;
