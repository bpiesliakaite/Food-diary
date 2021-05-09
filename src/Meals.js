import React, { Component, useState } from 'react';
import { Container, Label, Item, Input, View, Text, Icon, Fab, Left, Body, Right, Subtitle, Title, Button } from 'native-base';
import { TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Tooltip from 'react-native-walkthrough-tooltip';

export default function Meals() {

    const [list, setList] = useState(Array(7)
        .fill("")
        .map((_, i) => ({ key: `${i}`, text: `This Is #${i} Meal Title` })));

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
                data={list}
                renderItem={(data, rowMap) => (
                    <View style={{ backgroundColor: 'white', paddingBottom: 30, borderColor: 'blue', borderBottomWidth: 0, borderTopWidth: 1 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{data.item.text}</Text>
                        <Text style={{ color: 'grey' }}>This is very detailed and long favourite meal description to test if this texts fits alright in the app</Text>
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
            ><Icon type="Octicons" name="plus" /></Fab>
        </Container>
    );

}