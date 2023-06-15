import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        user:{}
    },
    reducers:{

        saveUser:(state,action)=>{
            state.user = action.payload
        },

    },
    extraReducers: builder => {

        builder.addCase(HYDRATE, (state, action) => {

            console.log("Before Hydration in userSlice : " , action.payload)

            if( Object.keys(action.payload.userSlice.user).length !== 0 ){
                state.user = action.payload.userSlice.user;
            }
            
        });

    }
})

export const { saveUser } = userSlice.actions;
export const selectUser = state => state.userSlice.user;
export default userSlice.reducer;