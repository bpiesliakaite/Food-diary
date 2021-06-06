import { configureStore, createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import cookieParser from 'set-cookie-parser';

const baseUrl = 'http://192.168.43.233:5000';

// Account
export const accountRegister = createAsyncThunk(
    'accountRegister',
    async (userData, { dispatch }) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/register`, userData);
            return 'Account successfully created';
        } catch (error) {
            if (error.response.status === 400) {
                return 'User already exists';
            }
            console.log(error);
            return 'Something went wrong';
        }
    }
)

export const accountLogin = createAsyncThunk(
    'accountLogin',
    async (userData, { dispatch }) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/login`, userData);
            await SecureStore.setItemAsync('accessToken', cookieParser.parse(response)[0].value);
            dispatch(accountAuthorize());
            return null;
        } catch (error) {
            if (error.response.status === 401) {
                return 'Invalid credentials';
            }
            console.log(error);
        }
    }
)

export const accountAuthorize = createAsyncThunk(
    'accountAuthorize',
    async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.get(`${baseUrl}/user/self`, {
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
            const accessToken = await SecureStore.getItemAsync('accessToken');
            await axios.post(`${baseUrl}/auth/logout`);
            await SecureStore.deleteItemAsync('accessToken');
            return true;
        } catch (error) {
            console.log(error);
        }
    }
)

export const accountEdit = createAsyncThunk(
    'accountEdit',
    async (data) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.post(`${baseUrl}/user/update`, data, {
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
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: undefined,
        registered: false,
        loginError: null,
        registerError: null,
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
            console.log(action.payload);
            state.account = action.payload;
            state.loginError = null;
            state.registerError = null;
        },
        [accountEdit.fulfilled]: (state, action) => {
            state.account = action.payload;
        },
        [accountLogin.fulfilled]: (state, action) => {
            state.loginError = action.payload;
        },
        [accountRegister.fulfilled]: (state, action) => {
            state.registerError = action.payload;
        },
        [accountLogout.fulfilled]: (state, action) => {
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
            const response = await axios.get(`${baseUrl}/food/foodByGroup`, {
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
            const response = await axios.get(`${baseUrl}/food/meals`, {
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
    async (date) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.get(`${baseUrl}/food/foodEntries`, {
                params: {
                    date,
                },
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
            const response = await axios.post(`${baseUrl}/food/createFoodEntry`, newFoodItem, {
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

export const addMealItem = createAsyncThunk(
    'mealsAddFoodMealItem',
    async (newFoodItem) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.post(`${baseUrl}/food/createMealEntry`, newFoodItem, {
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
            const response = await axios.post(`${baseUrl}/food/meals`, newMeal, {
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

export const updateMeal = createAsyncThunk(
    'mealsEditMeal',
    async (updatedMeal) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.put(`${baseUrl}/food/meals/${updatedMeal.id}`, updatedMeal, {
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

export const deleteMeal = createAsyncThunk(
    'mealsDeleteMeal',
    async (meal) => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const response = await axios.delete(`${baseUrl}/food/meals/${meal.id}`, {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                }
            });
            return meal.id;
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
        isMealEntryModalOpen: false,
        foodList: {},
        meals: [],
        mealCreateForm: {
            id: '',
            name: '',
            info: '',
            foodItems: []
        }
    },
    reducers: {
        openFoodEntryForm: (state, action) => {
            state.isFoodEntryModalOpen = action.payload;
        },
        openMealEntryForm: (state, action) => {
            state.isMealEntryModalOpen = action.payload;
        },
        setMealCreateForm: (state, action) => {
            state.mealCreateForm = action.payload;
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
            state.meals = action.payload.map((mealEntry) => ({
                ...mealEntry,
                foodItems: mealEntry.foodItems.map((foodItem) => ({
                    foodOption: foodItem.foodDataId,
                    foodOptionLabel: foodItem.foodData.food,
                    amount: foodItem.amount,
                    group: foodItem.foodData.group
                }))
            }));
        },
        [updateMeal.fulfilled]: (state, action) => {
            state.meals = state.meals.map((meal) => {
                if (meal.id === action.payload.id) {
                    return {
                        ...action.payload,
                        foodItems: action.payload.foodItems.map((foodItem) => ({
                            foodOption: foodItem.foodDataId,
                            foodOptionLabel: foodItem.foodData.food,
                            amount: foodItem.amount
                        }))
                    };
                }
                return meal;
            });
        },
        [deleteMeal.fulfilled]: (state, action) => {
            state.meals = state.meals.filter((meal) => meal.id !== action.payload);
        },
        [addFoodItem.fulfilled]: (state, action) => {
            state.isFoodEntryModalOpen = false;
            console.log(action.payload);

            state.foodList[action.payload.mealType] = [...(state.foodList[action.payload.mealType] || []), action.payload];
        },
        [addMealItem.fulfilled]: (state, action) => {
            state.isMealEntryModalOpen = false;
            console.log(action.payload);
            state.foodList[action.payload.mealType] = [...(state.foodList[action.payload.mealType] || []), action.payload];
        },
        [addMeal.fulfilled]: (state, action) => {
            state.meals = [...state.meals, action.payload];
        }
    }
})

export const { openFoodEntryForm, setMealCreateForm, openMealEntryForm } = mealsSlice.actions;

const rootReducer = combineReducers({
    account: accountSlice.reducer,
    meals: mealsSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

