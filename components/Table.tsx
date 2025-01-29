import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

// Row Component
interface RowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Row: React.FC<RowProps> = ({ children, style }) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

// Column Component
interface ColumnProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Column: React.FC<ColumnProps> = ({ children, style }) => {
  return <View style={[styles.column, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Row, Column };
