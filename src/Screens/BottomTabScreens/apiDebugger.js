// src/utils/apiDebugger.js
// Temporary debugging utility to inspect API responses

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiList from '../../Api_List/apiList';
import { apiRequest } from '../../Api_List/apiUtils';

/**
 * Debug function to inspect raw API response
 * Call this from your HomeScreen or ProfileScreen to see the exact data structure
 */
export const debugUserProfileAPI = async () => {
  try {
    console.log('='.repeat(80));
    console.log('🔍 API DEBUG - Fetching User Profile');
    console.log('='.repeat(80));

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('❌ No token found');
      return;
    }

    console.log('✓ Token exists:', token.substring(0, 20) + '...');
    console.log('📡 Calling API:', ApiList.GET_PROFILE);

    const response = await apiRequest({
      url: ApiList.GET_PROFILE,
      method: 'GET',
      token,
    });

    console.log('\n📦 Raw Response:');
    console.log(JSON.stringify(response, null, 2));

    if (response.success) {
      const user =
        response.data?.data?.user || response.data?.user || response.data;

      console.log('\n👤 User Object:');
      console.log(JSON.stringify(user, null, 2));

      console.log('\n🔍 Checking activeMembership field:');
      console.log('user.activeMembership:', user?.activeMembership);
      console.log('Type:', typeof user?.activeMembership);

      if (user?.activeMembership) {
        console.log(
          'activeMembership keys:',
          Object.keys(user.activeMembership),
        );
        console.log('activeMembership.plan_id:', user.activeMembership.plan_id);
        console.log('activeMembership.id:', user.activeMembership.id);
        console.log('activeMembership.plan:', user.activeMembership.plan);
      }

      console.log('\n🔍 Checking active_membership field:');
      console.log('user.active_membership:', user?.active_membership);

      if (user?.active_membership) {
        console.log(
          'active_membership keys:',
          Object.keys(user.active_membership),
        );
        console.log(
          'active_membership.plan_id:',
          user.active_membership.plan_id,
        );
        console.log('active_membership.id:', user.active_membership.id);
      }

      console.log('\n🔍 Checking memberships array:');
      console.log('user.memberships:', user?.memberships);
      if (Array.isArray(user?.memberships)) {
        console.log('memberships length:', user.memberships.length);
        user.memberships.forEach((m, i) => {
          console.log(`  [${i}]:`, {
            id: m.id,
            plan_id: m.plan_id,
            is_active: m.is_active,
            membership_number: m.membership_number,
          });
        });
      }

      // Test extraction logic
      console.log('\n🧪 Testing Extraction Logic:');
      const extractedValue = extractActiveMembershipDebug(user);
      console.log('✓ Extracted value:', extractedValue);
    } else {
      console.error('❌ API Error:', response.error);
    }

    console.log('='.repeat(80));
    console.log('🔍 DEBUG END');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
};

/**
 * Test extraction function with detailed logging
 */
function extractActiveMembershipDebug(user) {
  // Test 1: activeMembership.plan_id
  if (user?.activeMembership?.plan_id) {
    console.log('  ✓ Found: activeMembership.plan_id');
    return user.activeMembership.plan_id;
  }

  // Test 2: activeMembership.id
  if (user?.activeMembership?.id) {
    console.log('  ✓ Found: activeMembership.id');
    return user.activeMembership.id;
  }

  // Test 3: activeMembership.plan.id
  if (user?.activeMembership?.plan?.id) {
    console.log('  ✓ Found: activeMembership.plan.id');
    return user.activeMembership.plan.id;
  }

  // Test 4: active_membership.plan_id
  if (user?.active_membership?.plan_id) {
    console.log('  ✓ Found: active_membership.plan_id');
    return user.active_membership.plan_id;
  }

  // Test 5: active_membership.id
  if (user?.active_membership?.id) {
    console.log('  ✓ Found: active_membership.id');
    return user.active_membership.id;
  }

  // Test 6: memberships array
  if (Array.isArray(user?.memberships)) {
    const active = user.memberships.find(m => m.is_active === true);
    if (active) {
      console.log('  ✓ Found: active membership in array');
      return active.plan_id || active.id;
    }
  }

  console.log('  ❌ No membership found');
  return '';
}

export default {
  debugUserProfileAPI,
};
