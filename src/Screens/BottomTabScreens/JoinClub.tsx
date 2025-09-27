import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import MembershipModal from '../MembershipModal';
import ApiList from '../../Api_List/apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from '../../Api_List/apiUtils';

// Replace these with the correct local images or URLs
const BACKGROUND_IMAGE = require('../../assets/images/signUpCarousel_images/img_1.jpg');
const ARROW_ICON = require('../../assets/images/onBoarding.png');

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
          price: '₹2,008 / 30 days',
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

      const benefits =
        plan && plan.benefits
          ? plan.benefits
              .split(',')
              .map(benefit => benefit.trim().replace(/[\\"]/g, ''))
              .filter(benefit => benefit.length > 0)
          : ['Standard membership benefits'];

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
                onPress={() => setSelectedTab(plan)}
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

        {/* Benefits of Ownership Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Benefits of Ownership</Text>
          <Text style={styles.listItem}>
            • A well furnished room - for 2 Adults & 2 Kids (below 12 years)/3
            Adults.
          </Text>
          <Text style={styles.listItem}>
            • 4 Welcome meal vouchers - a complimentary buffet/fixed meal for
            two pax.
          </Text>
          <Text style={styles.listItem}>
            • 2 Dining power vouchers - 50% discount on total food bill up to 10
            pax every year.
          </Text>
          <Text style={styles.listItem}>
            • 2 Celebration complimentary cake vouchers - Pineapple
          </Text>
          <Text style={styles.listItem}>
            • One (1) certificate entitling the bearer to a Celebration bottle
            of Indian House Wine or Five Indian Beer (330ML) or Five Mocktails
            (Whilst Dining at any F&B Outlet) at Ananta Spa & Resort
            Pushkar/Udaipur/Aijabgarh.
          </Text>
          <Text style={styles.listItem}>
            • 4 Special room rate vouchers (Rs. 5500 + taxes) for The Ananta
            Udaipur and Ananta Spa & Resorts Pushkar (every year).
          </Text>
          <Text style={styles.listItem}>
            • 2 Special room rate vouchers (Rs. 6000 + taxes) for Ananta Spa &
            Resorts Aijabgarh (every year).
          </Text>
          <Text style={styles.listItem}>
            • 4 Special room rate vouchers (Rs. 4500 + taxes) for The Baagh
            Ananta Elite, Ranthambore (every year).
          </Text>
          <Text style={styles.listItem}>
            • 2 Special room rate vouchers (Rs. 3500 + taxes) for Siana Ananta
            Elite, (Jaisalmer) / Richmond Ananta Elite, Goa (every year).
          </Text>
          <Text style={styles.listItem}>
            • 2 vouchers of 50% discount on selected spa treatment (The Ananta
            Udaipur, Ananta Spa & Resort Pushkar, Ananta Spa & Resorts Aiajgarh
            and The Baagh Ananta Elite, Ranthambore) (wherever applicable)
          </Text>
          <Text style={styles.listItem}>
            • 1 Bar celebration voucher - bar discount voucher of Rs. 1000/-
            every year (Indian house brands).
          </Text>
          <Text style={styles.listItem}>
            • 7 complimentary laundry vouchers each year.
          </Text>
          <Text style={styles.listItem}>
            • 5 vouchers of complimentary entry in Den at The Ananta Udaipur (1
            voucher for 1 pax).
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  headerContainer: {
    position: 'relative',
    height: 220,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    position: 'absolute',
    top: 16,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    padding: 4,
    zIndex: 2,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFE2B8',
    fontWeight: '600',
    fontFamily: 'Cormorant',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    fontFamily: 'serif',
  },
  card: {
    backgroundColor: '#19191A',
    borderRadius: 18,
    marginHorizontal: 12,
    marginTop: 16,
    padding: 16,
    borderColor: '#FFE2B8',
    borderWidth: 1,
  },
  cardTitle: {
    color: '#FFE2B8',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Cormorant',
    marginBottom: 8,
  },
  cardBody: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '400',
    fontFamily: 'Montserrat',
  },
  cardSubTitle: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 6,
    fontWeight: '500',
    fontFamily: 'Cormorant',
  },
  listItem: {
    color: '#FFE2B8',
    fontSize: 13,
    marginBottom: 3,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
  },
  tabScrollView: {
    flexGrow: 0,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  tabItem: {
    width: 300,
    marginRight: 12,
  },
  tabContentContainer: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 12,
    borderColor: '#FFE2B8',
    borderWidth: 1,
  },
  tabContentTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tabContentText: {
    color: '#FFE2B8',
    fontFamily: 'montserrat',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  tabItemSelected: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fixedButton: {
    width: 350,
  },
  bottomPadding: {
    height: 80,
  },
});

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
