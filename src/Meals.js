import React, { Component, useEffect, useState } from 'react';
import { Container, Label, Item, Input, View, Text, Icon, Fab, Left, Body, Right, Subtitle, Title, Button } from 'native-base';
import { Modal, TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeal, getFoodList, getMeals, setMealCreateForm } from './redux/store';
import { useHistory } from 'react-router';
import { color } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function Meals() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeals());
    }, []);

    const history = useHistory();

    const meals = useSelector(state => state.meals.meals);

    const [isInfoTooltipVisible, setInfoTootlipVisible] = useState(false);
    const [deleteMealModal, setDeleteMealModal] = useState(null);

    const deleteMealAction = (meal) => {
        setDeleteMealModal(meal);
    }

    const cancelDeleteMealAction = () => {
        setDeleteMealModal(null);
    }

    const submitDeleteMealAction = () => {
        dispatch(deleteMeal(deleteMealModal));
        setDeleteMealModal(null);
    }

    const updateMealAction = (meal) => {
        dispatch(setMealCreateForm(meal));
        history.push('/meals/edit');
    }

    const openMealAddForm = () => {
        dispatch(setMealCreateForm({
            id: '',
            name: '',
            info: '',
            foodItems: []
        }));
        history.push('/meals/create');
    }

    return (
        <Container >

            <Modal visible={!!deleteMealModal}>
                <View style={{ alignItems: 'center' }}>
                    <Text>Are you sure you want to delete this meal?</Text>
                    <Button onPress={() => submitDeleteMealAction()}>
                        <Text>Delete</Text>
                    </Button>
                    <Button onPress={() => cancelDeleteMealAction()}>
                        <Text>Cancel</Text>
                    </Button>
                </View>
            </Modal>

            <View style={{ alignItems: 'center', padding: 10, backgroundColor: '#81B29A' }}>
                <Text style={{ fontWeight: 'bold' }}>THESE ARE YOUR FAVOURITE MEALS</Text>
                <View style={{ alignItems: 'center', }}>
                    <Tooltip
                        isVisible={isInfoTooltipVisible}
                        content={<Text>Here You can create Your favourite meals to make food journaling easier</Text>}
                        placement="bottom"
                        onClose={() => setInfoTootlipVisible(false)}
                        topAdjustment={Platform.OS === 'android' ? -25 : 0}
                    >
                        <Button transparent onPress={() => setInfoTootlipVisible(true)}>
                            <Icon type="MaterialIcons" name="info-outline"></Icon>
                        </Button>
                    </Tooltip>
                </View >
            </View>

            <SwipeListView
                style={{ padding: 5 }}
                data={meals}
                renderItem={(data, rowMap) => (
                    <View style={{ backgroundColor: 'white', paddingBottom: 10, borderColor: '#2A9D8F', borderBottomWidth: 0, borderTopWidth: 1 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{data.item.name}</Text>
                        <Text style={{ color: 'grey' }}>{data.item.info}</Text>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'blue' }} onPress={() => updateMealAction(data.item)}>Edit</Text>
                        <Text style={{ color: 'red' }} onPress={() => deleteMealAction(data.item)}>Delete</Text>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}


            />
            <Fab
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#81B29A' }}
                position="bottomRight"
                onPress={openMealAddForm}
            ><Icon type="Octicons" name="plus" style={{ color: 'white' }} /></Fab>
        </Container >
    );

}