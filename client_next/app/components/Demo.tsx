import { useDemo } from "../hooks/useDemo";

export default function Demo() {
  const { data, isLoading, isError } = useDemo();
  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <section className="p-4 border border-red-700">
      <h2 className="text-2xl font-semibold">Demo</h2>
      <ul>
        {data.abilities.map((item) => (
          <li key={item.ability.name}>
            <p>Ability: {item.ability.name}</p>
            <p>Is Hidden: {item.is_hidden ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
