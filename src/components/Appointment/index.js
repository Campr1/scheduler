import React from "react"
import "components/Appointment/styles.scss"

export default function Appointment(props) {
  
  return(
    <article className="appointment" >{
      (!props.time)
        ? <div> No Appointments </div> 
        : <div> Appointment at {props.time} </div> 
    }</article>
  );
}