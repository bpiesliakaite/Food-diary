import React, { Component } from 'react';
import { Container, Header, View, Fab, Button, Icon } from 'native-base';
export default class Reports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        };
    }
    render() {
        return (
            <Container>
                <Header />
                <View style={{ flex: 1 }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                    </Fab>
                </View>
            </Container>
        );
    }
}