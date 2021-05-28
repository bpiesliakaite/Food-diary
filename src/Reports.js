import React, { useEffect, useState } from 'react';
import { Container, Header, View, Fab, Button, Icon, Text } from 'native-base';
import FoodEntryForm from './FoodEntryForm';
import { format, isToday, addDays, isSameDay } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { MealTypeEnum, getFoodList, getMeals } from './redux/store';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const FoodGroupEnum = Object.freeze({
    Vegetables: 'Vegetables',
    Nuts: 'Nuts',
    FishMeatEggs: 'Fish, meat, eggs',
    Fruits: 'Fruits',
    Grains: 'Grains',
    Dairy: 'Dairy',
    SweetsSugarsBeverages: 'Sweets, sugars, beverages',
    Alcohol: 'Alcohol',
});

const getMealFoodGroupAmount = (meal, meals, foodGroup) => {
    const mealObject = meals.find(mealEntry => meal.id === mealEntry.id);
    if(!mealObject) {
        return 0;
    }
    console.log(mealObject);
    const foodItemsAmounts = mealObject.foodItems.filter(item => item.group === foodGroup).reduce((sum, value) => sum + value.amount, 0);
    return foodItemsAmounts;
}

const countFoodItemsForGroup = (foodList, foodGroup, meals) => {
    const breakfast = foodList[MealTypeEnum.Breakfast]?.filter(value => value.group === foodGroup).reduce((sum, value) => sum + value.amount, 0);
    const lunch = foodList[MealTypeEnum.Lunch]?.filter(value => value.group === foodGroup).reduce((sum, value) => sum + value.amount, 0);
    const dinner = foodList[MealTypeEnum.Dinner]?.filter(value => value.group === foodGroup).reduce((sum, value) => sum + value.amount, 0);
    const snacks = foodList[MealTypeEnum.Snacks]?.filter(value => value.group === foodGroup).reduce((sum, value) => sum + value.amount, 0);
    const breakfastMeals = foodList[MealTypeEnum.Breakfast]?.filter(value => !!value.meal).reduce((sum, value) => sum + getMealFoodGroupAmount(value.meal, meals, foodGroup) * value.amount, 0);
    const lunchMeals = foodList[MealTypeEnum.Lunch]?.filter(value => !!value.meal).reduce((sum, value) => sum + getMealFoodGroupAmount(value.meal, meals, foodGroup) * value.amount, 0);
    const dinnerMeals = foodList[MealTypeEnum.Dinner]?.filter(value => !!value.meal).reduce((sum, value) => sum + getMealFoodGroupAmount(value.meal, meals, foodGroup) * value.amount, 0);
    const snacksMeals = foodList[MealTypeEnum.Snacks]?.filter(value => !!value.meal).reduce((sum, value) => sum + getMealFoodGroupAmount(value.meal, meals, foodGroup) * value.amount, 0);
    return (breakfast || 0) + (lunch || 0) + (dinner || 0) + (snacks || 0) + (breakfastMeals || 0) + (lunchMeals || 0) + (dinnerMeals || 0) + (snacksMeals || 0);
}

const chartConfig = {
  
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(${ Math.round( opacity * 100)}, ${Math.round( opacity * 200)}, ${Math.round( opacity * 50)}, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const theDayBeforeYesterday = {
    labels: ["Vit C", "Sugar", "Vit B6"], // optional
    data: [0.92, 0.84, 0.03]
}

const yesterday = {
    label: ["Vit C", "Sugar", "Vit B6"],
    data: [1, 0.21, 0.18],
}

const today = {
  label: ["Vit C", "Sugar", "Vit B6"],
  data: [0.08, 0.3, 0.42]
}

const longPast = {
    label: ["Vit C", "Sugar", "Vit B6"],
    data: [0, 0, 0]
}

const isDaysBefore = (date, days) => isSameDay(addDays(new Date(), -days), date);

const Reports = () => {
    const [date, setDate] = useState(new Date());

    const addDaysClick = (amount) => {
        setDate(previous => addDays(previous, amount))
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFoodList(date));
    }, [date]);
    useEffect(() => {
        dispatch(getMeals());
    }, []);
    const foodList = useSelector(state => state.meals.foodList);
    const meals = useSelector(state => state.meals.meals);

    const data = [
        {
            name: `g ${FoodGroupEnum.Vegetables}`,
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.Vegetables, meals),
            color: "#CAFFBF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: `ml ${FoodGroupEnum.Alcohol}`,
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.Alcohol, meals),
            color: "#9BF6FF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: `g ${FoodGroupEnum.Nuts}`,
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.Nuts, meals),
            color: "#FFFDD0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: 'g Fish, meat',
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.FishMeatEggs, meals),
            color: "#FFADAD",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: `g ${FoodGroupEnum.Fruits}`,
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.Fruits, meals),
            color: "#FFD6A5",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: `g ${FoodGroupEnum.Grains}`,
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.Grains, meals),
            color: "#BDB2FF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: `g ${FoodGroupEnum.Dairy}`,
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.Dairy, meals),
            color: "#FDFFB6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: 'g Sweets & Sugars',
            count: countFoodItemsForGroup(foodList, FoodGroupEnum.SweetsSugarsBeverages, meals),
            color: "#FFC6FF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ]
    return (<>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button onPress={() => addDaysClick(-1)}>
                    <Text>{'<'}</Text>
                </Button>
                <Text>{format(date, 'yyyy-MM-dd')}</Text>
                <Button disabled={isToday(date)}onPress={() => addDaysClick(1)}>
                    <Text>{'>'}</Text>
                </Button>
            </View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold'}}>Daily food consumption by type</Text>
    <PieChart
  data={data}
  width={screenWidth}
  height={200}
  chartConfig={chartConfig}
  accessor={"count"}
  backgroundColor={"transparent"}
  paddingLeft={"0"}
  center={[0, 0]}
  absolute
/>
<Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 50 }}>Vit C, Sugar and Vit B6 daily limits</Text>
<ProgressChart
  data={isDaysBefore(date, 0) ? today : isDaysBefore(date, 1) ? yesterday : isDaysBefore(date, 2) ? theDayBeforeYesterday : longPast}
  width={screenWidth}
  height={200}
  strokeWidth={12}
  radius={36}
  chartConfig={chartConfig}
  hideLegend={false}
/>
<View style={{ marginLeft: 75, width: 175 }}>
    <Text style={{ fontWeight: 'bold' }}>Norms</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Vitamin C: </Text><Text style={{ width: 50 }}>90mg</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Sugar: </Text><Text style={{ width: 50 }}>24g</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Vitamin B6: </Text><Text style={{ width: 50 }}>2mg</Text>
    </View>
</View>
</>
)
}

export default Reports