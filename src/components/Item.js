function Item({ item, handleDelete, handleUpdate }) {
    return (
      <li style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => handleUpdate(item.id)}
        />
        {item.quantity} x {item.description}
        <button onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
      </li>
    );
  }

    export default Item;