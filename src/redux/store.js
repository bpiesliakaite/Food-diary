import { configureStore, createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import cookieParser from 'set-cookie-parser';

// Account
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


// Meals

export const MealTypeEnum = Object.freeze({
    Breakfast: 'Breakfast',
    Lunch: 'Lunch',
    Dinner: 'Dinner',
    Snacks: 'Snacks'
});

export const loadMealSelectOptions = createAsyncThunk(
    'mealsLoadMealSelectOptions',
    async (group) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.get('http://192.168.43.233:5000/food/foodByGroup', {
                params: {
                    group
                },
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                }
            });
            return response.data.foods;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getMeals = createAsyncThunk(
    'getMeals',
    async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.get('http://192.168.43.233:5000/food/meals', {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                }
            });
            return response.data.meals;
        } catch (exception) {
            console.log(exception);
        }
    }
);

export const getFoodList = createAsyncThunk(
    'mealsGetFoodList',
    async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.get('http://192.168.43.233:5000/food/foodEntries', {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                }
            });
            return response.data.userFood.reduce((foodObject, food) => ({
                ...foodObject,
                [food.mealType]: [...(foodObject[food.mealType] || []), food],
            }), {});
        } catch (error) {
            console.log(error);
        }
    }
);

export const addFoodItem = createAsyncThunk(
    'mealsAddFoodItem',
    async (newFoodItem) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.post('http://192.168.43.233:5000/food/createFoodEntry', newFoodItem, {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                }
            });
            if (response.status !== 201) {
                throw Error('creation failed');
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const addMeal = createAsyncThunk(
    'mealsAddMeal',
    async (newMeal) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.post('http://192.168.43.233:5000/food/meals', newMeal, {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                }
            });
            if (response.status !== 201) {
                throw Error('creation failed');
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

const mealsSlice = createSlice({
    name: 'meals',
    initialState: {
        mealSelectOptions: [],
        isFoodEntryModalOpen: false,
        foodList: {},
        meals: [],
    },
    reducers: {
        openFoodEntryForm: (state, action) => {
            state.isFoodEntryModalOpen = action.payload;
        }
    },
    extraReducers: {
        [loadMealSelectOptions.pending]: (state) => {
            state.mealSelectOptions = [];
        },
        [loadMealSelectOptions.fulfilled]: (state, action) => {
            state.mealSelectOptions = action.payload;
        },
        [getFoodList.fulfilled]: (state, action) => {
            state.foodList = action.payload;
        },
        [getMeals.fulfilled]: (state, action) => {
            state.meals = action.payload;
        },
        [addFoodItem.fulfilled]: (state, action) => {
            state.isFoodEntryModalOpen = false;
            state.foodList[action.payload.mealType] = [...(state.foodList[action.payload.mealType] || []), action.payload];
        },
        [addMeal.fulfilled]: (state, action) => {
            state.meals = [...state.meals, action.payload];
        }
    }
})

export const { openFoodEntryForm } = mealsSlice.actions;

const rootReducer = combineReducers({
    account: accountSlice.reducer,
    meals: mealsSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

