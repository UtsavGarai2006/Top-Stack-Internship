import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

const emptyForm = {
    customerName: "",
    productName: "",
    rating: 5,
    comment: ""
};

function App() {
    const [form, setForm] = useState(emptyForm);
    const [reviews, setReviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Get all reviews when the page loads
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setReviews(response.data);
        } catch (error) {
            setMessage("Could not load reviews. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: name === "rating" ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, form);
                setMessage("Review updated successfully.");
            } else {
                await axios.post(API_URL, form);
                setMessage("Review added successfully.");
            }

            setForm(emptyForm);
            setEditingId(null);
            await fetchReviews();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong."
            );
        }
    };

    const handleEdit = (review) => {
        setForm({
            customerName: review.customerName,
            productName: review.productName,
            rating: review.rating,
            comment: review.comment
        });

        setEditingId(review._id);
        setMessage("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/${id}`);
            setMessage("Review deleted successfully.");
            await fetchReviews();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Could not delete review."
            );
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
        setMessage("");
    };

    return (
        <div className="page">
            <header className="header">
                <h1>Customer Review Board</h1>
                <p>Manage customer reviews</p>
            </header>

            <main className="container">
                <section className="card">
                    <h2>{editingId ? "Update Review" : "Add Review"}</h2>

                    <form onSubmit={handleSubmit}>
                        <label>Customer Name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={form.customerName}
                            onChange={handleChange}
                            placeholder="Enter customer name"
                            required
                        />

                        <label>Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={form.productName}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                        />

                        <label>Rating</label>
                        <select
                            name="rating"
                            value={form.rating}
                            onChange={handleChange}
                            required
                        >
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Good</option>
                            <option value={3}>3 - Average</option>
                            <option value={2}>2 - Poor</option>
                            <option value={1}>1 - Very Poor</option>
                        </select>

                        <label>Comment</label>
                        <textarea
                            name="comment"
                            value={form.comment}
                            onChange={handleChange}
                            placeholder="Write your review"
                            rows="4"
                            required
                        />

                        <div className="button-row">
                            <button type="submit" className="primary">
                                {editingId ? "Update Review" : "Add Review"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {message && <p className="message">{message}</p>}
                </section>

                <section className="reviews-section">
                    <div className="section-title">
                        <h2>All Reviews</h2>
                        <span>{reviews.length} review(s)</span>
                    </div>

                    {loading ? (
                        <p className="empty">Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                        <p className="empty">
                            No reviews found. Add the first review above.
                        </p>
                    ) : (
                        <div className="review-grid">
                            {reviews.map((review) => (
                                <article className="review-card" key={review._id}>
                                    <div className="review-top">
                                        <div>
                                            <h3>{review.productName}</h3>
                                            <p className="customer">
                                                By {review.customerName}
                                            </p>
                                        </div>

                                        <div className="rating">
                                            {"★".repeat(review.rating)}
                                            {"☆".repeat(5 - review.rating)}
                                        </div>
                                    </div>

                                    <p className="comment">
                                        {review.comment}
                                    </p>

                                    <div className="actions">
                                        <button
                                            className="edit"
                                            onClick={() => handleEdit(review)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete"
                                            onClick={() =>
                                                handleDelete(review._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer>
                <p>Copyright @ 2026,  All right reserved.</p>
            </footer>
        </div>
    );
}

export default App;
