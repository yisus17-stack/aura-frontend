import './Breadcrumbs.css';

const Breadcrumbs = ({ nombre }) => {
  return (
    <div className="breadcrumb-wrapper">
      <div className="breadcrumb-capsule">
        <span className="breadcrumb-current-pill">
          Personajes
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;