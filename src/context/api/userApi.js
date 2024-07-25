import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6645a471b8925626f892813d.mockapi.io/school/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "teachers",
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/teachers", // Specify the endpoint path for creating a user
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
