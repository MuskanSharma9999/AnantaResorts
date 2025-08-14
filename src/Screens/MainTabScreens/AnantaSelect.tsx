import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/ServicesScreenStyles';

const AnantaSelect = () => {
  const services = [
    {
      id: 1,
      name: 'Spa & Wellness',
      description:
        'Rejuvenate your body and mind with our premium spa services',
      icon: 'flower',
      price: 'From $150',
    },
    {
      id: 2,
      name: 'Fine Dining',
      description:
        'Experience culinary excellence at our award-winning restaurants',
      icon: 'restaurant',
      price: 'À la carte',
    },
    {
      id: 3,
      name: 'Adventure Sports',
      description: 'Thrilling water sports and outdoor activities',
      icon: 'boat',
      price: 'From $80',
    },
    {
      id: 4,
      name: 'Conference Rooms',
      description: 'State-of-the-art facilities for business meetings',
      icon: 'business',
      price: 'From $200/hr',
    },
    {
      id: 5,
      name: 'Airport Transfer',
      description: 'Luxury transportation to and from the airport',
      icon: 'car',
      price: '$50 one way',
    },
    {
      id: 6,
      name: 'Concierge',
      description: '24/7 personal assistance for all your needs',
      icon: 'person',
      price: 'Complimentary',
    },
  ];

  const facilities = [
    { name: 'Swimming Pool', icon: 'water' },
    { name: 'Fitness Center', icon: 'fitness' },
    { name: 'Beach Access', icon: 'sunny' },
    { name: 'Free WiFi', icon: 'wifi' },
    { name: 'Parking', icon: 'car-sport' },
    { name: 'Room Service', icon: 'bed' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Our Services</Text>

      {/* Services */}
      <View style={styles.section}>
        {services.map(service => (
          <TouchableOpacity key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <Icon name={service.icon} size={28} color="#2E86AB" />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Facilities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resort Facilities</Text>
        <View style={styles.facilitiesGrid}>
          {facilities.map((facility, index) => (
            <View key={index} style={styles.facilityCard}>
              <Icon name={facility.icon} size={24} color="#2E86AB" />
              <Text style={styles.facilityText}>{facility.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <TouchableOpacity style={styles.contactButton}>
          <Icon name="call" size={20} color="white" />
          <Text style={styles.contactButtonText}>Call Concierge</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AnantaSelect;
