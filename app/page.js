"use client";

import React, { useState, useEffect } from "react";

const BookPage = () => {
  const [book, setBook] = useState({});
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [error, setError] = useState({});

  const firstIndex = (page - 1) * limit;
  const lastIndex = firstIndex + limit;
  
  const currentData = list.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(list.length / limit);

  const validate = () => {
    const err = {};

    if (!book.image) err.image = "Book image link is required";
    if (!book.title) err.title = "Book title is required";
    if (!book.author) err.author = "Author is required";
    if (!book.category) err.category = "Category is required";
    if (!book.price) err.price = "Price is required";
    if (!book.description) err.description = "Description is required";

    setError(err);
    return Object.keys(err).length === 0;
  };

  const handlechange = (e) => {
    let { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    let newList;

    if (editId === null) {
      newList = [...list, { ...book, id: Date.now() }];
    } else {
      newList = list.map((item) => {
        if (item.id == editId) {
          return { ...book, id: editId };
        }
        return item;
      });
      setEditId(null);
    }

    setList(newList);
    localStorage.setItem("book-list", JSON.stringify(newList));
    setBook({});
  };

  const handleDelete = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    localStorage.setItem("book-list", JSON.stringify(newList));
  };

  const handleEdit = (id) => {
    const data = list.find((item) => item.id === id);
    if (data) {
      setBook(data);
      setEditId(id);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("book-list")) || [];
    setList(data);
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(list.length / limit);
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [list, page, limit]);

  return (
    <div className="container py-4">
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <h2>{editId ? "Edit Book Details" : "Add Book Details"}</h2>
          <form method="post" onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Book Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={book.image || ""}
                onChange={handlechange}
              />
              {error.image && (
                <span className="text-danger">{error.image}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Book Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={handlechange}
                value={book.title || ""}
              />
              {error.title && (
                <span className="text-danger">{error.title}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                onChange={handlechange}
                value={book.author || ""}
              />
              {error.author && (
                <span className="text-danger">{error.author}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                onChange={handlechange}
                value={book.category || ""}
              />
              {error.category && (
                <span className="text-danger">{error.category}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                onChange={handlechange}
                value={book.price || ""}
              />
              {error.price && (
                <span className="text-danger">{error.price}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control p-3"
                id="description"
                name="description"
                onChange={handlechange}
                value={book.description || ""}
              />
              {error.description && (
                <span className="text-danger">{error.description}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {editId ? "Update Book" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h2>Book Directory</h2>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th colSpan="2" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((value, index) => {
                  const {
                    id,
                    image,
                    title,
                    author,
                    category,
                    price,
                    description,
                  } = value;
                  return (
                    <tr key={id}>
                      <td>{firstIndex + index + 1}</td>
                      <td>
                        {image ? (
                          <img
                            src={image}
                            alt={title}
                            width="60"
                            height="80"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{title}</td>
                      <td>{author}</td>
                      <td>{category}</td>
                      <td>${price}</td>
                      <td>{description}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">
                      No books added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

        <div className="row justify-content-end mt-3">
          <div className="col-auto">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${page === index + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${page === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
    </div>
  );
};

export default BookPage;