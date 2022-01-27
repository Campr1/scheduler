export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(each => each.name === day);
  if(filteredAppointments.length === 0) {
    return filteredAppointments
  }
  const appointments = filteredAppointments[0].appointments;
  const result = appointments.map(each => state.appointments[each])
  return result;
}

export function getInterview(state, interview) { //get interviewer data
if(!interview){
  return null;
}
return {interviewer: state.interviewers[interview.interviewer], student: interview.student};
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayMatch = state.days.find(dayName => dayName.name === day);
  if(!dayMatch){
    return result;
  }
  for (const interviewer of dayMatch.interviewers) {
    if(state.interviewers[interviewer]){
      result.push(state.interviewers[interviewer])
    }
  }
  return result;
}