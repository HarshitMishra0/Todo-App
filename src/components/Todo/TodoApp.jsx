import { useState } from "react";
import "./ToDoApp.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
export default function TodoApp() {
  return (
    <div className="ToDoApp">
      <HeaderComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route
            path="/welcome/:username"
            element={<WelcomeComponent />}
          ></Route>
          <Route path="/todos" element={<ListTodosComponent />}></Route>
          <Route path="/logout" element={<LogoutComponent />}></Route>
          <Route path="*" element={<ErrorComponent />}></Route>
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

function LoginComponent() {
  const [username, setUsername] = useState("harshit");
  const [password, setPassword] = useState("harshit");
  const [showSuccessMessage, setShowSucceessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    if (username === "harshit" && password === "harshit") {
      setShowSucceessMessage(true);
      setShowErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else {
      setShowSucceessMessage(false);
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="Login">
      <div className="LoginForm">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <div>
          <button type="btn" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
      {showSuccessMessage && (
        <div className="successMessage">Authenticated Successfully</div>
      )}
      {showErrorMessage && (
        <div className="errorMessage">
          Authentication Failed, Please check your credentials!
        </div>
      )}
    </div>
  );
}

function WelcomeComponent() {
  const { username } = useParams();
  console.log(username);
  return (
    <div className="welcomeComponent">
      Manage your todos <Link to="/todos">Go here</Link>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="ErrorComponent">
      <h1>We are working really hard! </h1>
      <div>Apologies for the 404. Reach out to our team at ABC-DEF-GHIJ.</div>
    </div>
  );
}
function ListTodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const todos = [
    { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
    {
      id: 2,
      description: "Learn Full Stack Dev",
      done: false,
      targetDate: targetDate,
    },
    { id: 3, description: "Learn DevOps", done: false, targetDate: targetDate },
  ];

  return (
    <div className="ListTodosComponent">
      <h1>Things you want to do! </h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Description</td>
              <td>Is Done</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HeaderComponent() {
  return (
    <header className="header">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" href="/welcome/harshit">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
function FooterComponent() {
  return (
    <div className="footer">
      <hr /> Footer
    </div>
  );
}

function LogoutComponent() {
  return (
    <div className="LogoutComponent">
      <h1>You are logged out!</h1>
      <div>Thank you for using our App. Come back soon!</div>
    </div>
  );
}
