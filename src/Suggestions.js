import "./styles.css";

export default function Suggestions(props) {
  if (props.suggestedSpices.length === 0) {
    return <></>;
  }

  return (
    <ul className="suggestions">
      {props.suggestedSpices.map((spice, index) => (
        <li
          onClick={() => props.handleOnClickSuggestion(spice)}
          className={props.suggestionIndex === index ? "selected" : ""}
        >
          {spice}
        </li>
      ))}
    </ul>
  );
}
