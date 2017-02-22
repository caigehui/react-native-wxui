import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Day from './Days';

import moment from 'moment';
import styles from './styles';

const DEVICE_WIDTH = Dimensions.get('window').width;
const NOT_FULL_WIDTH = DEVICE_WIDTH * 4 / 5;
const VIEW_INDEX = 1;

export default class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonthMoment: moment(this.props.startDate),
            selectedMoment: moment(this.props.selectedDate),
        };
    }

    static propTypes = {
        dayHeadings: PropTypes.array,
        eventDates: PropTypes.array,
        monthNames: PropTypes.array,
        onDateSelect: PropTypes.func,
        onSwipeNext: PropTypes.func,
        onSwipePrev: PropTypes.func,
        scrollEnabled: PropTypes.bool,
        selectedDate: PropTypes.any,
        startDate: PropTypes.any,
        titleFormat: PropTypes.string,
        today: PropTypes.any,
        weekStart: PropTypes.number,
        fullWidth: PropTypes.bool,
    };

    static defaultProps = {
        customStyle: {},
        dayHeadings: ['日', '一', '二', '三', '四', '五', '六'],
        eventDates: [],
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月',
            '7月', '8月', '9月', '10月', '11月', '12月'],
        scrollEnabled: true,
        startDate: moment().format('YYYY-MM-DD'),
        titleFormat: 'MMMM YYYY',
        today: moment(),
        weekStart: 0,
        fullWidth: true
    };

    componentDidMount() {
        this.timer = setTimeout(() => this.scrollToItem(VIEW_INDEX), 10);
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    componentDidUpdate() {
        this.scrollToItem(VIEW_INDEX);
    }

    getMonthStack(currentMonth) {
        if (this.props.scrollEnabled) {
            const res = [];
            for (let i = -VIEW_INDEX; i <= VIEW_INDEX; i++) {
                res.push(moment(currentMonth).add(i, 'month'));
            }
            return res;
        }
        return [moment(currentMonth)];
    }

    prepareEventDates(eventDates) {
        const parsedDates = {};

        eventDates.forEach(event => {
            const date = moment(event);
            const month = moment(date).startOf('month').format();
            if (!parsedDates[month]) {
                parsedDates[month] = {};
            }
            parsedDates[month][date.date() - 1] = true;
        })
        return parsedDates;
    }

    selectDate(date) {
        this.setState({ selectedMoment: date });
        this.props.onDateSelect && this.props.onDateSelect(date.format());
    }


    scrollToItem(itemIndex) {
        const scrollToX = itemIndex * (this.props.fullWidth ? DEVICE_WIDTH : NOT_FULL_WIDTH);
        if (this.props.scrollEnabled) {
            this._calendar.scrollTo({ y: 0, x: scrollToX, animated: false });
        }
    }

    scrollEnded(event) {
        const position = event.nativeEvent.contentOffset.x;
        const currentPage = position / (this.props.fullWidth ? DEVICE_WIDTH : NOT_FULL_WIDTH);
        const newMoment = moment(this.state.currentMonthMoment).add(currentPage - VIEW_INDEX, 'month');
        this.setState({ currentMonthMoment: newMoment });

        if (currentPage < VIEW_INDEX) {
            this.props.onSwipePrev && this.props.onSwipePrev(newMoment);
        } else if (currentPage > VIEW_INDEX) {
            this.props.onSwipeNext && this.props.onSwipeNext(newMoment);
        }
    }


    renderMonthView(argMoment, eventDatesMap) {

        let
            renderIndex = 0,
            weekRows = [],
            days = [],
            startOfArgMonthMoment = argMoment.startOf('month');

        const
            selectedMoment = moment(this.state.selectedMoment),
            weekStart = this.props.weekStart,
            todayMoment = moment(this.props.today),
            todayIndex = todayMoment.date() - 1,
            argMonthDaysCount = argMoment.daysInMonth(),
            offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7,
            argMonthIsToday = argMoment.isSame(todayMoment, 'month'),
            selectedIndex = moment(selectedMoment).date() - 1,
            selectedMonthIsArg = selectedMoment.isSame(argMoment, 'month');

        const events = (eventDatesMap !== null)
            ? eventDatesMap[argMoment.startOf('month').format()]
            : null;

        do {
            const dayIndex = renderIndex - offset;
            const isoWeekday = (renderIndex + weekStart) % 7;

            if (dayIndex >= 0 && dayIndex < argMonthDaysCount) {
                days.push((
                    <Day
                        tintColor={this.props.tintColor}
                        startOfMonth={startOfArgMonthMoment}
                        isWeekend={isoWeekday === 0 || isoWeekday === 6}
                        key={`${renderIndex}`}
                        onPress={() => {
                            this.selectDate(moment(startOfArgMonthMoment).set('date', dayIndex + 1));
                        } }
                        caption={`${dayIndex + 1}`}
                        isToday={argMonthIsToday && (dayIndex === todayIndex) }
                        isSelected={selectedMonthIsArg && (dayIndex === selectedIndex) }
                        hasEvent={events && events[dayIndex] === true}
                        usingEvents={this.props.eventDates.length > 0}
                        width={this.props.fullWidth ? (DEVICE_WIDTH / 7) : (NOT_FULL_WIDTH / 7) }
                        />
                ));
            } else {
                days.push(<Day tintColor={this.props.tintColor} key={`${renderIndex}`} filler width={this.props.fullWidth ? (DEVICE_WIDTH / 7) : (NOT_FULL_WIDTH / 7) }/>);
            }
            if (renderIndex % 7 === 6) {
                weekRows.push(
                    <View
                        tintColor={this.props.tintColor}
                        key={weekRows.length}
                        style={[styles.weekRow,]}
                        >
                        {days}
                    </View>);
                days = [];
                if (dayIndex + 1 >= argMonthDaysCount) {
                    break;
                }
            }
            renderIndex += 1;
        } while (true)
        const containerStyle = [{ width: this.props.fullWidth ? DEVICE_WIDTH : NOT_FULL_WIDTH }];
        return <View key={argMoment.month() } style={containerStyle}>{weekRows}</View>;
    }

    renderHeading() {
        const headings = [];
        for (let i = 0; i < 7; i++) {
            const j = (i + this.props.weekStart) % 7;
            headings.push(
                <Text
                    key={i}
                    style={j === 0 || j === 6 ?
                        [styles.weekendHeading,] :
                        [styles.dayHeading,]}
                    >
                    {this.props.dayHeadings[j]}
                </Text>
            );
        }

        return (
            <View style={[styles.calendarHeading, { width: this.props.fullWidth ? DEVICE_WIDTH : NOT_FULL_WIDTH }]}>
                {headings}
            </View>
        );
    }

    renderTopBar() {
        let localizedMonth = this.props.monthNames[this.state.currentMonthMoment.month()];
        return (
            <View style={[styles.calendarControls, { width: this.props.fullWidth ? DEVICE_WIDTH : NOT_FULL_WIDTH }]}>
                <Text style={[styles.title, { color: 'black' }]}>
                    {this.state.currentMonthMoment.year() === this.props.today.year() ? null : this.state.currentMonthMoment.year() + '年'}{localizedMonth}
                </Text>
            </View>
        )

    }

    render() {
        const calendarDates = this.getMonthStack(this.state.currentMonthMoment);
        const eventDatesMap = this.prepareEventDates(this.props.eventDates);

        return (
            <View style={[styles.calendarContainer, { width: this.props.fullWidth ? DEVICE_WIDTH : NOT_FULL_WIDTH }, this.props.style]}>
                {this.renderTopBar() }
                {this.renderHeading(this.props.titleFormat) }
                {this.props.scrollEnabled ?
                    <ScrollView
                        ref={calendar => this._calendar = calendar}
                        horizontal
                        scrollEnabled
                        pagingEnabled
                        removeClippedSubviews={false}
                        scrollEventThrottle={1000}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => this.scrollEnded(event) }
                        >
                        {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap)) }
                    </ScrollView>
                    :
                    <View ref={calendar => this._calendar = calendar}>
                        {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap)) }
                    </View>
                }
            </View>
        );
    }
}