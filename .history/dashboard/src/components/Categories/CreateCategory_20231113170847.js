import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategorie } from "../../Redux/Actions/CategorieActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { CATEGORIE_CREATE_RESET } from "../../Redux/Constants/CategorieConstants";

const ToastObjets = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const categorieCreate = useSelector((state) => state.categorieCreate);
  const { loading, error, categorie } = categorieCreate;

  useEffect(() => {
    if (categorie) {
      toast.success("Categorie Added", ToastObjets);
      dispatch({ type: CATEGORIE_CREATE_RESET });
      // Réinitialiser les valeurs des champs
      setName("");
      setDescription("");
      setImage("");
    }
  }, [categorie, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategorie(name, description, image));
  };

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form onSubmit={submitHandler}>
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <div className="mb-4">
            <label htmlFor="product_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control py-3"
              id="product_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Images</label>
            <input
              className="form-control"
              type="file"
              value={image}
              required
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Type here"
              className="form-control"
              rows="4"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary py-3">Create category</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
