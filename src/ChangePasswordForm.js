import React, { useState } from 'react';
import { Text, Container, View, Form, Button, Item, Input, Label } from 'native-base';
import { Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { accountChangePassword, setPasswordChangeErrors, setPasswordChangeForm, setPasswordChangeModalOpen } from './redux/store';

const ChangePassword = () => {
    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.account.passwordChangeModalOpen);
    const passwordChangeFormErrors = useSelector(state => state.account.passwordChangeErrors); 
    const passwordChangeForm = useSelector(state => state.account.passwordChangeForm);

    const onFormDismiss = () => {
        dispatch(setPasswordChangeForm({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        }));
        dispatch(setPasswordChangeErrors({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        }));
        dispatch(setPasswordChangeModalOpen(false));
    }

    const onSubmit = () => {
        dispatch(setPasswordChangeErrors({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        }));
        if (isFormValid()) {
            dispatch(accountChangePassword({
                currentPassword: passwordChangeForm.currentPassword,
                newPassword: passwordChangeForm.newPassword
            }));
            dispatch(setPasswordChangeErrors({
                currentPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            }));
        }
    }

    const isFormValid = () => {
        let errors = false;
        if (passwordChangeForm.currentPassword.length < 1) {
            errors = true;
            dispatch(setPasswordChangeErrors({
                currentPassword: 'Cannot be empty'
            }));
        }
        if (passwordChangeForm.newPassword.length < 6) {
            errors = true;
            dispatch(setPasswordChangeErrors({
                newPassword: 'Password must be longer than 6 symbols'
            }));
        }
        if (passwordChangeForm.newPassword !== passwordChangeForm.repeatNewPassword) {
            errors = true;
            dispatch(setPasswordChangeErrors({
                repeatNewPassword: 'Passwords must match'
            }));
        }
        return !errors;
    }

    return (
        <Modal visible={isOpen} transparent>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
            }}>
                <Form style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    shadowColor: '#000',
                    width: 380,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                    <Label style={{ color: '#97A97C', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Current Password</Label>
                    <Item error={!!passwordChangeFormErrors.currentPassword}>
                        <Input secureTextEntry={true} value={passwordChangeForm.currentPassword} onChangeText={(val) => dispatch(setPasswordChangeForm({ currentPassword: val }))} placeholder="Current Password" />
                    </Item>
                    {passwordChangeFormErrors.currentPassword ? <Text style={{ marginLeft: 15, color: 'red', fontSize: 9 }}>{passwordChangeFormErrors.currentPassword}</Text> : null}

                    <Label style={{ color: '#97A97C', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>New Password</Label>
                    <Item error={!!passwordChangeFormErrors.newPassword}>
                        <Input secureTextEntry={true} value={passwordChangeForm.newPassword} onChangeText={(val) => dispatch(setPasswordChangeForm({ newPassword: val }))} placeholder="New Password" />
                    </Item>
                    {passwordChangeFormErrors.newPassword ? <Text style={{ marginLeft: 15, color: 'red', fontSize: 9 }}>{passwordChangeFormErrors.newPassword}</Text> : null}

                    <Label style={{ color: '#97A97C', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Repeat New Password</Label>
                    <Item error={!!passwordChangeFormErrors.repeatNewPassword}>
                        <Input secureTextEntry={true} value={passwordChangeForm.repeatNewPassword} onChangeText={(val) => dispatch(setPasswordChangeForm({ repeatNewPassword: val }))} placeholder="Repeat New Password" />
                    </Item>
                    {passwordChangeFormErrors.repeatNewPassword ? <Text style={{ marginLeft: 15, color: 'red', fontSize: 9 }}>{passwordChangeFormErrors.repeatNewPassword}</Text> : null}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }} >
                        <Button onPress={onFormDismiss} style={{ backgroundColor: '#DDBEA9' }}><Text>Cancel</Text></Button>
                        <Button onPress={onSubmit} style={{ backgroundColor: '#97A97C' }}><Text>Save</Text></Button>
                    </View>

                </Form>
                </View>
        </Modal>
    );
}

export default ChangePassword;