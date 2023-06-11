import { useLocation } from "react-router";

function index() {
  const location = useLocation();
  const note = location.state.note;
  return (
    <div>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
    </div>
  );
}

export default index;
