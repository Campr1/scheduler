import React from "react";
import DayListItem from "./DayListItem";


export default function Daylist(props) {
  const {days} = props;
  // console.log("++++++++++", days);
  // // const parsedMatches = matchData.map(match => <Match key={match.matchNumber} {...match} />);
  const parsedDays = days.map(day => <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.value}
    setDay={props.onChange} />);
   return (
     <ul>{parsedDays}</ul>
   );
  // return(
  //   <ul>
  //     <DayListItem 
  //       key={props.days[0].id}
  //       name={props.days[0].name} 
  //       spots={props.days[0].spots} 
  //       selected={props.days[0].name === props.day}
  //       setDay={props.setDay}  
  //     />
  //     <DayListItem
  //       key={props.days[1].id} 
  //       name={props.days[1].name} 
  //       spots={props.days[1].spots} 
  //       selected={props.days[1].name === props.day}
  //       setDay={props.setDay}  
  //     />
  //     <DayListItem 
  //       key={props.days[2].id}
  //       name={props.days[2].name}
  //       spots={props.days[2].spots} 
  //       selected={props.days[2].name === props.day}
  //       setDay={props.setDay}  
  //     />      
  //   </ul>
  // )
 }