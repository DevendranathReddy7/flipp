import { query } from "express";
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userAPiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userAPiSlice