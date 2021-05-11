import React, { useState } from 'react';
import { Item, Picker, Icon, Form } from 'native-base';


const MealTypeEnum = Object.freeze({
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

const FoodEntryForm = () => {
    const [mealType, setMealType] = useState();

    const onMealTypeChange = (newValue) => {
        setMealType(newValue);
    }

    return (
        <Form style={{ padding: 30 }}>
            <Item >
                <Picker
                    mode="dropdown"
                    placeholder="Select Meal Type"
                    selectedValue={mealType}
                    onValueChange={onMealTypeChange}
                    style={{ height: 50, width: 20, }}
                >
                    {Object.values(MealTypeEnum).map(value => {
                        <Picker.Item label={value} value={value} key={value} />
                    })}
                </Picker>
            </Item>
        </Form>
    )
}

export default FoodEntryForm;