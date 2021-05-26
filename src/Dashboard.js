import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { format, addDays, isToday } from 'date-fns';
import { Accordion, View, Text, Icon, Fab, Button, ListItem, Left, Body, Right, List } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodList, openFoodEntryForm, MealTypeEnum } from './redux/store';
import FoodEntryForm from './FoodEntryForm';


const FoodGroupIcons = Object.freeze({
    'Alcohol': (
        <Button style={{ backgroundColor: '#9BF6FF', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="bottle-wine" style={{ color: 'black' }} />
        </Button>
    ),
    'Vegetables': (
        <Button style={{ backgroundColor: '#CAFFBF', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="carrot" style={{ color: 'black' }} />
        </Button>
    ),
    'Nuts': (
        <Button style={{ backgroundColor: '#FFFDD0', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="peanut-outline" style={{ color: 'black' }} />
        </Button>
    ),
    'Fish, meat, eggs': (
        <Button style={{ backgroundColor: '#FFADAD', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="fish" style={{ color: 'black' }} />
        </Button>
    ),
    'Fruits': (
        <Button style={{ backgroundColor: '#FFD6A5', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="fruit-pineapple" style={{ color: 'black' }} />
        </Button>
    ),
    'Grains': (
        <Button style={{ backgroundColor: '#BDB2FF', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="seed-outline" style={{ color: 'black' }} />
        </Button>
    ),
    'Dairy': (
        <Button style={{ backgroundColor: '#FDFFB6', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="cheese" style={{ color: 'black' }} />
        </Button>
    ),
    'Sweets, sugars, beverages': (
        <Button style={{ backgroundColor: '#FFC6FF', borderRadius: 25 }}>
            <Icon active type="MaterialCommunityIcons" name="candycane" style={{ color: 'black' }} />
        </Button>
    )
})


export default function Dashboard() {
    const foodList = useSelector(state => state.meals.foodList);
    const renderList = (mealType) => (
        foodList && foodList[mealType] ? foodList[mealType].map((value, index) => (
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

    const [date, setDate] = useState(new Date());

    const addDaysClick = (amount) => {
        setDate(previous => addDays(previous, amount))
    }

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

    useEffect(() => {
        dispatch(getFoodList(date));
    }, [date]);

    const onFoodEntryCreateClick = () => {
        dispatch(openFoodEntryForm(true));
    }

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button onPress={() => addDaysClick(-1)}>
                    <Text>{'<'}</Text>
                </Button>
                <Text>{format(date, 'yyyy-MM-dd')}</Text>
                <Button disabled={isToday(date)}onPress={() => addDaysClick(1)}>
                    <Text>{'>'}</Text>
                </Button>
            </View>
            <Accordion dataArray={dataArray} expanded={[]} renderHeader={renderHeader} renderContent={renderContent} />
            {isToday(date) ? <Fab
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={onFoodEntryCreateClick}
            ><Icon type="Octicons" name="plus" /></Fab> : null}
            <FoodEntryForm />
        </>
    );
}

