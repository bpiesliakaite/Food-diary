import React, { useState, useEffect, Component } from 'react';
import { Item, Icon, Picker, Form, Label, Input, Button, Text, View, DatePicker, Left, Textarea, Accordion } from 'native-base';
import { Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, useHistory } from 'react-router-native';
import { List } from 'native-base';
import { ListItem } from 'native-base';
import { Body } from 'native-base';
import { Right } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { addMeal, loadMealSelectOptions, MealTypeEnum, setMealCreateForm, updateMeal } from './redux/store';


const MealForm = () => {

    const FoodGroupEnum = Object.freeze({
        Vegetables: 'Vegetables',
        Nuts: 'Nuts',
        FishMeatEggs: 'Fish, meat, eggs',
        Fruits: 'Fruits',
        Grains: 'Grains',
        Dairy: 'Dairy',
        SweetsSugarsBeverages: 'Sweets, sugars, beverages',
        Alcohol: 'Alcohol',
        Fat: 'Fat',
    });

    const history = useHistory();
    const dispatch = useDispatch();
    const foodOptions = useSelector(state => state.meals.mealSelectOptions);
    const [errors, setErrors] = useState({});
    const [foodItemForm, setFoodItemForm] = useState({});
    const [foodItemEditKey, setFootItemEditKey] = useState('');
    const mealFormState = useSelector(state => state.meals.mealCreateForm);
    const [isModalOpen, setModal] = useState(false);

    const onFoodGroupChange = (newValue) => {
        setFoodItemForm(previousState => ({ ...previousState, foodGroup: newValue }));
        dispatch(loadMealSelectOptions(newValue));
    }

    useEffect(() => {
        dispatch(loadMealSelectOptions(FoodGroupEnum.Vegetables));
    }, []);

    useEffect(() => {
        if (foodOptions.length) {
            setFoodItemForm((prevState) => ({
                ...prevState,
                foodOption: foodOptions[0].id,
                foodOptionLabel: foodOptions[0].food,
            }));
        }

    }, [foodOptions])


    const addFoodItem = () => {
        setModal(true);
    }

    const editFoodItem = (key, foodItem) => {
        setFootItemEditKey(key);
        setFoodItemForm(foodItem);
        setModal(true);
    }

    const closeModalForm = () => {
        setModal(false);
        setFoodItemForm((prevState) => ({
            ...prevState,
            foodOption: foodOptions[0].id,
            foodOptionLabel: foodOptions[0].food,
            amount: ''
        }));
    }

    const submitFoodItem = () => {
        if (foodItemEditKey !== '') {
            dispatch(setMealCreateForm({
                ...mealFormState,
                foodItems:
                    mealFormState.foodItems.map((value, index) => index === foodItemEditKey ? foodItemForm : value),
            }));
        } else {
            dispatch(setMealCreateForm({
                ...mealFormState,
                foodItems: [
                    ...mealFormState.foodItems,
                    foodItemForm
                ]
            }));
        }
        setFootItemEditKey('');
        closeModalForm();
    }

    const removeFoodItem = (key) => {
        dispatch(setMealCreateForm({
            ...mealFormState,
            foodItems: mealFormState.foodItems.filter((value, index) => index !== key),
        }));
    }

    const onNameChange = (val) => {
        dispatch(setMealCreateForm({
            ...mealFormState,
            name: val
        }));
    }

    const onInfoChange = (val) => {
        dispatch(setMealCreateForm({
            ...mealFormState,
            info: val
        }));
    }

    const options = Object.values(FoodGroupEnum).map(value =>
        <Picker.Item label={value} value={value} key={value.toString()} />
    );

    const mealTypeOptions = Object.values(MealTypeEnum).map(value =>
        <Picker.Item label={value} value={value} key={value.toString()} />
    );

    const foodOptionItems = foodOptions.map(value => <Picker.Item label={value.food} value={value.id} key={value.id.toString()} />);
    const foodOptionsDictionary = foodOptions.reduce((foodMap, value) => ({ ...foodMap, [value.id]: value }), {});

    const onSubmit = () => {
        if (!mealFormState.id) {
            dispatch(addMeal({
                ...mealFormState,
                amount: parseInt(mealFormState.amount),
            }));
        } else {
            dispatch(updateMeal({
                ...mealFormState,
                amount: parseInt(mealFormState.amount),
            }));
            dispatch(setMealCreateForm({
                id: '',
                name: '',
                info: '',
                foodItems: []
            }));
        }
        
        history.push('/meals');
    }

    return (
        <Form style={{ padding: 30 }}>
            <Modal visible={isModalOpen} onDismiss={closeModalForm} transparent>
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
                                selectedValue={foodItemForm.mealType}
                                onValueChange={(val) => setFoodItemForm(previousState => ({ ...previousState, mealType: val }))}
                                style={{ flex: 1, height: 40 }}
                            >
                                {mealTypeOptions}
                            </Picker>
                        </Item>
                        <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Food Group</Label>
                        <Item>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Food Group"
                                iosIcon={<Icon name="arrow-down" />}
                                selectedValue={foodItemForm.foodGroup}
                                onValueChange={onFoodGroupChange}
                                style={{ flex: 1, height: 40 }}
                            >
                                {options}
                            </Picker>
                        </Item>

                        {foodOptionItems.length ? 
                        <><Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Food</Label>
                        <Item>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Meal"
                                iosIcon={<Icon name="arrow-down" />}
                                selectedValue={foodItemForm.food}
                                onValueChange={(val) => setFoodItemForm(previousState => ({ ...previousState, foodOption: val, foodOptionLabel: foodOptionsDictionary[val] ? foodOptionsDictionary[val].food : '' }))}
                                style={{ flex: 1, height: 40 }}
                            >
                                {foodOptionItems}
                            </Picker> 
                        </Item></> :
                        <><Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Food</Label>
                        <Item>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Meal"
                                iosIcon={<Icon name="arrow-down" />}
                                selectedValue={null}
                                style={{ flex: 1, height: 40 }}
                            >
                                <Picker.Item label={'Agar'} value={'Agario'} key={'temp1'} />
                            </Picker> 
                        </Item></>
                    }
                        
                        

                        <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Amount ({foodItemForm.foodGroup === FoodGroupEnum.Alcohol ? 'ml' : 'grams'})</Label>

                        <Item error={!!errors.amount}>
                            <Input keyboardType="numeric" value={foodItemForm.amount} onChangeText={(val) => setFoodItemForm(previousState => ({ ...previousState, amount: val }))} placeholder="Enter Amount" />
                        </Item>

                        {errors.amount ? <Text style={{ marginLeft: 15, color: 'red', fontSize: 9 }}>{errors.amount}</Text> : null}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                            <Button onPress={submitFoodItem}><Text>Add Item</Text></Button>
                            <Button onPress={closeModalForm}><Text>Cancel</Text></Button>
                        </View>
                    </Form>
                </View>
            </Modal>

            <Item stackedLabel>
                <Label style={{ color: 'blue', fontSize: 13 }}>Name</Label>
                <Input
                    value={mealFormState.name}
                    onChangeText={onNameChange}
                />
            </Item>

            <Item stackedLabel>
                <Label style={{ color: 'blue', fontSize: 13 }}>Info</Label>
                <Textarea
                    bordered
                    value={mealFormState.info}
                    onChangeText={onInfoChange}
                    style={{ width: '100%', margin: 0, fontSize: 13 }}
                />
            </Item>

            <List>
                <Label style={{ color: 'blue', fontSize: 13 }}>Consists of</Label>
                {!mealFormState.foodItems.length && <Text>No items yet</Text>}
                {mealFormState.foodItems.map((foodItem, indx) => {
                    return (<ListItem icon key={indx.toString()}>

                        <Body>
                            <Text>{foodItem.foodOptionLabel} - ({foodItem.amount} {foodItem.foodGroup === FoodGroupEnum.Alcohol ? 'ml' : 'grams'})</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => removeFoodItem(indx)}>
                                <Text style={{ color: 'red' }}>Remove</Text>
                            </Button>
                            <Button transparent onPress={() => editFoodItem(indx, foodItem)}>
                                <Text style={{ color: 'blue' }}>Edit</Text>
                            </Button>
                        </Right>
                    </ListItem>);
                })}

            </List>
            <Button onPress={() => addFoodItem()}>
                <Text>
                    Add Item
                </Text>
            </Button>
            <Button onPress={() => onSubmit()}>
                <Text>Save</Text>
            </Button>
        </Form>
    )
}

export default MealForm;