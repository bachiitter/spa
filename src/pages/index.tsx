import { Route } from "@tanstack/router";

import { appRoute } from "./_app";

export const IndexRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/",
  component: Home,
});

function Home() {
  return (
    <>
      <h1>Hello Webpack</h1>
    </>
  );
}
