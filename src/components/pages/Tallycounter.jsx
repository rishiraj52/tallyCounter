import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "./Tally.css";

const TallyCounter = () => {
  const [counters, setCounters] = useState([
    { id: 1, count: 0, name: "Counter", startPoint: 0 },
  ]);

  const increment = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, count: counter.count + 1 } : counter
      )
    );
  };

  const decrement = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, count: counter.count - 1 } : counter
      )
    );
  };

  const reset = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, count: counter.startPoint } : counter
      )
    );
  };

  const addCounter = () => {
    const newCounterId = counters.length + 1;
    setCounters([
      ...counters,
      { id: newCounterId, count: 0, name: "Counter", startPoint: 0 },
    ]);
  };

  const removeCounter = (id) => {
    setCounters((prevCounters) =>
      prevCounters.filter((counter) => counter.id !== id)
    );
  };

  const handleRenameClick = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, isRenaming: true } : counter
      )
    );
  };

  const handleInputChange = (event, id) => {
    const newName = event.target.value;
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, name: newName } : counter
      )
    );
  };

  const handleRenameSubmit = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, isRenaming: false } : counter
      )
    );
  };

  const setStartPoint = (id) => {
    const customStartPoint = parseInt(prompt("Enter the custom start point:"));
    if (!isNaN(customStartPoint)) {
      setCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter.id === id
            ? {
                ...counter,
                startPoint: customStartPoint,
                count: customStartPoint,
              }
            : counter
        )
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      alert("User signed out successfully");
      window.location.href = "http://reverr-tallycounter.vercel.app.com/";
    } catch (error) {
      alert("Error occurred during sign out:", error);
    }
  };

  return (
    <div className="container">
      <navbar>
        <h1>
          <Link to="/signout" onClick={handleSignOut}>
            Signout
          </Link>
        </h1>
      </navbar>
      <h1 id="heading1">Tally Counter</h1>
      <button className="addbtn" onClick={addCounter}>
        Add Counter
      </button>
      <div className="tallyarea">
        {counters.map((counter) => (
          <div className="tallys" key={counter.id}>
            <h2 id="heading2">{counter.name}</h2>
            <div id="countt">
              Count: <p>{counter.count}</p>
            </div>
            <div className="tallybox">
              <button onClick={() => decrement(counter.id)}>Decrement -</button>
              <button onClick={() => increment(counter.id)}>Increment +</button>
              <button onClick={() => reset(counter.id)}>Reset</button>
              <button onClick={() => removeCounter(counter.id)}>Remove</button>
              {!counter.isRenaming ? (
                <button onClick={() => handleRenameClick(counter.id)}>
                  Rename
                </button>
              ) : (
                <div>
                  <input
                    type="text"
                    value={counter.name}
                    onChange={(event) => handleInputChange(event, counter.id)}
                  />
                  <button onClick={() => handleRenameSubmit(counter.id)}>
                    Set
                  </button>
                </div>
              )}
              <button onClick={() => setStartPoint(counter.id)}>
                Start Point
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TallyCounter;
