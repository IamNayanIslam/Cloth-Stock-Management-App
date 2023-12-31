import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { CgRemove } from "react-icons/cg";
import TableOfContents from "./TableOfContents";
import "./InputFields.css";
import getData from "../Utilities/getDataFromLocalStorage";

export default function InputField() {
  const [products, setProducts] = useState(getData("products"));

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputElements = [...event.target.elements];
    const product = {};

    /* const sizeRadioButtons = inputElements.filter(
      (element) => element.type === "radio" && element.name === "size"
    );

    const isSizeSelected = sizeRadioButtons.some((button) => button.checked);

    if (!isSizeSelected) {
      return alert("Please select a size!");
    } */

    inputElements.forEach((element) => {
      if (element.type === "radio" && !element.checked) {
        return;
      }
      if (element.type === "submit") {
        return;
      }

      product[element.name] = element.value;
      element.value = "";
      if (element.type === "radio") {
        element.checked = false;
      }
    });

    for (const item of products) {
      if (item.id === product.id) {
        return alert("ID already exist!");
      }
    }
    setProducts((prevProducts) => [...prevProducts, product]);
  };
  useEffect(() => console.log(products));
  return (
    <>
      <div className="wrap">
        <div className="inputWrap">
          <div className="head">
            <h2>Cloth Stock Management App</h2>
            <h4>Datas are saved in localStorage</h4>
          </div>
          <form action="" className="inputFields" onSubmit={handleSubmit}>
            <div className="id">
              <label htmlFor="id">Cloth Id:</label>
              <input
                type="text"
                name="id"
                className="clothId"
                autoComplete="off"
                required
              />
            </div>
            <div className="name">
              <label htmlFor="name">Cloth Name:</label>
              <input
                type="text"
                name="name"
                className="clothName"
                pattern="^[a-zA-Z]+$"
                /* onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Cloth Name can not contain numbers!"
                  );
                }}
                onInput={(e) => {
                  e.target.setCustomValidity("");
                }} */
                title="Cloth Name Can not contain numbers!"
                autoComplete="off"
                required
              />
            </div>
            <div className="price">
              <label htmlFor="price">Cloth Price:</label>
              <input
                type="number"
                name="price"
                className="clothPrice"
                autoComplete="off"
                min="250"
                max="3000"
                required
              />
            </div>
            <div className="quantity">
              <label htmlFor="quantity">Cloth Quantity:</label>
              <input
                type="number"
                name="quantity"
                className="clothQuantity"
                autoComplete="off"
                min="1"
                max="500"
                required
              />
            </div>
            <div className="description">
              <label htmlFor="description">Cloth Description:</label>{" "}
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                maxLength={30}
                autoComplete="off"
                required
              ></textarea>
            </div>
            <div className="color-size">
              <div>
                <label htmlFor="color">
                  Cloth Color:
                  <select name="color" id="color" required>
                    <option value="" selected disabled>
                      Color
                    </option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                  </select>
                </label>{" "}
              </div>
              <div className="size">
                <span className="mr-10">Cloth Size:</span>

                <input required type="radio" name="size" id="m" value="M" />
                <label htmlFor="m">M</label>

                <input required type="radio" name="size" id="l" value="L" />
                <label htmlFor="l">L</label>
                <input required type="radio" name="size" id="xl" value="XL" />
                <label htmlFor="xl">XL</label>
              </div>
            </div>
            <button type="submit">Add Cloth</button>
          </form>
        </div>
        {products.length === 0 ? (
          <div className="empty-table">
            <h2>Product List is Empty!</h2>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Cloth Id</th>
                  <th>Cloth Name</th>
                  <th>Cloth Description</th>
                  <th>Cloth Size</th>
                  <th>Cloth Color</th>
                  <th>Cloth Quantity</th>
                  <th>Cloth Price</th>
                  <th>
                    <ImCross />
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((singleProduct) => (
                  <TableOfContents
                    product={singleProduct}
                    setProducts={setProducts}
                    products={products}
                    key={singleProduct.id}
                  />
                ))}
              </tbody>
            </table>
            <button className="btn" onClick={() => setProducts([])}>
              Remove All <CgRemove />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
