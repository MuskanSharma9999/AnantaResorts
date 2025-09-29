import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

const ReviewModal = ({ visible, onClose, onSubmit, submitting }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      Alert.alert('Required Fields', 'Please provide both rating and comment');
      return;
    }

    const success = await onSubmit({
      rating,
      title: title.trim() || `Rating: ${rating} stars`,
      comment,
    });

    if (success) {
      setRating(0);
      setTitle('');
      setComment('');
      onClose();
    }
  };

  const handleClose = () => {
    setRating(0);
    setTitle('');
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
            <TouchableOpacity onPress={handleClose} disabled={submitting}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>Rate your experience:</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  disabled={submitting}
                >
                  <Text
                    style={[
                      styles.starInput,
                      {
                        color: star <= rating ? '#FFD700' : '#444',
                      },
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Title Input */}
          <TextInput
            style={styles.modalTitleInput}
            placeholder="Review title (optional)"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            editable={!submitting}
          />

          {/* Comment Input */}
          <TextInput
            style={styles.modalCommentInput}
            placeholder="Tell us about your experience... *"
            placeholderTextColor="#888"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            editable={!submitting}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.modalSubmitButton,
              (submitting || rating === 0 || !comment.trim()) &&
                styles.modalSubmitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={submitting || rating === 0 || !comment.trim()}
          >
            <Text style={styles.modalSubmitButtonText}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starInput: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  modalTitleInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  modalCommentInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: '#fff',
  },
  modalSubmitButton: {
    backgroundColor: '#E0C48F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: '#6B7280',
    opacity: 0.6,
  },
  modalSubmitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default ReviewModal;
