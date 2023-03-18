import { useState } from "react";
import "./DateInput.css";

function DateInput() {
  const [dataTime, setDataTime] = useState("");
  const [value, setValue] = useState("Selected date");
  const [error, setError] = useState(null);

  async function request(value) {
    try {
      const result = await fetch(`http://localhost:8080/post?date=${value}`, {
        method: "POST",
      });
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await result.text();
      setValue(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleChange(event) {
    request(event.target.value);
  }

  return (
    <div className="wrap">
      <div className="date">
        <div className="main">
          {error ? <h3>{error}</h3> : <h3>{value}</h3>}
          <div>
            <input type={"datetime-local"} onChange={handleChange}></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateInput;
