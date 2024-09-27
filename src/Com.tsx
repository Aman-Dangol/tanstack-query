import { useQuery } from "@tanstack/react-query";

interface Comment {
  postID: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function Com() {
  const { data, isLoading } = useQuery({
    queryKey: ["comments"],
    staleTime: 10000,

    queryFn: async (): Promise<Comment[]> => {
      console.log("fetching");

      let data = await fetch("https://jsonplaceholder.typicode.com/comments");
      return await data.json();
    },
  });
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <>
      {data?.map((item: Comment) => {
        return <li key={item.id}>{item.body}</li>;
      })}
    </>
  );
}
