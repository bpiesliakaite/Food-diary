import React, { Component } from 'react';
import { Container, Header, View, Fab, Button, Icon, Text } from 'native-base';
import FoodEntryForm from './FoodEntryForm';
export default class Reports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        };
    }
    render() {
        return <FoodEntryForm />;
    }
}