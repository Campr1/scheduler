import { useState, useEffect, } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  const dayObj = state.days.find(day => day.name === state.day)

  const getSpotsForDay = function (state){
    let spots = 0;
    for(const id of dayObj.appointments){
      const appObj = state.appointments[id];
      if(!appObj.interview){
        spots++;
      }
    }
    return spots;
  }

  function updateSpots(state, id) {
    const spots = getSpotsForDay(state);
    const newDay = {...dayObj, spots}
    console.log("spots", spots)
    
    const newDays = state.days.map(day => {
      if(day.id === newDay.id) {
        return newDay;
      }else {
        return day;
      }
    })
    return newDays;
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updatedDay = updateSpots({ ...state, appointments }, id);
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({ ...state, appointments, days: updatedDay});

    })
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   const updatedDay = updateSpots({ ...state, appointments }, id);
   
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
        setState({ ...state, appointments, days: updatedDay});
      })
  }
  return {state, setDay, bookInterview, cancelInterview};
}