import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onChange, onSave, saving, errors, onDelete}) => {
  return (
    <form>
      <h1>Manage Authors</h1>
      <TextInput
        name="firstName"
        label="First name"
        value={author.firstName}
        onChange={onChange}
        error={errors.title}/>

      <TextInput
        name="lastName"
        label="Last name"
        value={author.lastName}
        onChange={onChange}
        error={errors.title}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>

      {author.id &&
        <button
          className="btn btn-danger"
          onClick={onDelete}>
          Delete
        </button>
      }

    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default AuthorForm;
