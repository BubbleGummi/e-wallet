import "./Top.css";

export default function Top(props) {
  return (
    <div className="top">
      <h1 className="top-header">{props.title}</h1>
      <p className="top-header-text">{props.description}</p>
    </div>
  );
}
