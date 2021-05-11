import React, { useState } from 'react';
import { Item, Icon, Picker, Form, Label, Input, Button, Text, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-native';
import { loadMealSelectOptions, openFoodEntryForm } from './redux/store';


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
})

const MealTypeEnum = Object.freeze({
    Breakfast: 'Breakfast',
    Lunch: 'Lunch',
    Dinner: 'Dinner',
    Snacks: 'Snacks'
})

const FoodEntryForm = () => {
    const [foodGroup, setFoodGroup] = useState();
    const [food, setFood] = useState();
    const [mealType, setMealType] = useState();
    const foodOptions = useSelector(state => state.meals.mealSelectOptions);
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.meals.isFoodEntryModalOpen);

    const onFoodGroupChange = (newValue) => {
        setFoodGroup(newValue);
        dispatch(loadMealSelectOptions(newValue));
    }

    const onFoodChange = (newValue) => {
        setFood(newValue);
    }

    const onMealTypeChange = (newValue) => {
        setMealType(newValue);
    }

    const onFormDismiss = () => {
        dispatch(openFoodEntryForm(false));
    }

    const options = Object.values(FoodGroupEnum).map(value =>
        <Picker.Item label={value} value={value} key={value} />
    );

    const mealTypeOptions = Object.values(MealTypeEnum).map(value =>
        <Picker.Item label={value} value={value} key={value} />
    );

    const foodOptionItems = foodOptions.map(value => <Picker.Item label={value.food} value={value.id} key={value.id} />)

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
                    <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Food Group</Label>
                    <Item >
                        <Picker
                            mode="dropdown"
                            iosHeader="Select Meal Type"
                            iosIcon={<Icon name="arrow-down" />}
                            selectedValue={mealType}
                            onValueChange={onMealTypeChange}
                            style={{ flex: 1, height: 40 }}
                        >
                            {mealTypeOptions}
                        </Picker>
                    </Item>
                    <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Food Group</Label>
                    <Item >
                        <Picker
                            mode="dropdown"
                            iosHeader="Select Food Group"
                            iosIcon={<Icon name="arrow-down" />}
                            selectedValue={foodGroup}
                            onValueChange={onFoodGroupChange}
                            style={{ flex: 1, height: 40 }}
                        >
                            {options}
                        </Picker>
                    </Item>
                    <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Food</Label>
                    <Item >
                        <Picker
                            mode="dropdown"
                            iosHeader="Select Meal"
                            iosIcon={<Icon name="arrow-down" />}
                            selectedValue={food}
                            onValueChange={onFoodChange}
                            style={{ flex: 1, height: 40 }}
                        >
                            {foodOptionItems}
                        </Picker>
                    </Item>
                    <Label style={{ color: 'blue', paddingLeft: 15, fontSize: 13, marginTop: 10 }}>Amount ({foodGroup === FoodGroupEnum.Alcohol ? 'ml' : 'mg'})</Label>
                    <Item>
                        <Input placeholder="Enter Amount" />
                    </Item>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                        <Button><Text>Add Item</Text></Button>
                        <Button onPress={onFormDismiss}><Text>Cancel</Text></Button>
                    </View>
                </Form>
            </View>
        </Modal>
    )
}

export default FoodEntryForm;