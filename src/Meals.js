import React, { Component, useEffect, useState } from 'react';
import { Container, Label, Item, Input, View, Text, Icon, Fab, Left, Body, Right, Subtitle, Title, Button } from 'native-base';
import { TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodList, getMeals } from './redux/store';
import { useHistory } from 'react-router';

export default function Meals() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeals());
    }, []);

    const history = useHistory();

    const meals = useSelector(state => state.meals.meals);

    const [isInfoTooltipVisible, setInfoTootlipVisible] = useState(false);
    return (
        <Container>
            <View style={{ alignItems: 'center' }}>
                <Tooltip
                    isVisible={isInfoTooltipVisible}
                    content={<Text>Check this out!</Text>}
                    placement="bottom"
                    onClose={() => setInfoTootlipVisible(false)}
                    topAdjustment={Platform.OS === 'android' ? -25 : 0}
                >
                    <Button transparent onPress={() => setInfoTootlipVisible(true)}>
                        <Icon type="MaterialIcons" name="info-outline"></Icon>
                    </Button>
                </Tooltip>

            </View>
            <SwipeListView
                style={{ padding: 40 }}
                data={meals}
                renderItem={(data, rowMap) => (
                    <View style={{ backgroundColor: 'white', paddingBottom: 30, borderColor: 'blue', borderBottomWidth: 0, borderTopWidth: 1 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{data.item.name}</Text>
                        <Text style={{ color: 'grey' }}>{data.item.info}</Text>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'blue' }}>Edit</Text>
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}


            />
            <Fab
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => history.push('/meals/create')}
            ><Icon type="Octicons" name="plus" /></Fab>
        </Container>
    );

}