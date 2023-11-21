// const notFound = (req, res, next) => {
//   const error = new Error(`Not found - ${req.originalUrl}`);
//   res.status(404);

const notFound = async (req, res, next) => {
  const productId = req.params.id; // Supposons que l'ID du produit est dans les paramètres de la requête

  try {
    const product = await Product.findById(productId); // Supposons que "Product" est le modèle Mongoose pour les produits

    if (!product) {
      // Si le produit n'existe pas, renvoyez une réponse JSON 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Si le produit existe, passez à la gestion des routes suivantes
    next();
  } catch (error) {
    // Gérez les erreurs de base de données ici
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// };

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  const response = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };
  res.json(response);
};

export { notFound, errorHandler };
