import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultsFormState = {
	 title: '',
   description: '',
	 isComplete: false,
};

const NewTaskForm = ({ onHandleSubmit }) => {
  const [formData, setFormData] = useState(kDefaultsFormState);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    setFormData(formData => {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = {
      title: formData.title,
      description: formData.description,
      isComplete: formData.isComplete === 'true' || formData.isComplete === true
    };  
    onHandleSubmit(submitData);
    setFormData(kDefaultsFormState);
  };

  const makeControlledInput = (inputName) => {
    return (
      <input
        type="text"
        name={inputName}
        id={`input-${inputName}`}
        value={formData[inputName]}
        onChange={handleChange}
      />
    );
  };

  const makeControlledSelect = (inputName, options) => {
    return (
      <select
        name={inputName}
        id={`select-${inputName}`}
        value={formData[inputName]}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  };

  return (
    <form onSubmit={handleSubmit} >
      <h2>Add a Task</h2>
      <div>
        <label htmlFor='title'>Title:</label>
        { makeControlledInput('title') }
		 </div>
     <div>
      <label htmlFor='description'>Description:</label>
      { makeControlledInput('description') }
    </div>
		 <div>
        <label htmlFor='isComplete'>Is Complete:</label>
        { makeControlledSelect('isComplete', [
          { value: 'false', label: 'No' },
          { value: 'true', label: 'Yes' }
        ]) }
		 </div>
		 <div>
        <input type="submit" value="Add Task" />
		 </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;