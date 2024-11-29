import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import Item from "./Item";


const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: true },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Mascot({ packedPercentage }) {
  let animation;
  let message;

  if (packedPercentage === 100) {
    animation = 'bounce 2s infinite';
    message = "All packed! Ready to go! 🎉";
  } else if (packedPercentage >= 75) {
    animation = 'spin 2s infinite';
    message = "Almost there! Keep going! 💪";
  } else if (packedPercentage >= 50) {
    animation = 'pulse 1s infinite';
    message = "Halfway there! Keep it up! 👍";
  } else if (packedPercentage > 0) {
    animation = 'shake 2s infinite';
    message = "Just getting started! 🚀";
  } else {
    animation = 'wobble 2s infinite';
    message = "Let's start packing! 🧳";
  }

  return (
    <div className="mascot" style={{ animation }}>
      <img src="https://tot.wiki/thumb.php?f=Summer_Fun_2024_D2.jpg&width=900" alt="Artem" />
      <p>{message}</p>
    </div>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("input");

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    setItems([]);
  }

  function handleSortChange(event) {
    setSortOrder(event.target.value);
  }

  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "description") {
      return a.description.localeCompare(b.description);
    } else if (sortOrder === "packed") {
      return a.packed - b.packed;
    } else {
      return a.id - b.id;
    }
  });

  const filteredItems = sortedItems.filter(item =>
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const packedItems = items.filter(item => item.packed).length;
  const totalItems = items.length;
  const packedPercentage = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <div className="app">
      <Logo />
      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <Form handleAddItems={handleAddItems} />
      <div style={{ marginBottom: '20px' }}>
        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="input">Input Order</option>
            <option value="description">Description</option>
            <option value="packed">Packed Status</option>
          </select>
        </label>
        <button onClick={handleClearItems} style={{ marginLeft: '10px' }}>Clear All</button>
      </div>
      <PackingList items={filteredItems} handleDelete={handleDeleteItem} handleUpdate={handleUpdateItem} />
      <Stats items={items} packedPercentage={packedPercentage} />
      <Mascot packedPercentage={packedPercentage} />
    </div>
  );
}

export default App;