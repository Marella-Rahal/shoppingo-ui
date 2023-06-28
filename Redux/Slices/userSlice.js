import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        user:{},
        seller:{}
    },
    reducers:{

        saveUser:(state,action)=>{
            state.user = action.payload
        },
        saveSeller:(state,action)=>{
            state.seller = action.payload
        },

    },
    extraReducers: builder => {

        builder.addCase(HYDRATE, (state, action) => {

            console.log("Before Hydration in userSlice : " , action.payload)

            if( Object.keys(action.payload.userSlice.user).length !== 0 ){
                state.user = action.payload.userSlice.user;
            }

            if( Object.keys(action.payload.userSlice.seller).length !== 0 ){
                state.seller = action.payload.userSlice.seller;
            }
            
        });

    }
})

export const { saveUser ,saveSeller } = userSlice.actions;
export const selectUser = state => state.userSlice.user;
export const selectSeller = state => state.userSlice.seller;
export default userSlice.reducer;