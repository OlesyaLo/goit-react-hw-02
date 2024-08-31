import { useEffect, useState } from 'react';

import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';

import css from './App.module.css';

function App() {
  const [values, setValues] = useState(() => {
    const savedValues = window.localStorage.getItem('values');
    return savedValues !== null
      ? JSON.parse(savedValues)
      : { good: 0, neutral: 0, bad: 0 };
  });

  const totalFeedback = values.good + values.neutral + values.bad;
  const positiveFeedback = Math.round((values.good / totalFeedback) * 100);

  const updateFeedback = feedbackType => {
    setValues({
      ...values,
      [feedbackType]: values[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setValues({ good: 0, neutral: 0, bad: 0 });
  };

  useEffect(() => {
    localStorage.setItem('values', JSON.stringify(values));
  }, [values]);

  return (
    <div className={css.container}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          values={values}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}

export default App;
