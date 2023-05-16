// create a page for each questionnaire

import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getSession } from "@auth/solid-start";
import { signOut } from "@auth/solid-start/client";
import { authOptions } from "../api/auth/[...solidauth]";

export const routeData = () => {
  return createServerData$(async (_, event) => {
    const session = await getSession(event.request, authOptions);
    if (!session) {
      throw redirect("/");
    }
    return session;
  });
};

export default function Questionnaire() {
  const session = useRouteData<typeof routeData>();

  return (
    <Show when={session()} keyed>
      {(us) => (
        <main>
          <h1>Questionnaire List Or Searchbox</h1>
        </main>
      )}
    </Show>
  );
}
