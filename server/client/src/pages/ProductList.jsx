import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState({});

  useEffect(() => {
  axios.get("http://localhost:5000/products")
    .then((res) => {
      const sorted = res.data.sort((a, b) => {
        const aNum = parseInt(a.articleNo.replace(/\D/g, ""));
        const bNum = parseInt(b.articleNo.replace(/\D/g, ""));
        return aNum - bNum;
      });
      setProducts(sorted);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
    });
}, []);


  const handleChange = (id, field, value) => {
    setEditedProducts(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };
  const handleSave = (id) => {
  const updatedData = editedProducts[id];
  if (!updatedData) return;

  axios.put(`http://localhost:5000/products/${id}`, updatedData)
    .then(() => {
      setProducts(prev => {
        const updatedList = prev.map(prod =>
          prod.id === id ? { ...prod, ...updatedData } : prod
        );
        return updatedList; // ❌ NO sorting here
      });

      setEditedProducts(prev => {
        const newEdits = { ...prev };
        delete newEdits[id];
        return newEdits;
      });
    })
    .catch(error => console.error('Save failed:', error));
    toast.success('Product saved successfully!', {
  position: 'top-right',
  autoClose: 2000,
});

};


  return (
    <>
      <div className="header-bar">Product Management</div>

      <div className="control-panel">
        <div className="search-group">
          <div className="search-box">
            <input type="text" placeholder="Search Article No..." />
            <span className="icon">🔍</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search Product..." />
            <span className="icon">🔍</span>
          </div>
        </div>

        <div className="buttons">
          <button className="btn">+ New Product</button>
          <button className="btn">Print List</button>
          <button className="btn">Advanced Mode</button>
        </div>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Article No.</th>
              <th>Product/Service</th>
              <th>In Price</th>
              <th>Price</th>
              <th>Unit</th>
              <th>In Stock</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.articleNo}</td>
                <td>
                  <input
                    value={editedProducts[product.id]?.productName ?? product.productName}
                    onChange={e => handleChange(product.id, 'productName', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editedProducts[product.id]?.inPrice ?? product.inPrice}
                    onChange={e => handleChange(product.id, 'inPrice', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editedProducts[product.id]?.price ?? product.price}
                    onChange={e => handleChange(product.id, 'price', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editedProducts[product.id]?.unit ?? product.unit}
                    onChange={e => handleChange(product.id, 'unit', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editedProducts[product.id]?.inStock ?? product.inStock}
                    onChange={e => handleChange(product.id, 'inStock', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editedProducts[product.id]?.description ?? product.description}
                    onChange={e => handleChange(product.id, 'description', e.target.value)}
                  />
                </td>
                <td>
                  <button className="btn save-btn" onClick={() => handleSave(product.id)}>Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />

      </div>
    </>
  );
};

export default ProductList;
