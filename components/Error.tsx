import React from 'react';
import {  StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Link, Stack } from 'expo-router';

interface ErrorProps {
  message: string; 
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  
  return (
    
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!'}} />
      <ThemedText style={styles.errorText}>{message}</ThemedText>
      <Link href="/">
      <TouchableOpacity>
          <ThemedText type='link'>Go to home page</ThemedText>
      </TouchableOpacity>
      </Link>
    </ThemedView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Error;
