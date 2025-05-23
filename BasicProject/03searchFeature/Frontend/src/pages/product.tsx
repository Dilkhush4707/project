import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../utills/util";

interface Product {
  _id: string;
  productName: string;
  // Add other product fields as necessary
}

const Product: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { productId } = useParams<{ productId: string }>();

  const getProductInfo = async () => {
    try {
      const url = `${API_KEY}/products/${productId}`;
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error("Failed to fetch product");
      }
      const jsondata = await result.json();
      setProduct(jsondata.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductInfo(); // Call the function
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <div className="productdetails">
      {error && <p className="error">{error}</p>} {/* Error handling */}
      {product ? (<div>
        <h1>{product.productName}
        </h1>
        <h1>{product.description}
        </h1>
        <h1>{product.price}
        </h1>
        </div>
         // Display product name
      ) : (
        <span>No product found</span>
      )}
    </div>
  );
};

export default Product;