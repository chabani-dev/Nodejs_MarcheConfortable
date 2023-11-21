import React from "react";

const CategorieInfo = (props) => {
  const { categorie } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Customer</h6>
            <p className="mb-1">
              {categorie.user.name} <br />
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Categorier info</h6>
            <p className="mb-1">
              Name: {categorie.name} <br />
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Description</h6>
            <p className="mb-1">Description: {categorie.description}</p>
          </div>
          <div className="text">
            <h6 className="mb-1">Image</h6>
            <p className="mb-1">Image: {categorie.image}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CategorieInfo;
