import React, { useEffect, useState } from 'react';
import { Container, Header, View, Fab, Button, Icon, Text } from 'native-base';
import FoodEntryForm from './FoodEntryForm';
import { format, isToday, addDays } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { MealTypeEnum, getFoodList, getMeals } from './redux/store';
import { PieChart } from 'react-native-chart-kit';

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
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

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
    <PieChart
  data={data}
  width={400}
  height={200}
  chartConfig={chartConfig}
  accessor={"count"}
  backgroundColor={"transparent"}
  paddingLeft={"0"}
  center={[0, 0]}
  absolute
/>
</>
)
}

export default Reports