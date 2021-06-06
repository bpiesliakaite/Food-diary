import React, { useState, useEffect } from "react";
import { Platform, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, Switch, Input, Icon, Label, Picker, Button, Text, Form, View, Item, DatePicker, Left } from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { accountEdit, openPasswordChangeForm, setPasswordChangeModalOpen } from './redux/store';
import Tooltip from 'react-native-walkthrough-tooltip';
import { ScrollView } from "react-native-gesture-handler";
import { useHistory, useLocation } from 'react-router';
import ChangePasswordForm from './ChangePasswordForm';
import ChangePassword from "./ChangePasswordForm";

export default function Profile() {

    const account = useSelector(state => state.account.account);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [gender, setGender] = useState('key0');
    const [physical, setPhysical] = useState('key0');
    const [isInfoTooltipVisible, setInfoTootlipVisible] = useState(false);

    useEffect(() => {
        if (account.firstName !== null) {
            setName(account.firstName);
        }
        if (account.lastName !== null) {
            setLastName(account.lastName);
        }
        if (account.weight !== null) {
            setWeight(account.weight.toString())
        }
        if (account.height !== null) {
            setHeight(account.height.toString());
        }
        if (account.birthDate !== null) {
            setDate(new Date(account.birthDate));
        }
        if (account.gender === null) {
            setGender('key0');
        } else if (account.gender === true) {
            setGender('key1');
        } else if (account.gender === false) {
            setGender('key2');
        }
        if (account.physical === null) {
            setPhysical('key0');
        } else if (account.physical === true) {
            setPhysical('key1');
        } else if (account.physical === false) {
            setPhysical('key2');
        }
    }, [account]);

    const dispatch = useDispatch();

    const onProfileSave = () => {
        const user = {
            firstName: name,
            lastName: lastName,
            birthDate: date
        }
        const parsedWeight = parseInt(weight);
        if (parsedWeight) {
            user.weight = parsedWeight;
        }
        const parsedHeight = parseInt(height);
        if (parsedHeight) {
            user.height = parsedHeight;
        }
        if (gender === 'key0') {
            user.gender = null;
        } else if (gender === 'key1') {
            user.gender = true;
        } else if (gender === 'key2') {
            user.gender = false;
        }
        if (physical === 'key0') {
            user.physical = null;
        } else if (physical === 'key1') {
            user.physical = true;
        } else if (physical === 'key2') {
            user.physical = false;
        }
        dispatch(accountEdit(user));
    }

    const onGenderChange = (value) => {
        setGender(value);
    }
    const onPhysicalChange = (value) => {
        setPhysical(value);
    }
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        setDate(currentDate);
        setShowDatePicker(Platform.OS === 'ios');
    }

    const showDatepicker = () => {
        setShowDatePicker(true);
    }

    const onPasswordChangePress = () => {
        dispatch(setPasswordChangeModalOpen(true));
    };



    return (
        <ScrollView>
            <Form style={{ padding: 20, paddingTop: 14 }}>

                <Item stackedLabel>
                    <Label style={{ color: '#97A97C', fontSize: 13 }}>Name</Label>
                    <Input value={name} onChangeText={text => { console.log(text); setName(text); }} />
                </Item>

                <Item stackedLabel>
                    <Label style={{ color: '#97A97C', fontSize: 13 }}>Last Name</Label>
                    <Input value={lastName} onChangeText={text => setLastName(text)} />
                </Item>

                <Label style={{ color: '#97A97C', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Gender</Label>


                <Item >

                    <Picker
                        mode="dropdown"
                        iosHeader="Select Your Gender"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={gender}
                        onValueChange={onGenderChange}
                        style={{ height: 50, width: 20, }}
                    >
                        <Picker.Item label="Other" value="key0" />
                        <Picker.Item label="Female" value="key1" />
                        <Picker.Item label="Male" value="key2" />
                    </Picker>
                </Item>

                <Label style={{ color: '#97A97C', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Date of Birth</Label>
                <Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>
                        {date.toString().substr(4, 12)}
                    </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                    <View >
                        <Button onPress={showDatepicker} style={{ backgroundColor: '#b5c99a' }}>
                            <Icon type="Ionicons" name="calendar" />
                        </Button>
                    </View>
                </Item>

                <Item stackedLabel>
                    <Label style={{ color: '#97A97C', fontSize: 13 }}>Weight</Label>
                    <Input value={weight} onChangeText={text => setWeight(text)} keyboardType="numeric" />
                </Item>

                <Item stackedLabel>
                    <Label style={{ color: '#97A97C', fontSize: 13 }}>Height</Label>
                    <Input value={height} onChangeText={text => setHeight(text)} keyboardType="numeric" />
                </Item>

                <Label style={{ color: '#97A97C', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Physical training</Label>
                <Item >
                    <Picker
                        mode="dropdown"
                        iosHeader="Select Your Physical training:"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={physical}
                        onValueChange={onPhysicalChange}
                        style={{ height: 50, width: 20 }}
                    >
                        <Picker.Item label="Average" value="key0" />
                        <Picker.Item label="High" value="key1" />
                        <Picker.Item label="Low" value="key2" />
                    </Picker>
                </Item>

                <Item style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Button onPress={onProfileSave} style={{ borderRadius: 25, backgroundColor: '#b5c99a' }}>
                        <Text >Save Changes</Text>
                    </Button>
                </Item>

                <Item style={{ alignSelf: 'center' }}>
                    <Button transparent light onPress={onProfileSave} >
                        <Text style={{ color: '#BF805F' }} onPress={onPasswordChangePress}>Change the Password</Text>
                    </Button>
                </Item>


            </Form>
            <ChangePassword />


        </ScrollView>
    );


}