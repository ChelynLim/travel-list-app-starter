import { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: true },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleQuantityChange(event) {
    setQuantity(Number(event.target.value));
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <label>
        Quantity:
        <select value={quantity} onChange={handleQuantityChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <label>
        Description:
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li style={{ textDecoration: item.packed ? "line-through" : "none" }}>
      {item.quantity} x {item.description}
    </li>
  );
}

function Stats({ items }) {
  const packedItems = items.filter(item => item.packed).length;
  const totalItems = items.length;
  const packedPercentage = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>You have {totalItems} items in the list. You already packed {packedItems} ({packedPercentage}%).</em>
    </footer>
  );
}

function Mascot() {
  return (
    <div className="mascot">
      <img src="https://i.pinimg.com/originals/22/f5/1b/22f51bb3fd22322992533c969ddfe9c5.jpg" alt="Artem" />
      <p>You're almost done!</p>
    </div>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  const filteredItems = items.filter(item =>
    item.description.toLowerCase().includes(search.toLowerCase())
  );

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
      <PackingList items={filteredItems} />
      <Stats items={items} />
      <Mascot />
    </div>
  );
}

export default App;