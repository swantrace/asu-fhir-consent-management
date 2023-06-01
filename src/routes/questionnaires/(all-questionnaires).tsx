import { Show, createEffect } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getSession } from "@auth/solid-start";
import { signOut } from "@auth/solid-start/client";
import { authOptions } from "../api/auth/[...solidauth]";

export const routeData = () => {
  return createServerData$(
    async (_, event) => {
      const session = await getSession(event.request, authOptions);
      let questionnaires;
      if (!session) {
        throw redirect("/");
      } else {
        // questionnaires = await axios
        //   .get(`${process.env.FHIR_SERVER_BASE_URL}/Questionnaire`)
        //   .then((res) => res.data.entry)
        //   .catch((e) => {
        //     console.log("e", e);
        //   });
        const res = await fetch(`${process.env.FHIR_SERVER_BASE_URL}/Patient`, {
          headers: {
            "Content-Type": "application/fhir+json",
            Accept: "*/*",
          },
        });
        console.log("res", res);
        questionnaires = await res.json();

        console.log("questionnaires", questionnaires);
      }
      return { session, questionnaires };
    },
    {
      key: () => ["questionnaires", "list"],
    }
  );
};

export default function Questionnaire() {
  const rd = useRouteData<typeof routeData>();
  createEffect(() => {
    const questionnaires = fetch(
      `https://gw.interop.community/ASUR4TEST/open/Questionnaire`
    )
      .then((res) => res.json())
      .then(console.log)
      .catch((e) => {
        console.log("e", e);
      });
  });
  return (
    <Show when={rd()?.session} keyed>
      {(us) => (
        <main>
          <h1>Questionnaire List Or Searchbox</h1>
        </main>
      )}
    </Show>
  );
}
