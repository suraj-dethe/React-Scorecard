import './Marklist.css';
const Scorecard = ({ formData }) => {
  const calculateGrade = (marksObtained, maxMarks) => {
    const percentage = (marksObtained / maxMarks) * 100;

    if (percentage < 35) return { grade: 'Fail', color: 'red' };
    if (percentage >= 35 && percentage < 60) return { grade: 'Pass', color: 'black' };
    if (percentage >= 60 && percentage < 75) return { grade: 'First Class', color: 'gold' };
    return { grade: 'Distinction', color: 'green' };
  };

  // Determine failed subjects
  const failedSubjects = formData.subjects.filter(subject => {
    const { grade } = calculateGrade(subject.obtained, subject.outOf);
    return grade === 'Fail';
  });

  // Generate remarks
  const remarkText = failedSubjects.length
    ? `Failed in ${failedSubjects.length} subject(s)`
    : `Passed with Distinction in ${formData.subjects.length} subjects`;

  return (
    <div className="scorecard-container">
      <header>
        <h1>Sinhgad Public School</h1>
        <h2>Central Board Of Education</h2>
        <p>Academic Year: 2024-2025</p>
      </header>

      <section className="scorecard">
        <h3>Mark List</h3>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Subject</th>
              <th>OutOf Marks</th>
              <th>Marks Obtained</th>
              <th>Percentage</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {formData.subjects.map((subject, index) => {
              const { grade, color } = calculateGrade(subject.obtained, subject.outOf);
              const percentage = ((subject.obtained / subject.outOf) * 100).toFixed(2);
              return (
                <tr key={index} style={{ backgroundColor: grade === 'Fail' ? '#f8d7da' : 'white' }}>
                  <td>{index + 1}</td>
                  <td>{subject.subject}</td>
                  <td>{subject.outOf}</td>
                  <td>{subject.obtained}</td>
                  <td>{percentage}%</td>
                  <td style={{ color: color }}>{grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="remarks">
        <p>{remarkText}</p>
      </section>
    </div>
  );
};

export default Scorecard;
