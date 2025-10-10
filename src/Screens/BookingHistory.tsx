import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { apiRequest } from '../Api_List/apiUtils';
// import ApiList from '../Api_List/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch booking history
  // const fetchBookings = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await apiRequest({
  //       url: ApiList.bookingHistory,
  //       method: 'GET',
  //     });

  //     if (response?.success) {
  //       setBookings(response.data || []);
  //     } else {
  //       setBookings([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching booking history:', error);
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBookings();
  // }, []);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   fetchBookings();
  // }, []);

  const renderBookingCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.resortName}>{item.resort_name}</Text>
        <Text
          style={[
            styles.status,
            {
              backgroundColor:
                item.status === 'Confirmed'
                  ? '#28a745'
                  : item.status === 'Cancelled'
                  ? '#dc3545'
                  : '#ffc107',
            },
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.location}>
        <LucideIcons.MapPin size={16} color="#777" /> {item.location}
      </Text>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Check-in:</Text>
        <Text style={styles.detailValue}>{item.check_in}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Check-out:</Text>
        <Text style={styles.detailValue}>{item.check_out}</Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#003366" />
        <Text>Loading your bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <View style={styles.centered}>
          <LucideIcons.CalendarX size={40} color="#aaa" />
          <Text style={styles.noText}>No bookings found</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderBookingCard}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resortName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003366',
  },
  status: {
    color: '#fff',
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 12,
  },
  location: {
    marginVertical: 6,
    color: '#555',
    fontSize: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  detailLabel: {
    color: '#555',
    fontWeight: '600',
  },
  detailValue: {
    color: '#333',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
  },
  viewButton: {
    backgroundColor: '#003366',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noText: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
  },
});

export default BookingHistory;
