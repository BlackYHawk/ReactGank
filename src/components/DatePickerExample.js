/**
 * Created by heyong on 2017/1/5.
 */
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    DatePickerIOS,
    StyleSheet,
    Text,
    TextInput,
    View,
} = ReactNative;

const DatePickerExample = React.createClass({
    getDefaultProps: function () {
        return {
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
        };
    },

    getInitialState: function() {
        return {
            date: this.props.date,
            timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
        };
    },

    onDateChange: function(date) {
        this.setState({date: date});
    },

    onTimezoneChange: function(event) {
        var offset = parseInt(event.nativeEvent.text, 10);
        if (isNaN(offset)) {
            return;
        }
        this.setState({timeZoneOffsetInHours: offset});
    },

    render: function() {
        // Ideally, the timezone input would be a picker rather than a
        // text input, but we don't have any pickers yet :(
        return (
            <View>
                <WithLabel label="Value:">
                    <Text>{
                        this.state.date.toLocaleDateString() +
                        ' ' +
                        this.state.date.toLocaleTimeString()
                    }</Text>
                </WithLabel>
                <WithLabel label="Timezone:">
                    <TextInput
                        onChange={this.onTimezoneChange}
                        style={styles.textinput}
                        value={this.state.timeZoneOffsetInHours.toString()}
                    />
                    <Text> hours from UTC</Text>
                </WithLabel>
                <Heading label="Date + time picker" />
                <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                />
                <Heading label="Date picker" />
                <DatePickerIOS
                    date={this.state.date}
                    mode="date"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                />
                <Heading label="Time picker, 10-minute interval" />
                <DatePickerIOS
                    date={this.state.date}
                    mode="time"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                    minuteInterval={10}
                />
            </View>
        );
    },
});

const WithLabel = React.createClass({
    render: function() {
        return (
            <View style={styles.labelContainer}>
                <View style={styles.labelView}>
                    <Text style={styles.label}>
                        {this.props.label}
                    </Text>
                </View>
                {this.props.children}
            </View>
        );
    }
});

const Heading = React.createClass({
    render: function() {
        return (
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    {this.props.label}
                </Text>
            </View>
        );
    }
});

module.exports = DatePickerExample;
exports.displayName = (undefined: ?string);
exports.title = '<DatePickerIOS>';
exports.description = 'Select dates and times using the native UIDatePicker.';
exports.examples = [
    {
        title: '<DatePickerIOS>',
        render: function(): ReactElement<any> {
            return <DatePickerExample />;
        },
    }];

const styles = StyleSheet.create({
    textinput: {
        height: 26,
        width: 50,
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        padding: 4,
        fontSize: 13,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    labelView: {
        marginRight: 10,
        paddingVertical: 2,
    },
    label: {
        fontWeight: '500',
    },
    headingContainer: {
        padding: 4,
        backgroundColor: '#f6f7f8',
    },
    heading: {
        fontWeight: '500',
        fontSize: 14,
    },
});