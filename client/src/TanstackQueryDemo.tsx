import { useQuery } from "@tanstack/react-query";

async function testApiCall() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

function CallAPI() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: testApiCall,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="text-left p-12 m-12 bg-card">
      <h1 className="text-center text-4xl font-bold">API Data</h1>
      {data.map((item: any) => (
        <ul className="p-2">
          <li className="p-8 m-4 bg-primary-foreground text-primary">
            <h2 className="text-xl font-bold" key={item.id}>
              {item.title}
            </h2>
            <p>{item.body}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default CallAPI;
