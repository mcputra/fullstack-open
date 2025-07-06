import { useState } from "react";

const StatiscsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
      {text === "positive" ? "%" : ""}
    </p>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <StatiscsLine text="good" value={good} />
        <StatiscsLine text="neutral" value={neutral} />
        <StatiscsLine text="bad" value={bad} />
        <StatiscsLine text="all" value={all} />
        <StatiscsLine
          text="average"
          value={(good * 1 + neutral * 0 + bad * -1) / all}
        />
        <StatiscsLine text="positive" value={(good / all) * 100} />
      </>
    );
  }
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </>
  );
};

export default App;
