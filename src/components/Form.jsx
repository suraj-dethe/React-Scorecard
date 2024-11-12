import { useForm, useFieldArray, Controller } from 'react-hook-form';
import './FormStyles.css';
import { useNavigate } from 'react-router-dom'; // Correct import from react-router-dom

const Form = ({ setFormData }) => {
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      subjects: [{ subject: '', outOf: '50', obtained: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData(data);  // Store form data in parent component state
    navigate('/scorecard');  // Navigate to scorecard page
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Student Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name field */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              id="fullName"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters long',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Only alphabets and spaces are allowed',
                },
              })}
            />
            {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
          </div>

          {/* Roll Number field */}
          <div className="form-group">
            <label htmlFor="rollNo">Roll Number:</label>
            <input
              id="rollNo"
              type="text"
              {...register('rollNo', {
                required: 'Roll number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Roll number must only contain numbers',
                },
              })}
            />
            {errors.rollNo && <p className="error-message">{errors.rollNo.message}</p>}
          </div>

          {/* Dynamic Subject and Marks section */}
          <h3>Subjects and Marks</h3>
          {fields.map((item, index) => (
            <div key={item.id} style={{ display: 'flex', marginBottom: '10px' }}>
              {/* Subject field */}
              <input
                {...register(`subjects.${index}.subject`, {
                  required: 'Subject is required',
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: 'Only alphabets are allowed',
                  },
                })}
                placeholder="Subject"
                style={{ marginRight: '10px' }}
              />
              {errors.subjects?.[index]?.subject && (
                <p className="error-message">{errors.subjects[index].subject.message}</p>
              )}

              {/* Out of selection */}
              <Controller
                control={control}
                name={`subjects.${index}.outOf`}
                render={({ field }) => (
                  <select {...field} style={{ marginRight: '10px' }}>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                )}
              />

              {/* Obtained Marks field */}
              <Controller
                control={control}
                name={`subjects.${index}.obtained`}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Obtained Marks"
                    style={{ marginRight: '10px' }}
                    min="0"
                    max={watch(`subjects.${index}.outOf`)}
                  />
                )}
              />
              {errors.subjects?.[index]?.obtained && (
                <p className="error-message">{errors.subjects[index].obtained.message}</p>
              )}

              {/* Remove button */}
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ subject: '', outOf: '50', obtained: '' })}
          >
            Add Subject
          </button>
          <br />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
