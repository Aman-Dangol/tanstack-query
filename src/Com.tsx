import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function Com() {
  const [searchId, setSearchId] = useState("");

  const queryClient = useQueryClient();

  // fetching data
  const fetchData = async (id: string = ""): Promise<Comment[]> => {
    console.log("fetching");

    // get all data from the api
    let response = await fetch("https://jsonplaceholder.typicode.com/comments");
    let data: Comment[] = await response.json();

    // if id has a true value then filter according tothe id and return the filtered array
    if (id) {
      console.log("getching data with post id of ", id);
      return data.filter((item) => item.postId == parseInt(id));
    }
    console.log("all data");

    // if id has a falsy value retturn the whole array
    return data;
  };

  // defining a query for when to fetch th e data and on what keys
  // return an array of comments
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"], // query keys are used to uniquely identify and cache the query's data
    staleTime: 10000,

    queryFn: () => fetchData(searchId),
  });

  //
  const mutation = useMutation({
    mutationFn: () => queryClient.invalidateQueries({ queryKey: ["comments"] }), //invalidate the query to refetch that data from api
  });

  
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearchId(e.target.value)}
        value={searchId}
      />
      <button onClick={() => mutation.mutate()}>press</button>
      {comments?.map((item: Comment) => {
        return (
          <tr>
            <td>{item.postId}</td>
            <td>{item.email}</td>
          </tr>
        );
      })}
    </>
  );
}
