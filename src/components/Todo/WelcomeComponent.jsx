import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { retrieveHelloWorldBean } from "./api/HelloWorldApiService";
export default function WelcomeComponent() {
  const { username } = useParams();

  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    retrieveHelloWorldBean()
      .then((response) => successfullResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfullResponse(response) {
    setMessage(response.data);
  }

  function errorResponse(error) {
    console.error("Error in API call:", error);
    setMessage("Error occurred while calling the API");
  }

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
