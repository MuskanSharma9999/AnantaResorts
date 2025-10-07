// src/services/userService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiList from '../Api_List/apiList';
import { apiRequest } from '../Api_List/apiUtils';

class UserService {
  constructor() {
    this.isLoading = false;
    this.lastFetchTime = 0;
    this.CACHE_DURATION = 30000; // 30 seconds
    this.cachedUserData = null;
    this.pendingRequest = null;
  }

  /**
   * Fetch user profile with smart caching
   */
  async fetchUserProfile(forceRefresh = false) {
    try {
      // ✅ If request already in progress, return the same promise
      if (this.isLoading && this.pendingRequest) {
        console.log('[UserService] Reusing pending request...');
        return await this.pendingRequest;
      }

      // ✅ Return cached data if available and fresh
      const now = Date.now();
      const cacheIsValid = now - this.lastFetchTime < this.CACHE_DURATION;

      if (!forceRefresh && this.cachedUserData && cacheIsValid) {
        const cacheAge = Math.round((now - this.lastFetchTime) / 1000);
        console.log(`[UserService] Returning cached data (${cacheAge}s old)`);
        return {
          success: true,
          data: this.cachedUserData,
          fromCache: true,
          cacheAge,
        };
      }

      // ✅ Start new request
      this.isLoading = true;
      this.pendingRequest = this._fetchFromAPI();

      const result = await this.pendingRequest;

      this.isLoading = false;
      this.pendingRequest = null;

      return result;
    } catch (error) {
      this.isLoading = false;
      this.pendingRequest = null;
      console.error('[UserService] Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Internal API fetch method
   */
  async _fetchFromAPI() {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.log('[UserService] No token found');
      return { success: false, error: 'No authentication token' };
    }

    console.log('[UserService] Fetching fresh user profile from API...');
    const response = await apiRequest({
      url: ApiList.GET_PROFILE,
      method: 'GET',
      token,
    });

    if (!response.success) {
      console.error('[UserService] API error:', response.error);
      return { success: false, error: response.error };
    }

    // ✅ DEBUG: Log full response structure
    console.log(
      '[UserService] Full API Response:',
      JSON.stringify(response.data, null, 2),
    );

    // ✅ Handle nested data structure - FIXED BASED ON YOUR LOGS
    let user = null;

    // Your API structure: response.data.data.user
    if (response.data?.data?.user) {
      user = response.data.data.user;
      console.log('[UserService] Found user at: data.data.user');
    } else if (response.data?.user) {
      user = response.data.user;
      console.log('[UserService] Found user at: data.user');
    } else {
      user = response.data;
      console.log('[UserService] Found user at: data');
    }

    // ✅ FIX: Check if user is defined before using it
    if (!user) {
      console.error('[UserService] No user data in response');
      return { success: false, error: 'No user data in response' };
    }

    if (!user.email) {
      console.error('[UserService] No email in user data');
      console.error('[UserService] User object:', user);
      return { success: false, error: 'No email in user data' };
    }

    // ✅ SAFE: Check if user is defined before calling Object.keys
    if (user && typeof user === 'object') {
      console.log('[UserService] User object keys:', Object.keys(user));
    } else {
      console.log('[UserService] User is not an object:', typeof user);
    }

    // Extract and normalize user data
    const activeMembershipValue = this.extractActiveMembership(user);

    const userData = {
      name: user.name || '',
      email: user.email || '',
      profilePhoto: user.profile_photo_url || '',
      activeMembership: activeMembershipValue,
      kycStatus: user.kyc_status || '',
    };

    // ✅ Update cache
    this.cachedUserData = userData;
    this.lastFetchTime = Date.now();

    console.log('[UserService] ✓ Profile fetched successfully:', {
      name: userData.name,
      email: userData.email,
      hasPhoto: !!userData.profilePhoto,
      activeMembership: userData.activeMembership,
      kycStatus: userData.kycStatus,
    });

    return { success: true, data: userData, fromCache: false };
  }

  /**
   * Extract active membership - UPDATED BASED ON YOUR API STRUCTURE
   */
  extractActiveMembership(user) {
    if (!user || typeof user !== 'object') {
      console.log(
        '[UserService] No user object provided for membership extraction',
      );
      return '';
    }

    console.log('[UserService] Extracting membership from user object');

    // ✅ Check for activeMembership object (camelCase) - YOUR API FORMAT
    if (user.activeMembership && typeof user.activeMembership === 'object') {
      console.log(
        '[UserService] Found activeMembership object:',
        user.activeMembership,
      );

      // Return plan_id (the UUID identifier)
      if (user.activeMembership.plan_id) {
        console.log(
          '[UserService] ✓ Extracted plan_id:',
          user.activeMembership.plan_id,
        );
        return user.activeMembership.plan_id;
      }

      // Fallback to membership id
      if (user.activeMembership.id) {
        console.log(
          '[UserService] ✓ Extracted membership id:',
          user.activeMembership.id,
        );
        return user.activeMembership.id;
      }
    }

    // Check for active_membership (snake_case) - fallback
    if (user.active_membership?.plan_id) {
      console.log(
        '[UserService] ✓ Found active_membership.plan_id:',
        user.active_membership.plan_id,
      );
      return user.active_membership.plan_id;
    }

    // Check memberships array - fallback
    if (Array.isArray(user.memberships)) {
      const active = user.memberships.find(m => m.is_active === true);
      if (active?.plan_id) {
        console.log(
          '[UserService] ✓ Found in memberships array:',
          active.plan_id,
        );
        return active.plan_id;
      }
    }

    console.log('[UserService] ⚠️ No active membership found');
    console.log('[UserService] Available user properties:', Object.keys(user));

    return '';
  }

  /**
   * Update cached data optimistically
   */
  updateCache(updates) {
    if (this.cachedUserData) {
      this.cachedUserData = { ...this.cachedUserData, ...updates };
      console.log('[UserService] Cache updated:', updates);
    }
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    console.log('[UserService] Clearing cache');
    this.cachedUserData = null;
    this.lastFetchTime = 0;
    this.isLoading = false;
    this.pendingRequest = null;
  }

  /**
   * Get cache status for debugging
   */
  getCacheStatus() {
    const now = Date.now();
    const age = this.lastFetchTime
      ? Math.round((now - this.lastFetchTime) / 1000)
      : 0;
    const isValid = age < this.CACHE_DURATION / 1000;

    return {
      hasCachedData: !!this.cachedUserData,
      cacheAge: age,
      isValid,
      isLoading: this.isLoading,
    };
  }
}

// Export singleton
export default new UserService();
