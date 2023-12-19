import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  retrieveHelloWorldBean,
  retrieveHelloWorldPathVariable,
} from "./api/HelloWorldApiService";
import { useAuth } from "./Security/AuthContext";

export default function WelcomeComponent() {
  const { username } = useParams();
  const [message, setMessage] = useState(null);
  const authContext = useAuth();

  const callHelloWorldRestApi = () => {
    retrieveHelloWorldPathVariable(username, authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  };

  const successfulResponse = (response) => {
    setMessage(response.data.message); // Assuming 'message' is a property of the response data
  };

  const errorResponse = (error) => {
    console.error("Error in API call:", error);
    setMessage("Error occurred while calling the API");
  };

  return (
    <div>
      <div className="welcomeComponent">
        Manage your todos <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-2" onClick={callHelloWorldRestApi}>
          Call API
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
