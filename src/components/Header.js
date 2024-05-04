import "./Header.scss";

export default function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <h6>{props.subtitle}</h6>
      <hr />
    </div>
  );
}
