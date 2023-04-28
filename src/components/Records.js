import React from "react";

function Records({ userData, selectedDate, onDelete }) {
    const userId = parseInt(localStorage.getItem("id"));
  
    const selectedRecord = userData.records.find(
      (record) => record.date === selectedDate.toLocaleDateString()
    );
  
    const handleDelete = (workout) => {
        const userId = parseInt(localStorage.getItem("id"));
        const selectedRecord = userData.records.find(
          (record) => record.date === selectedDate.toLocaleDateString()
        );
        const updatedRecord = selectedRecord.record.filter((exercise) => exercise.workout !== workout);
      
        fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            records: [
              {
                date: selectedDate.toLocaleDateString(),
                record: updatedRecord
              }
            ]
          })
        })
        .then((res) => res.json())
        .then((data) => {
            onDelete(selectedDate, workout);
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <div>
        <h4>{selectedRecord.date}</h4>
        <ul>
          {selectedRecord.record.map((exercise) => (
            <li key={exercise.workout}>
                <span>{exercise.workout}</span>
                <button onClick={() => handleDelete(exercise.workout)}>Delete</button>
                <br />
                <span>{exercise.reps} X Reps</span>
                <br />
                <span>{exercise.sets} X Sets</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default Records;