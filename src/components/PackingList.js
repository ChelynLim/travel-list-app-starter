import React from "react";
import Item from "./Item";

function PackingList({ items, handleDelete, handleUpdate }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        ))}
      </ul>
    </div>
  );
}

export default PackingList;