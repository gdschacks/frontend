import "./Button.scss";
export default function Button(prop) {

  const handleClick = () => {
    // Redirect to the specified link when the button is clicked

    window.open(prop.click)
  };

  return (
    <button className="ui_button" onClick={handleClick}>
      {prop.text}
    </button>
  );
}
