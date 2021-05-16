import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { Accordion, View, Text, Icon, Fab, Button, ListItem, Left, Body, Right, List } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodList, openFoodEntryForm, MealTypeEnum } from './redux/store';
import FoodEntryForm from './FoodEntryForm';


const FoodGroupIcons = Object.freeze({
    'Alcohol': (
        <Button style={{ backgroundColor: 'pink' }}>
            <Icon active type="MaterialCommunityIcons" name="bottle-wine" />
        </Button>
    )
})


export default function Dashboard() {

    useEffect(() => {
        dispatch(getFoodList());
    }, []);
    const foodList = useSelector(state => state.meals.foodList);
    const renderList = (mealType) => (
        foodList[mealType] ? foodList[mealType].map((value, index) => (
            <ListItem icon key={index}>
                <Left>
                    {FoodGroupIcons[value.group] || <Button style={{ backgroundColor: "#FF9501" }}>
                        <Icon active name="airplane" />
                    </Button>}
                </Left>
                <Body><Text>{value.food}</Text></Body>
                <Right>
                    <Text>{value.amount}{value.group === 'Alcohol' ? ' ml' : ' g'}</Text>
                </Right>
            </ListItem>
        )) : null);

    const dataArray = [
        { title: MealTypeEnum.Breakfast, content: renderList(MealTypeEnum.Breakfast) },
        { title: MealTypeEnum.Lunch, content: renderList(MealTypeEnum.Lunch) },
        { title: MealTypeEnum.Dinner, content: renderList(MealTypeEnum.Dinner) },
        { title: MealTypeEnum.Snacks, content: renderList(MealTypeEnum.Snacks) },
    ];

    const renderHeader = (item, expanded) => {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#A9DAD6"
            }} >
                <Text style={{ fontWeight: "600" }}>
                    {" "}{item.title}
                </Text>
                {
                    expanded
                        ? <Icon type="AntDesign" style={{ fontSize: 18 }} name="arrowup" />
                        : <Icon type="AntDesign" style={{ fontSize: 18 }} name="arrowdown" />
                }
            </View >
        );
    }

    const renderContent = (item) => (
        <View style={{ margin: 5 }}>
            {item.content}
        </View>
    )

    const dispatch = useDispatch();

    const onFoodEntryCreateClick = () => {
        dispatch(openFoodEntryForm(true));
    }

    return (
        <>
            <Accordion dataArray={dataArray} expanded={[]} renderHeader={renderHeader} renderContent={renderContent} />
            <Fab
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
            ><Icon type="Octicons" name="plus" onPress={onFoodEntryCreateClick} /></Fab>
            <FoodEntryForm />
        </>
    );
}
