import { useState, useEffect } from "react";

const url = "http://localhost:3000/tasks";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Loading data error!");
      })
      .then((res) => {
        setData(res);
      });
  }, []);

  console.log(data)

  return (
    <>
      <h1>Test</h1>
      <ul>
        {data.map(task => (
          // Using Object.entries to access the date and status
          Object.entries(task).map(([date, details]) => (
            <li key={details.id}>
              Date: {new Date(date).toLocaleDateString()}<br />
              {Object.entries(details).map(([key, value]) => (
                // Render only if the value is "done"
                value === 'done' ? (
                  <span key={key}>{key}: {value}<br /></span>
                ) : null
              ))}
            </li>
          ))
        ))}
      </ul>
    </>
  );
}

export default App;
