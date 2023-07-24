import { useState } from "react";

const initialItems = [
  { id: 1, description: "Complete online JavaScript course", checked: false },
  { id: 2, description: "Read for 1 hour", checked: true },
  { id: 3, description: "Pick up groceries", checked: false },
  { id: 4, description: "Go for a run", checked: true },
  { id: 6, description: "Make a Instagram story", checked: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [sortBy, setSortBy] = useState("All");
  const [numItems, setNumItems] = useState(items.length);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleSelection(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleClearCompleted() {
    setItems((items) => items.filter((item) => !item.checked));
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="container">
        <header className="header">
          <h1>TODO</h1>
          <button className="btn">
            <img src="images/icon-sun.svg" alt="sun icon" />
          </button>
        </header>
        <main>
          <InputBox onAddItems={handleAddItems} />
          <ToDoList
            items={items}
            onSelection={handleSelection}
            onDeleteItem={handleDeleteItem}
            sortBy={sortBy}
            setNumItems={setNumItems}
          />
          <Stats
            numItems={numItems}
            sortBy={sortBy}
            onSort={setSortBy}
            onClearCompleted={handleClearCompleted}
          />
        </main>
      </div>
    </>
  );
}

function InputBox({ onAddItems }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description,
      checked: false,
    };

    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="input-box">
      <label for="input" className="btn-circle"></label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="input"
        type="text"
        placeholder="Create a new todo"
      />
    </form>
  );
}

function ToDoList({ items, onDeleteItem, onSelection, sortBy, setNumItems }) {
  let sortedItems;

  if (sortBy === "All") {
    sortedItems = items;
    setNumItems(items.length);
  }

  if (sortBy === "Active") {
    sortedItems = items.filter((item) => !item.checked);
    setNumItems(sortedItems.length);
  }

  if (sortBy === "Completed") {
    sortedItems = items.filter((item) => item.checked);
    setNumItems(sortedItems.length);
  }

  return (
    <ul className="todo-list">
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          onSelection={onSelection}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onSelection }) {
  const [value, setValue] = useState(item.checked);

  return (
    <li className="list-item  ">
      <input
        checked={item.checked}
        type="checkbox"
        className="checkbox"
        id={`checkbox--${item.id}`}
        onChange={(e) => {
          setValue(!value);
          e.target.checked = !value;
          console.log("item", item);
          onSelection(item.id);
        }}
      />
      <label for={`checkbox--${item.id}`} className="btn-circle"></label>
      <p className="text">{item.description}</p>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
        className="btn-delete"
      >
        <img src="images/icon-cross.svg" alt="icon cross" />
      </button>
    </li>
  );
}

function Stats({ numItems, onSort, sortBy, onClearCompleted }) {
  return (
    <div className="stats">
      <p>{numItems} items left</p>
      <ul className="sort-list">
        <li>
          <Button onSort={onSort} sortBy={sortBy}>
            All
          </Button>
        </li>
        <li>
          <Button onSort={onSort} sortBy={sortBy}>
            Active
          </Button>
        </li>
        <li>
          <Button onSort={onSort} sortBy={sortBy}>
            Completed
          </Button>
        </li>
      </ul>
      <button className="btn btn-clear" onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

function Button({ children, onSort, sortBy }) {
  return (
    <button
      className={`btn ${sortBy === children ? "active" : ""}`}
      onClick={(e) => onSort(e.target.textContent)}
    >
      {children}
    </button>
  );
}
