import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../utils/colors';
import { theme } from '../utils/theme';

const MetarMessageCard = ({ item, user, onDelete, onShowPanel }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card containerStyle={styles.card}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.headerContainer}>
          <Text style={styles.messageText}>
            <MaterialCommunityIcons
              name="weather-cloudy"
              size={20}
              color={colors.white}
            />
            {" " + item.message}
          </Text>
          <MaterialCommunityIcons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={colors.white}
          />
        </View>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color={colors.white}
              />
              {" " + new Date(item.timestamp).toLocaleDateString()}
            </Text>
            <Text style={styles.dateTimeText}>
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={16}
                color={colors.white}
              />
              {" " + new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onShowPanel(item)}
            >
              <Text style={styles.buttonText}>Show Details</Text>
            </TouchableOpacity>
            {user.userData.role === "admin" && (
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => onDelete(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.bgWhite(0.4),
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
  },
  expandedContent: {
    marginTop: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 14,
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: theme.bgWhite(0.6),
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: colors.red,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default MetarMessageCard;