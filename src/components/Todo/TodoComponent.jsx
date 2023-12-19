import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./Security/AuthContext";

export default function TodoComponent() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  useEffect(() => {
    retrieveTodos();
  }, [id]);

  function retrieveTodos() {
    if (id !== "-1") {
      retrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values, { setSubmitting }) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    const apiCall = id === "-1" ? createTodoApi : updateTodoApi;

    apiCall(username, todo)
      .then(() => {
        navigate("/todos");
      })
      .catch((error) => console.log(error))
      .finally(() => setSubmitting(false));
  }

  function validate(values) {
    let errors = {};

    if (!values.description || values.description.length < 5) {
      errors.description = "Enter at least 5 characters";
    }
    if (!values.targetDate) {
      errors.targetDate = "Enter a target date";
    }

    return errors;
  }

  return (
    <div className="container">
      <h1>Enter ToDo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description:</label>
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" name="targetDate" className="form-control" />
              </fieldset>

              <button type="submit" className="btn btn-success m-5">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
