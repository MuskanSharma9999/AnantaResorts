import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import MembershipModal from '../MembershipModal';
import ApiList from '../../Api_List/apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from '../../Api_List/apiUtils';

// Replace these with the correct local images or URLs
const BACKGROUND_IMAGE = require('../../assets/images/signUpCarousel_images/img_1.jpg');
const ARROW_ICON = require('../../assets/images/onBoarding.png');
import styles from './JoinClubStyles';

export default function MembershipScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Plan1');
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateTabContent = () => {
    // Always return fallback content if membershipPlans is not a valid array
    if (!Array.isArray(membershipPlans) || membershipPlans.length === 0) {
      return {
        Plan1: {
          title: 'Basic Plan',
          price: '₹21000 / days',
          description:
            'Enjoy the essentials with access to select resorts and basic amenities for a flexible holiday experience.',
          benefits: ['Basic resort access', 'Standard amenities'],
        },
        Plan2: {
          title: 'Standard Plan',
          price: '₹4,554 / 4 days',
          description:
            'Get more flexibility, additional dining and spa vouchers, and priority booking privileges.',
          benefits: ['Extended access', 'Dining vouchers'],
        },
        Plan3: {
          title: 'Gold Membership',
          price: '₹46,999 / 365 days',
          description:
            'Experience luxury with unlimited access to all resorts, exclusive events, and premium benefits.',
          benefits: ['Premium access', 'Exclusive events'],
        },
      };
    }

    const tabContent = {};
    membershipPlans.forEach((plan, index) => {
      const planKey = `Plan${index + 1}`;

      // Parse benefits from the string format in your API response
      let benefits = [];
      if (plan && plan.benefits) {
        try {
          // Clean and parse the benefits string
          const cleanedBenefits = plan.benefits
            .replace(/[\[\]']/g, '') // Remove brackets and quotes
            .split(',') // Split by comma
            .map(benefit => benefit.trim()) // Trim whitespace
            .filter(benefit => benefit.length > 0); // Remove empty strings

          benefits = cleanedBenefits;
        } catch (error) {
          console.error('Error parsing benefits:', error);
          benefits = ['Standard membership benefits'];
        }
      } else {
        benefits = ['Standard membership benefits'];
      }

      tabContent[planKey] = {
        title: (plan && plan.name) || `Plan ${index + 1}`,
        price: `₹${parseFloat((plan && plan.price) || 0).toLocaleString(
          'en-IN',
        )} / ${(plan && plan.duration_days) || 30} days`,
        description:
          (plan && plan.description) ||
          'A comprehensive membership plan with great benefits.',
        benefits: benefits,
      };
    });

    return tabContent;
  };

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await apiRequest({
          url: ApiList.GET_MEMBERSHIP_PLANS,
          method: 'GET',
          token,
        });

        if (response.success) {
          const plans = response.data;
          console.log('Plans fetched:', plans);
          // Ensure we're setting an array
          if (Array.isArray(plans)) {
            setMembershipPlans(plans);
          } else if (plans && typeof plans === 'object') {
            // If response.data is an object, try to extract array from common property names
            setMembershipPlans(
              plans.plans || plans.data || plans.membership_plans || [],
            );
          } else {
            console.warn('API response data is not in expected format:', plans);
            setMembershipPlans([]);
          }
        } else {
          console.error('Failed to fetch membership plans:', response.error);
          setMembershipPlans([]);
        }
      } catch (error) {
        console.error('Error fetching membership plans:', error);
        setMembershipPlans([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipPlans();
  }, []);

  const tabContent = generateTabContent();

  // Get current benefits based on selected tab
  const currentBenefits = tabContent[selectedTab]?.benefits || [];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading membership plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image and Arrow */}
        <View style={styles.headerContainer}>
          <Image source={BACKGROUND_IMAGE} style={styles.headerImage} />
          <View style={styles.arrowContainer}>
            <Image source={ARROW_ICON} style={styles.arrowIcon} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Membership at Ananta</Text>
            <Text style={styles.headerSubtitle}>
              Our members just can't believe the unlimited benefits they enjoy
            </Text>
          </View>
        </View>

        {/* Tab Bar */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tabScrollView}
        >
          <View style={styles.tabBarContainer}>
            {Object.keys(tabContent).map(plan => (
              <TouchableOpacity
                key={plan}
                style={styles.tabItem}
                onPress={() => {
                  setSelectedTab(plan);
                }}
              >
                <View
                  style={[
                    styles.tabContentContainer,
                    selectedTab === plan && styles.tabItemSelected,
                  ]}
                >
                  <Text style={styles.tabContentTitle}>
                    {tabContent[plan].title}
                  </Text>
                  <Text style={styles.tabContentText}>
                    {tabContent[plan].price}
                  </Text>
                  <Text style={styles.tabContentText}>
                    {tabContent[plan].description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Selected Plan Benefits Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {tabContent[selectedTab]?.title} Benefits
          </Text>
          <Text style={styles.cardSubTitle}>
            Enjoy these exclusive benefits with your{' '}
            {tabContent[selectedTab]?.title}:
          </Text>
          {currentBenefits.map((benefit, index) => (
            <Text key={index} style={styles.listItem}>
              • {benefit}
            </Text>
          ))}
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            The Vacation Ownership With a Difference
          </Text>
          <Text style={styles.cardBody}>
            The new generation vacation ownership from Ananta Hotels & Resorts
            gives you the flexibility to create your own dream 'Happy Holidays'
            because it is modelled on the international system.
          </Text>
          <Text style={styles.cardBody}>
            Unlike conventional timeshare models, where you buy a fixed week,
            season & destination, Ananta gives you the flexibility to choose
            between destinations and season types. This flexibility opens up a
            world a choice as you are free to choose a holiday at any resort in
            Ananta network or at any of the affiliate resorts worldwide through
            Travedise exchange.
          </Text>
          <Text style={styles.cardSubTitle}>
            Your dream holiday served on a platter with:
          </Text>
          <Text style={styles.listItem}>• Access</Text>
          <Text style={styles.listItem}>• Flexibility</Text>
          <Text style={styles.listItem}>• Choices</Text>
          <Text style={styles.listItem}>• Experiences</Text>
        </View>

        {/* Ultimate Flexibility Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ultimate Flexibility</Text>
          <Text style={styles.cardSubTitle}>
            Fun filled holidays every year, for 3 years.
          </Text>
          <Text style={styles.listItem}>• Inflation free holidays</Text>
          <Text style={styles.listItem}>• Transparent documentation</Text>
          <Text style={styles.listItem}>• Attractive payment options</Text>
          <Text style={styles.listItem}>
            • Strategically located resorts with stunning views
          </Text>
          <Text style={styles.listItem}>
            • Unexplored destinations to discover
          </Text>
          <Text style={styles.listItem}>
            • Single window vacation planning and reservations
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed Join Club Button */}
      <View style={styles.fixedButtonContainer}>
        <GradientButton
          title="Join Club"
          onPress={() => setIsModalVisible(true)}
          style={styles.fixedButton}
        />
      </View>

      <MembershipModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

{
  /* // <Xyz */
}
{
  /* //   visible={isModalVisible}
        //   onClose={() => setIsModalVisible(false)}
        // /> */
}
{
  /* <GradientButton
          title="Join Club"
          onPress={() => Linking.openURL('https://razorpay.com/')}
         // onPress={() => setIsModalVisible(true)} // open modal
          style={{
            marginTop: 20,
            marginBottom: 100,
            width: 350,
            alignSelf: 'center',
          }}
        />

        {/* Membership Modal */
}
{
  /* <MembershipModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        /> */
}

{
  /* <View style={styles.joinClubContainer}>
          <GradientButton
            title="Join Club"
            onPress={() => setIsModalVisible(true)}
          />
        </View> */
}
