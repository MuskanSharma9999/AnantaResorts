// src/screens/ApiTestScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

export default function ApiTestScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const testApi = async () => {
    try {
      setLoading(true);
      setResult(null);

      const response = await fetch('http://192.168.1.6:9000/api');
      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResult('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test</Text>

      <TouchableOpacity style={styles.button} onPress={testApi}>
        <Text style={styles.buttonText}>Test API</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      <ScrollView style={styles.resultBox}>
        <Text style={styles.resultText}>
          {result || 'Press the button to test API'}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  resultBox: {
    marginTop: 10,
    width: '100%',
    maxHeight: '70%',
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
});
