const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/Review");

const router = express.Router();

// GET /api/reviews - Show all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
});

// GET /api/reviews/:id - Show one review
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid review ID" });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch review" });
    }
});

// POST /api/reviews - Add review
router.post("/", async (req, res) => {
    try {
        const review = await Review.create({
            customerName: req.body.customerName,
            productName: req.body.productName,
            rating: req.body.rating,
            comment: req.body.comment
        });

        res.status(201).json(review);
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (item) => item.message
            );
            return res.status(400).json({ message: messages.join(", ") });
        }

        res.status(500).json({ message: "Failed to add review" });
    }
});

// PUT /api/reviews/:id - Update review
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid review ID" });
        }

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            {
                customerName: req.body.customerName,
                productName: req.body.productName,
                rating: req.body.rating,
                comment: req.body.comment
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json(review);
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (item) => item.message
            );
            return res.status(400).json({ message: messages.join(", ") });
        }

        res.status(500).json({ message: "Failed to update review" });
    }
});

// DELETE /api/reviews/:id - Delete review
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid review ID" });
        }

        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete review" });
    }
});

module.exports = router;
