import "./styles.css";

export default function Spice(props) {
  return (
    <span className="Spice">
      {props.name}
      <button
        className="delete"
        onClick={() => {
          props.handleDeleteEntry(props.index);
        }}
      >
        x
      </button>
    </span>
  );
}
