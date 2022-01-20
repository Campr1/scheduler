import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import { useState } from "react";

export default function Interviewerlist(props) {
  const [value, setValue] = useState(null); 
  const onChange = function (id){
    setValue(id);
  }
  const interviewers = props.interviewers.map((interviewer) => {
  return (
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}    
    />
  );
});
 
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}