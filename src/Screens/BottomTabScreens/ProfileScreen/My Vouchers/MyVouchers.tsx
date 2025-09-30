import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ApiList from '../../../../Api_List/apiList';
import { apiRequest } from '../../../../Api_List/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const MyVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // comment added

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
          setError('Authentication token missing');
          Alert.alert('Error', 'Please login again');
          return;
        }

        const response = await apiRequest({
          url: ApiList.GET_ALL_VOUCHERS,
          method: 'GET',
          token,
        });

        console.log('Vouchers Response:', response);

        if (response.success) {
          setVouchers(response.data.data || []);
        } else {
          setError(response.error || 'Failed to fetch vouchers');
        }
      } catch (error) {
        console.log('Error fetching vouchers:', error);
        setError('Network error occurred');
        Alert.alert('Error', 'Failed to load vouchers');
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handleRedeem = voucherId => {
    Alert.alert('Redeem Voucher', `Redeeming voucher with ID: ${voucherId}`);
  };

  const getDaysUntilExpiry = expiryDate => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusInfo = expiryDate => {
    const daysLeft = getDaysUntilExpiry(expiryDate);
    if (daysLeft < 0)
      return {
        color: '#ef4444',
        text: 'Expired',
        gradient: ['#dc2626', '#b91c1c'],
      };
    if (daysLeft <= 3)
      return {
        color: '#f59e0b',
        text: 'Expiring Soon',
        gradient: ['#d97706', '#b45309'],
      };
    return {
      color: '#10b981',
      text: 'Active',
      gradient: ['#059669', '#047857'],
    };
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>Loading your vouchers...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderVoucherItem = ({ item, index }) => {
    const status = getStatusInfo(item.expires_at);
    const isExpired = getDaysUntilExpiry(item.expires_at) < 0;

    return (
      <View
        style={[
          styles.cardContainer,
          index % 2 === 0 ? styles.cardLeft : styles.cardRight,
        ]}
      >
        {/* Status Ribbon */}
        <View style={[styles.statusRibbon, { backgroundColor: status.color }]}>
          <Text style={styles.ribbonText}>{status.text}</Text>
        </View>

        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>OFFER</Text>
          </View>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>
              {item.voucher_type.voucher_category}
            </Text>
          </View>
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <Text style={styles.voucherName}>{item.voucher_type.name}</Text>
          <Text style={styles.voucherDescription}>
            {item.voucher_type.description}
          </Text>

          <View style={styles.expirySection}>
            <Text style={styles.expiryLabel}>Valid until</Text>
            <Text style={styles.expiryDate}>
              {new Date(item.expires_at).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.daysLeft}>
            <Text style={styles.daysLeftLabel}>Days Left</Text>
            <Text style={[styles.daysLeftCount, { color: status.color }]}>
              {Math.max(0, getDaysUntilExpiry(item.expires_at))}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.redeemButton,
              isExpired && styles.redeemButtonDisabled,
            ]}
            onPress={() => handleRedeem(item.id)}
            disabled={isExpired}
          >
            <Text style={styles.redeemButtonText}>
              {isExpired ? 'Expired' : 'Redeem'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Pattern */}
        <View style={styles.cardPattern}>
          <View style={styles.patternCircle} />
          <View style={styles.patternCircle} />
          <View style={styles.patternCircle} />
          <View style={styles.patternCircle} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>My Vouchers</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{vouchers.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {
                vouchers.filter(v => getDaysUntilExpiry(v.expires_at) >= 0)
                  .length
              }
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {
                vouchers.filter(
                  v =>
                    getDaysUntilExpiry(v.expires_at) <= 3 &&
                    getDaysUntilExpiry(v.expires_at) >= 0,
                ).length
              }
            </Text>
            <Text style={styles.statLabel}>Expiring</Text>
          </View>
        </View>
      </View>

      {vouchers.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🎫</Text>
            <Text style={styles.emptyTitle}>No Vouchers Yet</Text>
            <Text style={styles.emptyDescription}>
              You don't have any vouchers at the moment. Check back later for
              new offers!
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={vouchers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderVoucherItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    width: (width - 48) / 2,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardLeft: {
    marginRight: 8,
  },
  cardRight: {
    marginLeft: 8,
  },
  statusRibbon: {
    position: 'absolute',
    top: 16,
    right: -20,
    paddingHorizontal: 20,
    paddingVertical: 4,
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  ribbonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  discountBadge: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  discountGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: '#8b5cf6',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
    marginBottom: 16,
  },
  voucherName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
    lineHeight: 20,
  },
  voucherDescription: {
    fontSize: 12,
    color: '#cbd5e1',
    lineHeight: 16,
    marginBottom: 12,
  },
  expirySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 8,
    borderRadius: 8,
  },
  expiryLabel: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 11,
    color: '#f8fafc',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daysLeft: {
    alignItems: 'center',
  },
  daysLeftLabel: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 2,
  },
  daysLeftCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  redeemButton: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 80,
  },
  redeemButtonDisabled: {
    opacity: 0.6,
  },
  redeemGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardPattern: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    opacity: 0.1,
  },
  patternCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8b5cf6',
    marginLeft: 2,
  },
  loadingCard: {
    backgroundColor: '#1e293b',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#cbd5e1',
  },
  errorCard: {
    backgroundColor: '#1e293b',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    maxWidth: 300,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCard: {
    backgroundColor: '#1e293b',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    maxWidth: 300,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MyVouchers;
