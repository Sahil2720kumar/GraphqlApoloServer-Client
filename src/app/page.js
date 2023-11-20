import Image from 'next/image'
import { getClient } from "@/helper/client";
import { gql } from "@apollo/client";

const query=gql`
   query GetTodos {
      getTodos {
        id
        title,
        user{
          name
        }
      }
    }
  `
//server side graphql request
export default async function Home() {
  const { data,loading } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  console.log("data",loading)
  //console.log(data)
  return (
    <div>
     <h1>server component </h1>
     {loading?"<h1>loading...</h1>":<main className="p-5">
      <table className="border border-dotted p-5">
        <thead className="border p-1 ">
          <tr className="border p-1 ">
            <th className="border p-1 ">Todo Id</th>
            <th className="border p-1 ">Title {loading}</th>
            <th className="border p-1 ">User</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id} className="border p-1 ">
              <td className="border p-1 ">{todo.id}</td>
              <td className="border p-1 ">{todo.title}</td>
              <td className="border p-1 ">{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </main>}
    </div>
  )
}
