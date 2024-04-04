import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledLi = styled.li`
  padding: 20px;
  margin: 20px auto;
  border-radius: 30px;
  max-width: 200px;
  list-style-type: none;
  background-color: aliceblue;
`;

const url = "http://localhost:3000/tasks";

export function TasksList() {
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

  return (
    <>
      <ul>
        {data.map((task) =>
          // Using Object.entries to access the date and status
          Object.entries(task).map(([date, details]) => (
            <StyledLi key={details.id}>
              {details.length}
              Date: {new Date(date).toLocaleDateString()}
              <br />
              {Object.entries(details).map(([key, value]) =>
                // Render only if the value is "done"
                value === "done" ? (
                  <span key={key}>
                    {key}: {value}
                    <br />
                  </span>
                ) : null
              )}
            </StyledLi>
          ))
        )}
      </ul>
    </>
  );
}
