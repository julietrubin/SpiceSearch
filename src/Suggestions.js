import "./styles.css";
import { SPICE_SUGGESTIONS } from "./constants.js";

export default function Suggestions(props) {
  if (props.current === "") {
    return <></>;
  }

  return (
    <ul className="suggestions">
      {SPICE_SUGGESTIONS.map((spice, index) => (
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
