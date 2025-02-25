import { serviceApi } from "./serviceApi";

export const profileApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => ({
        url: `admin/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<any, any & { id: string }>({
      query: (profile) => {
        let { id } = profile;

        return {
          url: `admin/profile/${id}`,
          method: "PUT",
          body: profile,
        };
      },

      invalidatesTags: ["Profile"],
    }),
  }),
});
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
