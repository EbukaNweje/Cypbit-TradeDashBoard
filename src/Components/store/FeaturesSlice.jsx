// counterSlice.js

import {createSlice} from "@reduxjs/toolkit";

const swift = createSlice({
    name: "swift",
    initialState: {
        idValue: "",
        user: {},
        depositData: [],
        withdraw: [],
        plans: [],
        singlePlan: {},
    },

    reducers: {
        setIdValue(state, action) {
            state.idValue = action.payload;
        },
        swiftUserData(state, {payload}) {
            state.user = payload;
            console.log("Redux User data", payload);
        },

        updateDepositData(state, action) {
            state.depositData.push(action.payload);
            console.log("FIRST", action.payload);
            //  = [...state.depositData, action.payload]4
        },

        updatewithdraw(state, action) {
            state.withdraw.push(action.payload);
            console.log("FIRST", action.payload);
            //  = [...state.depositData, action.payload]
        },
        addPlans(state, {payload}) {
            // state.plans.push(payload);
            state.plans = [...state.plans, payload];

            console.log("Plan Added", payload);
        },
        getSinglePlan(state, {payload}) {
            state.singlePlan = payload;
            console.log("Single Plan Added", payload);
        },
        clearPlans(state) {
            state.plans = [];
        },
        removeSinglePlan: (state, { payload }) => {
          const updatedPlans = state.plans.filter(
            (item) => item.packageId !== payload.packageId
          );
          state.plans = updatedPlans;
          console.log("Single Plan Deleted", updatedPlans);
        },
    },
});

export const {
    setIdValue,
    swiftUserData,
    updateDepositData,
    updatewithdraw,
    addPlans,
    clearPlans,
    getSinglePlan,
    removeSinglePlan
} = swift.actions;
export default swift.reducer;
