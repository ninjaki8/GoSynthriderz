export default function Sync({ handleClick }) {
  return (
    <div>
      <button className="bg-blue-800 py-2 px-5 m-5 rounded cursor-pointer" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}
