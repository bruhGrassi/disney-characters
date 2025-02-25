import "../App.css";

const Skeleton = () => {
  const skeletons = [...Array(3)];

  return (
    <div className="skeleton-wrapper">
      {skeletons.map((_, index) => (
        <div className="card skeleton" key={index}>
          <div className="skeleton-image"></div>
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-details">
            <div className="skeleton-text skeleton-subtitle"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>

            <div className="skeleton-text skeleton-subtitle"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>

            <div className="skeleton-text skeleton-subtitle"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
