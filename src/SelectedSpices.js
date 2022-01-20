import "./styles.css";

export default function SelectedSpices(props) {
  return (
    <div className="SelectedSpices">
      {props.selectedSpices.map((spice, index) => (
        <Spice
          key={index}
          name={spice}
          index={index}
          handleDeleteSelectedSpices={props.handleDeleteSelectedSpices}
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
          props.handleDeleteSelectedSpices(props.index);
        }}
      >
        x
      </button>
    </span>
  );
}
