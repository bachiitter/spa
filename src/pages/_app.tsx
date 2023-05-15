import { Outlet, RootRoute } from "@tanstack/router";

export const appRoute = new RootRoute({
  component: () => {
    return (
      <main className="mx-auto w-full max-w-lg px-6">
        <Outlet />
      </main>
    );
  },
});
