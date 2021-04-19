import { configureStore, createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import cookieParser from 'set-cookie-parser';


export const accountRegister = createAsyncThunk(
    'accountRegister',
    async (userData, { dispatch }) => {
        try {
            const response = await axios.post('http://192.168.43.233:5000/auth/register', userData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        return {};
    }
)

export const accountLogin = createAsyncThunk(
    'accountLogin',
    async (userData) => {
        try {
            const response = await axios.post('http://192.168.43.233:5000/auth/login', userData);
            await AsyncStorage.setItem('accessToken', cookieParser.parse(response)[0].value);
            const response2 = await axios.get('http://192.168.43.233:5000/user/self', {
                headers: {
                    Cookie: `accessToken=${cookieParser.parse(response)[0].value}`,
                }
            })
            return response2.data;
        } catch (error) {
            console.log(error);
        }
    }
)
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: undefined,
        registered: false,
    },
    reducers: {
        authAccount: (state, action) => {
            state.account = action.payload;
        }
    },
    extraReducers: {
        [accountRegister.fulfilled]: (state, action) => {
            state.registered = true;
        },
        [accountLogin.fulfilled]: (state, action) => {
            state.account = action.payload;
        }
    }
})

export const { authAccount } = accountSlice.actions;

const rootReducer = combineReducers({
    account: accountSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

