import { useParams, Link } from "react-router-dom";
export default function WelcomeComponent() {
  const { username } = useParams();
  console.log(username);
  return (
    <div className="welcomeComponent">
      Manage your todos <Link to="/todos">Go here</Link>
    </div>
  );
}
