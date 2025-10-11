import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import GradientButton from '../../Buttons/GradientButton';

const { width } = Dimensions.get('window');

const ReviewModal = ({ visible, onClose, onSubmit, submitting }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      alert('Please provide both rating and comment');
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
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={submitting}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScrollView}>
            <View style={styles.reviewSection}>
              <View style={styles.ratingSection}>
                <Text style={styles.ratingLabel}>Rate your experience:</Text>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}
                      disabled={submitting}
                      style={styles.starInput}
                    >
                      <Text
                        style={{
                          color: star <= rating ? '#FFD700' : '#444',
                          fontSize: 40,
                        }}
                      >
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.reviewField}>
                <Text style={styles.reviewLabel}>Review Title (Optional)</Text>
                <TextInput
                  style={styles.modalTitleInput}
                  placeholder="Give your review a title"
                  placeholderTextColor="#888"
                  value={title}
                  onChangeText={setTitle}
                  maxLength={100}
                  editable={!submitting}
                />
              </View>

              <View style={styles.reviewField}>
                <Text style={styles.reviewLabel}>Your Review *</Text>
                <TextInput
                  style={styles.modalCommentInput}
                  placeholder="Tell us about your experience..."
                  placeholderTextColor="#888"
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!submitting}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.footer,
              (submitting || rating === 0 || !comment.trim()) &&
                styles.submitButtonDisabled,
            ]}
            disabled={submitting || rating === 0 || !comment.trim()}
          >
            <GradientButton
              onPress={handleSubmit}
              title={submitting ? 'Submitting...' : 'Submit Review'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalScrollView: {
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  reviewSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Montserrat',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  starInput: {
    marginHorizontal: 5,
  },
  reviewField: {
    marginBottom: 16,
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 10,
    fontFamily: 'Montserrat',
  },
  modalTitleInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  modalCommentInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  footer: {
    padding: 20,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1A1A1A',
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
});

export default ReviewModal;
