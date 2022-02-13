import React from "react"
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualModes from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const FORM = "FORM";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const STATUS_DELETE = "STATUS_DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualModes(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(STATUS);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function onConfirm() {
    transition(STATUS_DELETE);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <>
      <article className="appointment" >
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}

        {mode === SHOW && (
          <Show
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && 
          <Form 
          onSave={save} 
          onCancel={back} 
          interviewers={props.interviewers} 
          />
        }

        {mode === EDIT && 
          <Form 
          onSave={save} 
          onCancel={back} 
          student={props.interview.student} 
          interviewers={props.interviewers} 
          interviewer={props.interview.interviewer.id} 
          />
        }

        {mode === STATUS && 
          <Status 
          status={props.status} 
          message={props.message} 
          />
        }

        {mode === STATUS_DELETE && 
          <Status 
          status={props.status} 
          message={"Deleting"} 
          />
        }

        {mode === ERROR_SAVE && 
          <Error 
          onClose={back} 
          message={"Could not save appointment"} 
          />
        }

        {mode === ERROR_DELETE && 
          <Error 
          onClose={back} 
          message={"Could not cancel appointment"} 
          />
        }

        {mode === CONFIRM && 
          <Confirm 
          onConfirm={onConfirm} 
          message={"Are You Sure You Want To Cancel This Appointment?"} 
          onCancel={back} 
          />
        }
      </article>
    </>
  );
}