import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";

const Products = () => {
  //     const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!localStorage.getItem("token")) {
  //       navigate("/login");
  //     }
  //   }, []);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://se-lab-backend-pe25.onrender.com/user/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      } else {
        setErrorMessage("Error fetching products");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://se-lab-backend-pe25.onrender.com/user/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      //   const {success,message} = data;

      if (response.ok) {
        fetchProducts();
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
        });
      } else {
        setErrorMessage(data.message || "Error adding product");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://se-lab-backend-pe25.onrender.com/user/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchProducts();
      } else {
        setErrorMessage("Error deleting product");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://se-lab-backend-pe25.onrender.com/user/products/${productToEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productToEdit),
        }
      );

      if (response.ok) {
        fetchProducts();
        setIsModalOpen(false);
      } else {
        setErrorMessage("Error updating product");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

    const logout = () => {
    localStorage.removeItem('token')
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
      onClick={logout}
        type="submit"
        className="  bg-blue-600 text-white text-md font-semibold rounded-lg p-3 hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Logout
      </button>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Product Management
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-700">Add New Product</h3>
          <form
            onSubmit={handleAddProduct}
            className="space-y-6 mt-4 bg-white p-6 rounded-lg shadow-md"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter product description"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter product price"
                required
                min="0"
                step="1"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter product category"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Add Product
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-700">Product List</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 relative"
                >
                  <h4 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="mt-4 text-lg font-semibold text-blue-600">
                    ${product.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Category: {product.category}
                  </p>

                  <div className="absolute top-2 right-2 flex space-x-4">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:text-blue-800 transition duration-200 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800 transition duration-200 text-xl"
                    >
                      <MdAutoDelete />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No products available.
              </p>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Edit Product
              </h3>
              <form onSubmit={handleUpdateProduct} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productToEdit?.name}
                    onChange={(e) =>
                      setProductToEdit({
                        ...productToEdit,
                        name: e.target.value,
                      })
                    }
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={productToEdit?.description}
                    onChange={(e) =>
                      setProductToEdit({
                        ...productToEdit,
                        description: e.target.value,
                      })
                    }
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productToEdit?.price}
                    onChange={(e) =>
                      setProductToEdit({
                        ...productToEdit,
                        price: e.target.value,
                      })
                    }
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={productToEdit?.category}
                    onChange={(e) =>
                      setProductToEdit({
                        ...productToEdit,
                        category: e.target.value,
                      })
                    }
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Update Product
                </button>
              </form>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
