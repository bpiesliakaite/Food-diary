import { configureStore, createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
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
    async (userData, { dispatch }) => {
        try {
            const response = await axios.post('http://192.168.43.233:5000/auth/login', userData);
            await SecureStore.setItemAsync('accessToken', cookieParser.parse(response)[0].value);
            dispatch(accountAuthorize());
        } catch (error) {
            console.log(error);
        }
    }
)

export const accountAuthorize = createAsyncThunk(
    'accountAuthorize',
    async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.get('http://192.168.43.233:5000/user/self', {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const accountLogout = createAsyncThunk(
    'accountLogout',
    async () => {
        try {
            await SecureStore.deleteItemAsync('accessToken');
            return null;
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
        [accountAuthorize.fulfilled]: (state, action) => {
            state.account = action.payload;
        },
        [accountLogout.pending]: (state, action) => {
            state.account = undefined;
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

