import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { Accordion, View, Text, Icon, Fab, Button, Row, Form, Item, Picker, Input } from 'native-base';
import { useSelector } from 'react-redux';

const dataArray = [
    { title: 'Breakfast', content: 'this is very breakfast' },
    { title: 'Lunch', content: 'this is lunch' },
    { title: 'Dinner', content: 'this is dinner' },
    { title: 'Snacks', content: 'this is snacks' },
];

export default function Dashboard() {

    const account = useSelector(state => state.account.account);

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
        <View style={{
            flexDirection: "row",
            justifyContent: 'center',
            margin: 5,
        }}>
            <Text>{item.content}</Text>
            <Button iconLeft>
                <Icon type="Octicons" name="plus" />
                <Text>Add item</Text>
            </Button>
        </View>
    )

    return (
        <>
            {/* <Text>Welcome {account.email}</Text> */}
            <Accordion dataArray={dataArray} expanded={[]} renderHeader={renderHeader} renderContent={renderContent} />
            <Fab
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
            ><Icon type="Octicons" name="plus" /></Fab>
            <Modal visible={false} onRequestClose={() => { }}>
                <Form>
                    <Item>
                        <Input placeholder="Username" />
                    </Item>
                    <Item last>
                        <Picker note mode="dropdown" style={{ width: 120, height: 40 }} selectedValue="key">
                            <Picker.Item label="Test" value="key" />
                            <Picker.Item label="Test2" value="key2" />
                        </Picker>
                    </Item>
                </Form>
            </Modal>
        </>
    );
}
