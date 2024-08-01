import { useUser } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();

  const { data } = await useAsyncData("user", () =>
    useRequestFetch()("/api/user")
  );
  if (data) {
    user.value = data.value;
  }
});
