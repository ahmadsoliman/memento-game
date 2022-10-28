const Card = ({
  image,
  selected,
  onClick,
}: {
  image: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="card" onClick={onClick}>
      <div className={selected ? "selected" : ""}>
        <img className="card-face" src={image} alt={image} />
        <img className="card-back" src="/assets/git.png" alt="backcard" />
      </div>
    </div>
  );
};

export default Card;
