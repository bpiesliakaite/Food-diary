import React, { Component } from "react";
import { Platform } from 'react-native';
import { Container, Header, Content, Switch, Input, Icon, Label, Picker, Button, Text, Form, View, Item, DatePicker, Left } from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link } from 'react-router-native';

export default class Profile extends Component {

    // const account = useSelector(state => state.account.account);

    constructor(props) {
        super(props);
        this.state = {
            // selected: "key0",
            date: new Date(),
            mode: 'date',
            show: false,
        };
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    onValueChangePhysical(value) {
        this.setState({
            selectedPhysical: value
        });
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({
            show: Platform.OS === 'ios',
            date: currentDate,
        });
    }

    showMode = (currentMode) => {
        this.setState({
            show: true,
            mode: currentMode,
        })
    }

    showDatepicker = () => {
        this.showMode('date');
    }

    showTimepicker = () => {
        this.showMode('time');
    }

    render() {

        return (

            <Form style={{ padding: 30 }}>

                <Item stackedLabel>
                    <Label style={{ color: 'blue', fontSize: 13 }}>Name</Label>
                    <Input />
                </Item>

                <Item stackedLabel>
                    <Label style={{ color: 'blue', fontSize: 13 }}>Last Name</Label>
                    <Input />
                </Item>

                <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Gender</Label>


                <Item >

                    <Picker
                        mode="dropdown"
                        iosHeader="Select Your Gender"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                        style={{ height: 50, width: 20, }}
                    >
                        <Picker.Item label="Other" value="key0" />
                        <Picker.Item label="Female" value="key1" />
                        <Picker.Item label="Male" value="key2" />
                    </Picker>
                </Item>

                <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Date if Birth</Label>
                <Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>
                        {this.state.date.toString().substr(4, 12)}
                    </Text>
                    {this.state.show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                        />
                    )}
                    <View >
                        <Button onPress={this.showDatepicker}>
                            <Icon type="Ionicons" name="calendar" />
                        </Button>
                    </View>
                </Item>

                <Item stackedLabel>
                    <Label style={{ color: 'blue', fontSize: 13 }}>Weight</Label>
                    <Input />
                </Item>

                <Item stackedLabel>
                    <Label style={{ color: 'blue', fontSize: 13 }}>Height</Label>
                    <Input />
                </Item>

                <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Physical training</Label>
                <Item >
                    <Picker
                        mode="dropdown"
                        iosHeader="Select Your Physical training:"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={this.state.selectedPhysical}
                        onValueChange={this.onValueChangePhysical.bind(this)}
                        style={{ height: 50, width: 20 }}
                    >
                        <Picker.Item label="Average" value="key0" />
                        <Picker.Item label="High" value="key1" />
                        <Picker.Item label="Low" value="key2" />
                    </Picker>
                </Item>

                <Item style={{
                    alignSelf: 'center'
                }}>
                    <Button transparent light>
                        <Text>Save the Changes</Text>
                    </Button>
                </Item>

                <Item style={{ alignSelf: 'center' }}>
                    <Button primary>
                        <Link to="/change-password">
                            <Text >Change the Password</Text>
                        </Link>
                    </Button>
                </Item>

            </Form>
        );
    }

}