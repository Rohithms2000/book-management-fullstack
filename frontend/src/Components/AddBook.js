import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";

function AddBook({ show, handleClose, onBookAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    rating: "",
    publicationDate: "",
  });

  const [errors, setErrors] = useState({}); // to hold backend validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // clear error for that field when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/books`, formData);

      if (onBookAdded) {
        onBookAdded(response.data);
      }

      setFormData({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        rating: "",
        publicationDate: "",
      });
      setErrors({});
      handleClose();

    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Backend validation errors
        setErrors(error.response.data);
      } else {
        console.error("Error adding book:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-semibold text-primary">
            Add a Book
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label className="fw-semibold text-secondary small">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  className="rounded-3 shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formAuthor">
                <Form.Label className="fw-semibold text-secondary small">Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={handleChange}
                  isInvalid={!!errors.author}
                  className="rounded-3 shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formISBN">
                <Form.Label className="fw-semibold text-secondary small">ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="isbn"
                  placeholder="Enter ISBN"
                  value={formData.isbn}
                  onChange={handleChange}
                  isInvalid={!!errors.isbn}
                  className="rounded-3 shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isbn}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formGenre">
                <Form.Label className="fw-semibold text-secondary small">Genre</Form.Label>
                <Form.Select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  isInvalid={!!errors.genre}
                  className="rounded-3 shadow-sm"
                >
                  <option value="">Select genre</option>
                  <option value="FICTION">Fiction</option>
                  <option value="NON_FICTION">Non-Fiction</option>
                  <option value="MYSTERY">Mystery</option>
                  <option value="FANTASY">Fantasy</option>
                  <option value="ROMANCE">Romance</option>
                  <option value="SCI_FI">Sci-Fi</option>
                  <option value="OTHERS">Others</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formRating">
                <Form.Label className="fw-semibold text-secondary small">Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  placeholder="Rate out of 5"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.rating}
                  onChange={handleChange}
                  isInvalid={!!errors.rating}
                  className="rounded-3 shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.rating}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formPublicationDate">
                <Form.Label className="fw-semibold text-secondary small">Publication Date</Form.Label>
                <Form.Control
                  type="date"
                  name="publicationDate"
                  value={formData.publicationDate}
                  onChange={handleChange}
                  isInvalid={!!errors.publicationDate}
                  className="rounded-3 shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.publicationDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={handleClose} className="px-4 rounded-3">
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="px-4 rounded-3 shadow-sm">
            Save Book
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddBook;
