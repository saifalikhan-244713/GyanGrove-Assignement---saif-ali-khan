import { useState } from "react";
import styles from "./styles/styles.module.css";

const App = () => {
  const [editCounter, setEditCounter] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [itemsList, setItemsList] = useState([]);
  const [warningCounter, setWarningCounter] = useState({
    itemName: "",
    value: 0,
  });
  const [newItem, setNewItem] = useState({
    itemName: "",
    qty: "",
    category: "",
  });
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filterCounter, setFilterCounter] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editCounter) {
      if (newItem.qty < 10) {
        setWarningCounter({
          itemName: newItem.itemName,
          value: 1,
        });
      } else {
        setWarningCounter({
          itemName: "",
          value: 0,
        });
      }
      itemsList[editItemIndex] = newItem;
      setEditCounter(false);
      setEditItemIndex(null);
    } else {
      if (newItem.qty < 10) {
        setWarningCounter({
          itemName: newItem.itemName,
          value: 1,
        });
      } else {
        setWarningCounter({
          itemName: "",
          value: 0,
        });
      }
      setItemsList([...itemsList, newItem]);
    }

    setNewItem({ itemName: "", qty: "", category: "" });
  };

  const handleInputChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const editItem = (key) => {
    setEditCounter(true);
    setEditItemIndex(key);
    setNewItem(itemsList[key]);
  };

  const deleteItem = (key) => {
    const updatedItems = itemsList.filter((item, idx) => idx !== key);
    setItemsList(updatedItems);
  };

  const handleCategoryFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    setFilterCounter(selectedCategory ? 1 : 0);
  };

  const filteredItemsByCategory = categoryFilter
    ? itemsList.filter((item) =>
        item.category.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    : itemsList;

  const sortItemsByQuantity = () => {
    const sortedItems = [...itemsList];

    sortedItems.sort((item1, item2) => {
      return item1.qty - item2.qty;
    });

    setItemsList(sortedItems);
  };

  return (
    <div>
      <div className={styles.parent}>
        <div className={styles.parent}>
          {warningCounter.value === 1 && (
            <div
              className="fw-bold text-center w-90 bg-danger text-light"
              style={{
                height: "50px",
                paddingTop: "12px",
              }}
            >
              {warningCounter.itemName} is short in quantity !!!!
            </div>
          )}

          <div className="container-fluid">
            <div className={`${styles.header} text-center mt-5`}>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-wrap justify-content-center flex-column flex-md-row w-md-50 gap-1 gap-md-0"
              >
                <input
                  className="form-control w-auto"
                  type="text"
                  placeholder="Add Item"
                  name="itemName"
                  value={newItem.itemName}
                  onChange={handleInputChange}
                />
                <input
                  className="form-control w-auto"
                  name="qty"
                  type="text"
                  placeholder="Quantity"
                  value={newItem.qty}
                  onChange={handleInputChange}
                />
                <input
                  className="form-control w-auto"
                  type="text"
                  placeholder="Select Category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  list="item-categories"
                />
                <datalist id="item-categories">
                  <option value="Electronics" />
                  <option value="Furniture" />
                  <option value="Clothing" />
                  <option value="Books" />
                  <option value="Toys" />
                  <option value="Groceries" />
                  <option value="Automobiles" />
                  <option value="Sports" />
                  <option value="Beauty" />
                  <option value="Stationery" />
                </datalist>

                <button type="submit" className="btn btn-primary">
                  {editCounter ? "Edit Item" : "Add Item"}
                </button>
              </form>
            </div>

            <div className="d-flex mt-5 justify-content-center flex-wrap gap-x-2">
              <div className="mt-2 text-center" style={{width:"250px"}} id={styles.categoryFilter}>
                <input style={{width:"250px"}}
                  type="text"
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                  placeholder="Filter By Category"
                  className="form-control text-center"
                />
              </div>

              <div className="mt-2 text-center" >
                <button style={{width:"250px"}}
                  onClick={sortItemsByQuantity}
                  className="btn btn-outline-primary"
                >
                  Sort by Quantity
                </button>
              </div>
            </div>

            <div className="mt-2 text-center" id={styles.tableParent}>
              <table className="table table-striped">
                <thead>
                  <tr className="bg-dark" style={{ backgroundColor: "black" }}>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Edit Item</th>
                    <th>Delete Item</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCounter === 1 &&
                  filteredItemsByCategory.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No items found in this category
                      </td>
                    </tr>
                  ) : (
                    (filterCounter === 0
                      ? filteredItemsByCategory
                      : filteredItemsByCategory
                    ).map((item, key) => (
                      <tr key={key}>
                        <td>{item.itemName}</td>
                        <td
                          style={{
                            color: item.qty < 10 ? "red" : "green",
                          }}
                        >
                          {item.qty}
                        </td>{" "}
                        <td>{item.category}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => editItem(key)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteItem(key)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
