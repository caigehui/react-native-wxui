import { Dimensions, StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#f7f7f7',
  },
  monthContainer: {
    width: DEVICE_WIDTH,
  },
  calendarControls: {
    flexDirection: 'row',
  },
  controlButton: {
  },
  controlButtonText: {
    margin: 10,
    fontSize: 14,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
    color: 'rgb(106,133,222)'
  },
  calendarHeading: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'rgb(234,234,234)',
    backgroundColor: 'rgb(239,239,244)'
  },
  dayHeading: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 5,
    color: 'rgb(175,182,191)'
  },
  weekendHeading: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 5,
    color: 'rgb(247,194,61)',
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayButton: {
    alignItems: 'center',
    padding: 5,
    borderTopWidth: 0,
    borderTopColor: '#e9e9e9',
  },
  dayButtonFiller: {
    padding: 5,
  },
  day: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'rgb(71,83,103)'
  },
  eventIndicatorFiller: {
    marginTop: 3,
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventIndicator: {
    backgroundColor: '#cccccc',
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  currentDayCircle: {
    backgroundColor: 'rgb(109,135,223)',
  },
  currentDayText: {
    color: 'rgb(71,83,103)',
  },
  selectedDayCircle: {
    backgroundColor: 'rgb(109,135,223)',
  },
  hasEventCircle: {
  },
  hasEventText: {
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weekendDayText: {
    color: '#cccccc',
  },
});

export default styles;