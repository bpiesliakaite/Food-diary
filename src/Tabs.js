import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { useHistory, useLocation } from 'react-router';

const AppTabs = () => {
    const history = useHistory();
    const location = useLocation();

    const appearsOn = ['/dashboard', '/meals', '/reports', '/profile'];

    const openRoute = (route) => {
        if (route !== location.pathname) {
            history.push(route);
        }
    }

    if (!appearsOn.includes(location.pathname)) {
        return null;
    }

    return (
        <Footer >
            <FooterTab style={{ backgroundColor: "#056608" }}>
                <Button vertical active={location.pathname === '/dashboard'} onPress={() => openRoute('/dashboard')} >
                    <Icon type="Ionicons" name="book" style={{ color: 'white' }} />
                    <Text>Diary</Text>
                </Button>
                <Button vertical active={location.pathname === '/meals'} onPress={() => openRoute('/meals')}>
                    <Icon type="MaterialCommunityIcons" name="food" style={{ color: 'white' }} />
                    <Text>Meals</Text>
                </Button>
                <Button vertical active={location.pathname === '/reports'} onPress={() => openRoute('/reports')}>
                    <Icon type="MaterialIcons" name="stacked-bar-chart" style={{ color: 'white' }} />
                    <Text>Reports</Text>
                </Button>
                <Button vertical active={location.pathname === '/profile'} onPress={() => openRoute('/profile')}>
                    <Icon type="Ionicons" name="person" style={{ color: 'white' }} />
                    <Text>Profile</Text>
                </Button>
            </FooterTab>
        </Footer >)
}

export default AppTabs;