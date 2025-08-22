import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Pagination } from "react-bootstrap";
import { BsJournalPlus, BsTrash, BsChevronUp, BsChevronDown, BsChevronExpand } from "react-icons/bs";
import axios from "axios";
import AddBook from "./AddBook";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../api";

const HomeList = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust rows per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/books`) // list books api
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleRowClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/books/${id}`);
      toast.success("Book deleted successfully!");
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  // Sorting logic
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedBooks = React.useMemo(() => {
    let sortableBooks = [...books];
    if (sortConfig.key) {
      sortableBooks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableBooks;
  }, [books, sortConfig]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <BsChevronExpand className="ms-1 text-muted" />;
    return sortConfig.direction === "asc" ? (
      <BsChevronUp className="ms-1 text-success" />
    ) : (
      <BsChevronDown className="ms-1 text-success" />
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px 0",
      }}
    >
      <Container className="mt-5">
        <ToastContainer position="top-center" autoClose={2000} />
        <Row className="align-items-center mb-3">
          <Col md={12} className="text-center mb-2">
            <h2 className="fw-bold text-info">📚 Book Management System</h2>
          </Col>
          <Col className="text-end">
            <BsJournalPlus
              onClick={handleOpen}
              style={{ cursor: "pointer" }}
              className="fs-2 me-2 text-secondary"
              title="Add New Book"
            />
          </Col>
        </Row>

        <div className="p-4 shadow rounded bg-white">
          {/* sortable table */}
          <Table bordered hover responsive className="mb-0 align-middle">
            <thead className="table-success">
              <tr>
                <th onClick={() => requestSort("title")} style={{ cursor: "pointer" }}>
                  Title {getSortIcon("title")}
                </th>
                <th onClick={() => requestSort("author")} style={{ cursor: "pointer" }}>
                  Author {getSortIcon("author")}
                </th>
                <th onClick={() => requestSort("publicationDate")} style={{ cursor: "pointer" }}>
                  Publication Date {getSortIcon("publicationDate")}
                </th>
                <th onClick={() => requestSort("isbn")} style={{ cursor: "pointer" }}>
                  ISBN {getSortIcon("isbn")}
                </th>
                <th onClick={() => requestSort("genre")} style={{ cursor: "pointer" }}>
                  Genre {getSortIcon("genre")}
                </th>
                <th onClick={() => requestSort("rating")} style={{ cursor: "pointer" }}>
                  Rating {getSortIcon("rating")}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr
                    key={book.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(book.id)}
                  >
                    <td className="fw-normal text-muted">{book.title}</td>
                    <td className="fw-normal text-muted">{book.author}</td>
                    <td className="fw-normal text-muted">{book.publicationDate}</td>
                    <td className="fw-normal text-muted">{book.isbn}</td>
                    <td className="fw-normal text-muted">{book.genre}</td>
                    <td className="fw-normal text-muted">{book.rating}</td>
                    <td>
                      <BsTrash
                        onClick={(e) => handleDelete(e, book.id)}
                        style={{ cursor: "pointer" }}
                        className="fs-4 text-danger"
                        title="Delete Book"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No Books Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}

        {/* Add Book Modal */}
        <AddBook
          show={showModal}
          handleClose={handleClose}
          onBookAdded={(newBook) => setBooks((prev) => [...prev, newBook])}
        />
      </Container>
    </div>
  );
};

export default HomeList;
