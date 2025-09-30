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
        bgColor: '#fef2f2',
      };
    if (daysLeft <= 3)
      return {
        color: '#f59e0b',
        text: 'Expiring Soon',
        bgColor: '#fffbeb',
      };
    return {
      color: '#10b981',
      text: 'Active',
      bgColor: '#f0fdf4',
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
    const daysLeft = Math.max(0, getDaysUntilExpiry(item.expires_at));

    return (
      <View style={styles.cardContainer}>
        {/* Modern header with gradient effect */}
        <View style={styles.cardHeader}>
          <View style={styles.brandSection}>
            <View style={styles.logoPlaceholder} />
            <View>
              <Text style={styles.brandName}>Premium Offer</Text>
              <Text style={styles.offerType}>
                {item.voucher_type.voucher_category}
              </Text>
            </View>
          </View>
          <View
            style={[styles.statusBadge, { backgroundColor: status.bgColor }]}
          >
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.text}
            </Text>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.cardContent}>
          <Text style={styles.voucherName}>{item.voucher_type.name}</Text>
          <Text style={styles.voucherDescription}>
            {item.voucher_type.description}
          </Text>

          {/* Progress bar for urgency */}
          {!isExpired && (
            <View style={styles.urgencyBar}>
              <View
                style={[
                  styles.urgencyProgress,
                  {
                    width: `${Math.min(100, (daysLeft / 30) * 100)}%`,
                    backgroundColor: daysLeft <= 3 ? '#f59e0b' : '#10b981',
                  },
                ]}
              />
            </View>
          )}
        </View>

        {/* Bottom section with CTA */}
        <View style={styles.cardFooter}>
          <View style={styles.expirySection}>
            <Text style={styles.expiryLabel}>Expires in</Text>
            <View style={styles.daysContainer}>
              <Text style={styles.daysCount}>{daysLeft}</Text>
              <Text style={styles.daysText}>days</Text>
            </View>
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
              {isExpired ? 'Expired' : 'Redeem Now'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modern decorative elements */}
        <View style={styles.cornerAccent} />
        <View style={[styles.cornerAccent, styles.cornerAccentBottom]} />
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
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
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 24,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    marginRight: 12,
    opacity: 0.8,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  offerType: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '500',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: 20,
  },
  voucherName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  voucherDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  urgencyBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  urgencyProgress: {
    height: '100%',
    borderRadius: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expirySection: {
    alignItems: 'flex-start',
  },
  expiryLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
    fontWeight: '500',
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  daysCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginRight: 4,
  },
  daysText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  redeemButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  redeemButtonDisabled: {
    backgroundColor: '#cbd5e1',
    shadowColor: '#64748b',
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cornerAccent: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8b5cf6',
    opacity: 0.05,
  },
  cornerAccentBottom: {
    top: 'auto',
    right: 'auto',
    bottom: -20,
    left: -20,
    backgroundColor: '#10b981',
  },
  loadingCard: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  errorCard: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    maxWidth: 300,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
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
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    maxWidth: 300,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MyVouchers;
