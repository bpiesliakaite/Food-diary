import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { useHistory, useLocation } from 'react-router';

const AppTabs = () => {
    const history = useHistory();
    const location = useLocation();

    const openRoute = (route) => {
        if (route !== location.pathname) {
            history.push(route);
        }
    }
    return (<Footer>
        <FooterTab>
            <Button vertical active={location.pathname === '/dashboard'} onPress={() => openRoute('/dashboard')}>
                <Icon type="Ionicons" name="book" />
                <Text>Diary</Text>
            </Button>
            <Button vertical active={location.pathname === '/meals'} onPress={() => openRoute('/meals')}>
                <Icon type="MaterialCommunityIcons" name="food" />
                <Text>Meals</Text>
            </Button>
            <Button vertical active={location.pathname === '/reports'} onPress={() => openRoute('/reports')}>
                <Icon type="MaterialIcons" name="stacked-bar-chart" />
                <Text>Reports</Text>
            </Button>
            <Button vertical active={location.pathname === '/profile'} onPress={() => openRoute('/profile')}>
                <Icon type="Ionicons" name="person" />
                <Text>Profile</Text>
            </Button>
        </FooterTab>
    </Footer>)
}

export default AppTabs;