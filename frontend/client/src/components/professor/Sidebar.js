import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProblemsRoute } from "../../utils/APIRoutes";

export default () => {
  const [problems, setProblems] = useState([]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

    useEffect(() => {
      axios
        .get(`${getAllProblemsRoute}/6ac52c71-86fe-4c39-beb9-b7408804f2f3`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              JSON.stringify(localStorage.getItem("access-token"))
            )}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setProblems(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <div>
      <div className="description">Drag & drop problems:</div>
      <table>
        <tbody>
          {problems.map((problem) => (
                      <tr style={{border: "1px solid black"}} onDragStart={(event) => onDragStart(event, problem.name)} draggable>
                        <td>
                          {problem.name}
                        </td>
                      </tr>
                    ))}
        </tbody>
      </table>
    </div>
  );
};