import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {

  static propTypes = {
    caption: PropTypes.any,
    filler: PropTypes.bool,
    hasEvent: PropTypes.bool,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    usingEvents: PropTypes.bool,
    width: PropTypes.number.isRequired
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, hasEvent) => {
    const dayCircleStyle = [styles.dayCircleFiller,];

    if (isSelected && !isToday) {
      dayCircleStyle.push(styles.selectedDayCircle, this.props.tintColor ? { backgroundColor: this.props.tintColor } : null);
    } else if (isSelected && isToday) {
      dayCircleStyle.push(styles.currentDayCircle, this.props.tintColor ? { backgroundColor: this.props.tintColor } : null);
    }

    if (hasEvent) {
      dayCircleStyle.push(styles.hasEventCircle, )
    }
    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday, hasEvent) => {
    const dayTextStyle = [styles.day,];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, );
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText, );
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText, );
    }

    if (hasEvent) {
      dayTextStyle.push(styles.hasEventText, )
    }
    return dayTextStyle;
  }

  render() {
    let { caption } = this.props;
    const {
      filler,
      hasEvent,
      isWeekend,
      isSelected,
      isToday,
      usingEvents,
    } = this.props;
    return filler
      ? (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, { width: this.props.width }]}>
            <Text style={[styles.day,]} />
          </View>
        </TouchableWithoutFeedback>
      )
      : (
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={[styles.dayButton, { width: this.props.width }]}>
            <View style={this.dayCircleStyle(isWeekend, isSelected, isToday, hasEvent) }>
              <Text style={this.dayTextStyle(isWeekend, isSelected, isToday, hasEvent) }>{caption}</Text>
            </View>
            {usingEvents &&
              <View style={[
                styles.eventIndicatorFiller,
                hasEvent && styles.eventIndicator,]}
                />
            }
          </View>
        </TouchableWithoutFeedback>
      );
  }
}