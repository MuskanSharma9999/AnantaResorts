import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

const ReviewModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0 || !comment.trim()) {
      alert('Please provide both rating and comment');
      return;
    }

    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>Rate your experience:</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text
                    style={[
                      styles.starInput,
                      {
                        color: star <= rating ? '#FFD700' : '#CCC',
                      },
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comment Input */}
          <TextInput
            style={styles.modalCommentInput}
            placeholder="Tell us about your experience..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.modalSubmitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.modalSubmitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Reviews = ({ resort }) => {
  const [reviews, setReviews] = useState(resort?.reviews || []);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleSubmitReview = reviewData => {
    const newReview = {
      ...reviewData,
      id: Date.now(),
      user: 'Current User',
      handle: '@user123',
      date: new Date().toLocaleDateString('en-GB'),
      isVerified: true,
      avatar: 'https://picsum.photos/100/100',
    };

    setReviews([newReview, ...reviews]);
  };

  return (
    <ScrollView style={styles.reviewsContainer}>
      {/* Add Review Button */}
      <TouchableOpacity
        style={styles.addReviewButton}
        onPress={() => setShowReviewModal(true)}
      >
        <Text style={styles.addReviewButtonText}>+ Write a Review</Text>
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.clientsSayTitle}>See what clients are saying</Text>

      {/* List of Reviews */}
      {reviews.length > 0 ? (
        reviews.map(review => (
          <View key={review.id} style={styles.reviewCard}>
            <Text style={styles.reviewUser}>{review.user}</Text>
            <Text style={styles.reviewHandle}>{review.handle}</Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
            <View style={styles.reviewStars}>
              {[...Array(5)].map((_, index) => (
                <Text
                  key={index}
                  style={{
                    color: index < review.rating ? '#FFD700' : '#CCC',
                    fontSize: 20,
                  }}
                >
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noReviewsText}>No reviews yet. Be the first!</Text>
      )}

      {/* Review Modal */}
      <ReviewModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  addReviewButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addReviewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  clientsSayTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },

  reviewCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewHandle: {
    color: '#777',
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 12,
    color: '#aaa',
    marginVertical: 5,
  },
  reviewStars: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 20,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 20,
    color: '#333',
  },
  ratingSection: {
    marginVertical: 15,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starInput: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  modalCommentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
    height: 100,
  },
  modalSubmitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSubmitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Reviews;
