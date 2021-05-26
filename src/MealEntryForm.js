import React, { useState, useEffect } from 'react';
import { Item, Icon, Picker, Form, Label, Input, Button, Text, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-native';
import { addMealItem, getMeals, MealTypeEnum, openMealEntryForm } from './redux/store';

const MealEntryForm = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.meals.isMealEntryModalOpen);

    const onFormDismiss = () => {
        dispatch(openMealEntryForm(false));
    }

    const [mealForm, setMealForm] = useState({
        mealType: '',
        meal: null,
        amount: 1
    });

    const meals = useSelector(state => state.meals.meals);

    useEffect(() => {
        if (!isOpen) {
            // setErrors({});
        }
    }, [isOpen]);

    useEffect(() => {
        dispatch(getMeals());
    }, []);

    const onSubmit = () => {
        dispatch(addMealItem(mealForm));
        dispatch(openMealEntryForm(true));
        setMealForm({
            mealType: '',
            meal: null,
            amount: 1
        });
    }

    const onMealSelect = (newValue) => {
        setMealForm(previous => ({ ...previous, meal: newValue }))
    }

    const onMealTypeChange = (newValue) => {
        setMealForm(previous => ({ ...previous, mealType: newValue }))
    }

    const mealTypeOptions = Object.values(MealTypeEnum).map(value =>
        <Picker.Item label={value} value={value} key={value} />
    );

    const mealOptions = meals.map(value => <Picker.Item label={value.name} value={value.id} key={value.id} />)

    const changePortion = (num) => {
        setMealForm(previousState => ({ ...previousState, amount: (previousState.amount + num) < 1 ? 1 : previousState.amount + num}))
    }

    return (
        <Modal visible={isOpen} onDismiss={onFormDismiss} transparent>
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
                    <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Meal Type</Label>
                    <Item >
                        <Picker
                            mode="dropdown"
                            iosHeader="Select Meal Type"
                            iosIcon={<Icon name="arrow-down" />}
                            selectedValue={mealForm.mealType}
                            onValueChange={onMealTypeChange}
                            style={{ flex: 1, height: 40 }}
                        >
                            {mealTypeOptions}
                        </Picker>
                    </Item>
                    <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Meal</Label>
                    <Item >
                        <Picker
                            mode="dropdown"
                            iosHeader="Select Meal"
                            iosIcon={<Icon name="arrow-down" />}
                            onValueChange={onMealSelect}
                            style={{ flex: 1, height: 40 }}
                        >
                            {mealOptions}
                        </Picker>
                    </Item>
                    {!!mealForm.meal && <>
                    <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Portions</Label>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button transparent style={{ margin: 15, borderColor: 'black', paddingRight: 60 }} onPress={() => changePortion(-1)}>
                            <Icon type="MaterialIcons" name="arrow-left" style={{ color: 'black'}} />
                        </Button>
                        
                        <Text style={{ padding: 15 }}>{mealForm.amount}</Text>
                        <Button transparent style={{ margin: 15, borderColor: 'black', paddingLeft: 60 }} onPress={() => changePortion(1)}>
                            <Icon type="MaterialIcons" name="arrow-right" style={{ color: 'black'}} />
                        </Button>
                    </View></>
                    }
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }} >
                        <Button onPress={onSubmit}><Text>Add Item</Text></Button>
                        <Button onPress={onFormDismiss}><Text>Cancel</Text></Button>
                    </View>
                    
                </Form>
            </View>
        </Modal>
    )
}

export default MealEntryForm;