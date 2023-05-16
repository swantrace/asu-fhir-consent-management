// create a page for each questionnaire
import type { RouteDataArgs } from "solid-start";
import { Show, createEffect } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import { redirect } from "solid-start/server";
import { getSession } from "@auth/solid-start";
import { authOptions } from "../api/auth/[...solidauth]";

export function routeData({ params }: RouteDataArgs) {
  return createRouteData(
    async ([, id], event) => {
      const session = await getSession(event.request, authOptions);
      let formDefinition;
      if (!session) {
        throw redirect("/");
      } else {
        formDefinition = await fetch(
          `${process.env.FHIR_SERVER_BASE_URL}/Questionnaire/${id}`,
          {
            headers: {
              accept: "application/fhir+json",
            },
          }
        ).then((response) => response.json()); // 66609
      }
      return { session, formDefinition, id };
    },
    {
      key: () => ["questionnaire", params.id],
    }
  );
}

export default function Questionnaire() {
  const rd = useRouteData<typeof routeData>();
  createEffect(() => {
    document.addEventListener("lformsReady", (event) => {
      // @ts-ignore
      const timer = event?.detail?.timer;
      window.LForms.Util.addFormToPage(
        rd()?.formDefinition ?? {},
        `form-container-${rd()?.id}`,
        {
          prepopulate: true,
        }
      );
      clearInterval(timer);
    });
  });

  return (
    <Show when={rd()?.session} keyed>
      {(us) => (
        <main>
          <h1>Questionnaire {rd()?.id}</h1>
          <div id={`form-container-${rd()?.id}`}></div>
        </main>
      )}
    </Show>
  );
}
