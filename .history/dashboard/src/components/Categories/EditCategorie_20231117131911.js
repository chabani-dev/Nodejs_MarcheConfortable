import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategorie,
  updateCategorie,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { CATEGORIE_UPDATE_REQUEST } from "../../Redux/Constants/CategorieConstants";

const ToastObjets = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditCategorie = (props) => {
  const { categorieId } = props;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();

  const categorieEdit = useSelector((state) => state.categorieEdit);
  const { loading, error, categorie } = categorieEdit;

  const categorieUpdate = useSelector((state) => state.categorieUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categorieUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORIE_UPDATE_REQUEST });
      toast.success("Categorie Updated", ToastObjets);
    } else {
      if (!categorie.name || categorie._id !== categorieId) {
        dispatch(editCategorie(categorieId));
      } else {
        setName(categorie.name);
        setDescription(categorie.description);
        setImage(categorie.image);
        setPrice(categorie.price);
        setProductId(categorie.productId);
      }
    }
  }, [categorie, dispatch, categorieId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategorie({
        _id: categorieId,
        name,
        price,
        description,
        image,
        productId,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to categories
            </Link>
            <h2 className="content-title">Update Categorie</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Categorie title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Produit référent
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={productId}
                          onChange={(e) => setProductId(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditCategorie;
