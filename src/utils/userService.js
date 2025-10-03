// userService.js
// Create this file in: src/services/userService.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiList from '../Api_List/apiList';
import { apiRequest } from '../Api_List/apiUtils';

class UserService {
  constructor() {
    this.isLoading = false;
    this.lastFetchTime = 0;
    this.CACHE_DURATION = 30000; // 30 seconds cache
    this.cachedUserData = null;
  }

  /**
   * Fetch and parse user profile data
   * @param {boolean} forceRefresh - Force fetch even if cached
   * @returns {Promise<Object>} User data object
   */
  async fetchUserProfile(forceRefresh = false) {
    try {
      // Prevent duplicate simultaneous requests
      if (this.isLoading) {
        console.log('[UserService] Request already in progress, waiting...');
        return await this.waitForCurrentRequest();
      }

      // Return cached data if available and fresh
      const now = Date.now();
      if (
        !forceRefresh &&
        this.cachedUserData &&
        now - this.lastFetchTime < this.CACHE_DURATION
      ) {
        console.log('[UserService] Returning cached user data');
        return { success: true, data: this.cachedUserData, fromCache: true };
      }

      this.isLoading = true;

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('[UserService] No token found');
        this.isLoading = false;
        return { success: false, error: 'No authentication token' };
      }

      console.log('[UserService] Fetching fresh user profile...');
      const response = await apiRequest({
        url: ApiList.GET_PROFILE,
        method: 'GET',
        token,
      });

      this.isLoading = false;

      if (!response.success) {
        console.error('[UserService] API error:', response.error);
        return { success: false, error: response.error };
      }

      // Parse user data from response
      const user =
        response.data?.data?.user || response.data?.user || response.data;

      if (!user) {
        console.error('[UserService] No user data in response');
        return { success: false, error: 'No user data in response' };
      }

      // Extract active membership
      const activeMembershipValue = this.extractActiveMembership(user);

      // Normalize user data
      const userData = {
        name: user.name || '',
        email: user.email || '',
        profilePhoto: user.profile_photo_url || '',
        activeMembership: activeMembershipValue,
        kycStatus: user.kyc_status || '',
      };

      // Cache the data
      this.cachedUserData = userData;
      this.lastFetchTime = now;

      console.log('[UserService] User data fetched successfully:', userData);
      return { success: true, data: userData, fromCache: false };
    } catch (error) {
      this.isLoading = false;
      console.error('[UserService] Error fetching user profile:', error);
      return { success: false, error: error.message || 'Unknown error' };
    }
  }

  /**
   * Extract active membership from user object
   * Handles different API response formats
   */
  extractActiveMembership(user) {
    // Check direct active_membership
    if (user?.active_membership?.plan_id) {
      return user.active_membership.plan_id;
    }

    // Check camelCase version
    if (user?.activeMembership?.plan_id) {
      return user.activeMembership.plan_id;
    }

    // Check memberships array
    if (user?.memberships && Array.isArray(user.memberships)) {
      const activeMembership = user.memberships.find(
        member => member.is_active === true || member.isActive === true,
      );
      if (activeMembership?.plan_id) {
        return activeMembership.plan_id;
      }
    }

    return '';
  }

  /**
   * Wait for current request to complete
   */
  async waitForCurrentRequest() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait

    while (this.isLoading && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    if (this.cachedUserData) {
      return { success: true, data: this.cachedUserData, fromCache: true };
    }

    return { success: false, error: 'Request timeout' };
  }

  /**
   * Clear cached data (call on logout or manual refresh)
   */
  clearCache() {
    console.log('[UserService] Clearing cache');
    this.cachedUserData = null;
    this.lastFetchTime = 0;
    this.isLoading = false;
  }

  /**
   * Update cached data without API call
   * Useful for optimistic updates
   */
  updateCache(updates) {
    if (this.cachedUserData) {
      this.cachedUserData = { ...this.cachedUserData, ...updates };
      console.log('[UserService] Cache updated:', this.cachedUserData);
    }
  }
}

// Export singleton instance
export default new UserService();
