export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your package list 🌴</em>
      </p>
    );
  const noOfItems = items.length;
  const noOfItemsPacked = items.filter(item => item.packed).length;
  const percentage = items.length
    ? Math.round((noOfItemsPacked / noOfItems) * 100)
    : 0;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You are ready to go ✈'
          : `💼 You have ${noOfItems} items on your list, and you already packed
          ${noOfItemsPacked} ( ${percentage}%)`}
      </em>
    </footer>
  );
}
