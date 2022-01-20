import "./styles.css";

export default function SelectedSpices(props) {
  return (
    <div className="SelectedSpices">
      {props.selectedSpices.map((spice, index) => (
        <Spice
          key={index}
          name={spice}
          index={index}
          handleDeleteEntry={props.handleDeleteEntry}
        />
      ))}
    </div>
  );
}

function Spice(props) {
  return (
    <span>
      {props.name}
      <button
        onClick={() => {
          props.handleDeleteEntry(props.index);
        }}
      >
        x
      </button>
    </span>
  );
}
