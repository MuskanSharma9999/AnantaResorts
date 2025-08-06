// src/hooks/useAppNavigation.ts
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabParamList } from '../navigation/types';

export const useAppNavigation = () => {
  return useNavigation<StackNavigationProp<TabParamList>>();
};