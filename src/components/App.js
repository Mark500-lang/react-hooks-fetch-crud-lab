import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [data, setData] = useState([
    {
        "id": 1,
        "prompt": "What special prop should always be included for lists of elements?",
        "answers": [
          "id",
          "name",
          "key",
          "prop"
        ],
        "correctIndex": 2
      }
  ]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions", )
    .then((res)=> res.json())
    .then((quizData)=> setData(quizData));
  }, [])  

//  POST request
  function addQuestion(newQuestion){
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newQuestion)
    })
    .then(response => response.json())
    .then(newQuestion =>{
      const newQuestions =[...data, newQuestion];
      setData(newQuestions);
    })
  }

//DELETE request
  function deleteQuestion(questId){
    fetch(`http://localhost:4000/questions/${questId}`, {
      method: "DELETE"
    })
    .then((response)=> response.json())
    .then(()=>{
      const newList = data.filter(filtData=>filtData.id !== questId);
      setData(newList)
    })
  }

//PATCH request for updating db.json
  function updateQuestion(questId, updQuestion){
    fetch(`http://localhost:4000/questions/${questId}`,{
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: {"contentIndex":updQuestion},
    })
    .then(response => response.json())
    .then((updQuestion)=>{
      const updQuestions = data.map((dat)=>{
                if(dat.id === questId) return updQuestion;
                return data;
          })
      setData(updQuestions);
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}/> : <QuestionList 
      myData={data} deleteQuestion={deleteQuestion} updatedQuestion={updateQuestion}
      />}
    </main>
  );
}

export default App;
