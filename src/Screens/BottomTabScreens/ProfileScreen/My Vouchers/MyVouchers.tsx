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
import GradientButton from '../../../../components/Buttons/GradientButton';

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
        color: '#FBCF9C',
        text: 'Expired',
        bgColor: '#2A1A0A',
      };
    if (daysLeft <= 3)
      return {
        color: '#FBCF9C',
        text: 'Expiring Soon',
        bgColor: '#2A200A',
      };
    return {
      color: '#FBCF9C',
      text: 'Active',
      bgColor: '#1A2A0A',
    };
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#FBCF9C" />
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
                    backgroundColor: '#FBCF9C',
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

          <GradientButton
            title={isExpired ? 'Expired' : 'Redeem Now'}
            style={{ maxWidth: 150 }}
            onPress={() => handleRedeem(item.id)}
          ></GradientButton>

          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 32,
    color: '#FBCF9C',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 8,
    shadowColor: '#FBCF9C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: '#FBCF9C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FBCF9C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
    opacity: 0.8,
  },
  listContainer: {
    paddingBottom: 24,
  },
  cardContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#FBCF9C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FBCF9C',
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
    backgroundColor: '#FBCF9C',
    marginRight: 12,
    opacity: 0.8,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FBCF9C',
  },
  offerType: {
    fontSize: 12,
    color: '#FBCF9C',
    fontWeight: '500',
    marginTop: 2,
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
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
    // fontWeight: 'bold',
    color: '#FBCF9C',
    marginBottom: 8,
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  voucherDescription: {
    fontSize: 14,
    color: '#FBCF9C',
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.8,
  },
  urgencyBar: {
    height: 4,
    backgroundColor: '#333333',
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
    color: '#FBCF9C',
    marginBottom: 4,
    fontWeight: '500',
    opacity: 0.7,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  daysCount: {
    fontSize: 24,
    color: '#FBCF9C',
    marginRight: 4,
  },
  daysText: {
    fontSize: 14,
    color: '#FBCF9C',
    opacity: 0.8,
  },
  redeemButton: {
    backgroundColor: '#FBCF9C',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#FBCF9C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  redeemButtonDisabled: {
    backgroundColor: '#333333',
    shadowColor: '#333333',
  },
  redeemButtonText: {
    color: '#000000',
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
    backgroundColor: '#FBCF9C',
    opacity: 0.1,
  },
  cornerAccentBottom: {
    top: 'auto',
    right: 'auto',
    bottom: -20,
    left: -20,
    backgroundColor: '#FBCF9C',
    opacity: 0.1,
  },
  loadingCard: {
    backgroundColor: '#1A1A1A',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#de9797ff',
    shadowColor: '#FBCF9C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FBCF9C',
    fontWeight: '500',
    opacity: 0.8,
  },
  errorCard: {
    backgroundColor: '#1A1A1A',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#FBCF9C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
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
    color: '#FBCF9C',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#FBCF9C',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    opacity: 0.8,
  },
  retryButton: {
    backgroundColor: '#FBCF9C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
  },
  retryButtonText: {
    color: '#000000',
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
    backgroundColor: '#1A1A1A',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#FBCF9C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
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
    color: '#FBCF9C',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#FBCF9C',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
});

export default MyVouchers;
