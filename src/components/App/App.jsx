import { useState } from 'react';

import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';

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

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} />
      <Feedback />
    </>
  );
}

export default App;
