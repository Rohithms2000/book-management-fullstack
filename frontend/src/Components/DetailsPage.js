import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab, Container, Card, Row, Col } from "react-bootstrap";
import { BsListColumnsReverse } from "react-icons/bs";
import API_BASE_URL from "../api";

const DetailsPage = () => {
  const { id } = useParams(); // get book id from URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  const [moreDetails, setMoreDetails] = useState(null);

  const fetchMoreDetails = async () => {
    try {
      // proxy external api(google books)
      const response = await axios.get(
        `${API_BASE_URL}/api/books/${id}/more-details`
      );
      setMoreDetails(response.data);
    } catch (error) {
      console.error("Error fetching more details:", error);
    }
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px 0",
      }}
    >
      <Container
        className="p-4 rounded shadow"
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "70%",
        }}
      >
        {/* Back Button */}
        <BsListColumnsReverse
          onClick={() => navigate("/")}
          title="Back to list"
          style={{
            cursor: "pointer",
            fontSize: "1.6rem",
            marginBottom: "15px",
            color: "#333",
          }}
        />

        <Tabs defaultActiveKey="basicDetails" className="mb-3" fill>
          <Tab eventKey="basicDetails" title="📖 Basic Details">
            <Card border="secondary" className="mt-3 shadow-sm">
              <Row>
                <Col md={12}>
                  <Card.Body>
                    <Card.Title className="fw-bold fs-4 text-secondary">
                      {book.title}
                    </Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {book.author}
                    </Card.Text>
                    <Card.Text>
                      <strong>ISBN:</strong> {book.isbn}
                    </Card.Text>
                    <Card.Text>
                      <strong>Genre:</strong> {book.genre}
                    </Card.Text>
                    <Card.Text>
                      <strong>Rating:</strong> {book.rating}
                    </Card.Text>
                    <Card.Text>
                      <strong>Publication Date:</strong>{" "}
                      {book.publicationDate}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Tab>

          <Tab
            eventKey="moreDetails"
            title="🔍 More Details"
            onEnter={fetchMoreDetails} // triggers API call when switching to tab
          >
            {moreDetails ? (
              <div className="p-3">
                <h5 className="fw-bold text-secondary">From Google Books:</h5>

                <p>
                  <strong>Title:</strong>{" "}
                  {moreDetails.items?.[0]?.volumeInfo?.title}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {moreDetails.items?.[0]?.volumeInfo?.description}
                </p>

                <p>
                  <strong>Authors:</strong>{" "}
                  {moreDetails.items?.[0]?.volumeInfo?.authors?.join(", ")}
                </p>

                {/* Thumbnail image */}
                {moreDetails.items?.[0]?.volumeInfo?.imageLinks && (
                  <div className="mb-3">
                    <strong>Thumbnail:</strong>
                    <br />
                    <img
                      src={
                        moreDetails.items[0].volumeInfo.imageLinks.extraLarge ||
                        moreDetails.items[0].volumeInfo.imageLinks.large ||
                        moreDetails.items[0].volumeInfo.imageLinks.medium ||
                        moreDetails.items[0].volumeInfo.imageLinks.thumbnail ||
                        moreDetails.items[0].volumeInfo.imageLinks.smallThumbnail
                      }
                      alt="Book Thumbnail"
                      style={{
                        width: "250px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                )}

                {/* Categories */}
                <p>
                  <strong>Categories:</strong>{" "}
                  {moreDetails.items?.[0]?.volumeInfo?.categories?.join(", ")}
                </p>

                {/* Info Link */}
                {moreDetails.items?.[0]?.volumeInfo?.infoLink && (
                  <p>
                    <strong>More Info:</strong>{" "}
                    <a
                      href={moreDetails.items[0].volumeInfo.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Books
                    </a>
                  </p>
                )}

                {/* Buy Link*/}
                {moreDetails.items?.[0]?.saleInfo?.buyLink && (
                  <p>
                    <strong>Buy Link:</strong>{" "}
                    <a
                      href={moreDetails.items[0].saleInfo.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-success"
                    >
                      Purchase Here
                    </a>
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted">Loading more details...</p>
            )}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default DetailsPage;
