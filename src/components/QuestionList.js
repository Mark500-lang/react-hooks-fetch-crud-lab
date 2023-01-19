import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ myData, deleteQuestion, updatedQuestion }) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {
          myData.map((item, index)=>{
            return (
              <div key={index}>
                <li>{item.prompt}</li>
                <QuestionItem question ={item} deleteQuestion={deleteQuestion} updatedQuestion={updatedQuestion}/>
              </div>
            )
          })
        }
      </ul>
    </section>
  );
}

export default QuestionList;
