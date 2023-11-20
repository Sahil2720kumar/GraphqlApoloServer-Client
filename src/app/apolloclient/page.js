"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

const query=gql`
   query GetTodos {
      getTodos {
        title,
      }
   }
  `

export default function Page() {
  const { data,loading } = useSuspenseQuery(query);
  console.log(data)
  console.log("loading: "+loading)
  return <main>
  <h1>Client component </h1>
  {JSON.stringify(data)}
  </main>;
}