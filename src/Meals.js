import React, { Component, useEffect, useState } from 'react';
import { Container, Label, Item, Input, View, Text, Icon, Fab, Form, Body, Right, Subtitle, Title, Button } from 'native-base';
import { Modal, TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeal, getFoodList, getMeals, setMealCreateForm } from './redux/store';
import { useHistory } from 'react-router';

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

            <Modal visible={!!deleteMealModal} >
                <View style={{ alignItems: 'center', paddingTop: 250 }}>
                    <Text style={{ fontWeight: 'bold' }}>Are you sure you want to delete this meal?</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
<<<<<<< HEAD
                        <Button onPress={() => cancelDeleteMealAction()} style={{ backgroundColor: '#DDBEA9' }}><Text>Cancel</Text></Button>
                        <Button onPress={() => submitDeleteMealAction()} style={{ backgroundColor: '#97A97C' }}><Text>Delete</Text></Button>
=======
                        <Button onPress={() => cancelDeleteMealAction()} style={{ backgroundColor: '#81B29A', marginRight: 24 }}><Text>Cancel</Text></Button>
                        <Button onPress={() => submitDeleteMealAction()} style={{ backgroundColor: '#056608' }}><Text>Delete</Text></Button>
>>>>>>> ce9ee8e3e042014363ac2301efe77813ea0b0e08
                    </View>
                </View>
            </Modal>

<<<<<<< HEAD
            <Form style={{ padding: 10, paddingTop: 14 }}>
                <SwipeListView
                    style={{ padding: 5 }}
                    data={meals}
                    renderItem={(data, rowMap) => (
                        <View key={data.item.id.toString()} style={{ backgroundColor: '#EDDCD2', paddingBottom: 10, borderColor: '#2A9D8F', borderBottomWidth: 0, borderTopWidth: 1 }}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{data.item.name}</Text>
                            <Text style={{ color: 'grey' }}>{data.item.info}</Text>
                        </View>
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <View key={data.item.id.toString()} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'blue' }} onPress={() => updateMealAction(data.item)}>Edit</Text>
                            <Text style={{ color: 'red' }} onPress={() => deleteMealAction(data.item)}>Delete</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                    leftOpenValue={75}
                    rightOpenValue={-75}


                />
            </Form>
=======
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
                    <View key={data.item.id.toString()} style={{ backgroundColor: 'white', paddingBottom: 10, borderColor: '#2A9D8F', borderBottomWidth: 0, borderTopWidth: 1 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{data.item.name} ({data.item.foodItems.reduce((prev, curr) => prev + curr.foodComposition.KCALS, 0)} kcal)</Text>
                        <Text style={{ color: 'grey' }}>{data.item.info}</Text>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View key={data.item.id.toString()} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                        <Button icon transparent style={{ width: 75, height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => updateMealAction(data.item)}>
                            <Icon name='edit' type="MaterialIcons"/>
                            {/* <Text>Edit</Text> */}
                        </Button>
                        <Button icon transparent style={{ color: 'red', width: 75, height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => deleteMealAction(data.item)}>
                            <Icon name='delete' type="MaterialIcons" style={{color: 'red'}} />
                        </Button>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                leftOpenValue={75}
                rightOpenValue={-75}


            />
>>>>>>> ce9ee8e3e042014363ac2301efe77813ea0b0e08
            <Fab
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#b5c99a' }}
                position="bottomRight"
                onPress={openMealAddForm}
            ><Icon type="Octicons" name="plus" style={{ color: 'white' }} /></Fab>

        </Container >
    );

}