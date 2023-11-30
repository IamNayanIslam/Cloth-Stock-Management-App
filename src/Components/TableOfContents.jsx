import { ImCross } from "react-icons/im";
// import { CgRemove } from "react-icons/cg";
// import "./TableOfContents.css";

export default function TableOfContents({ product, products, setProducts }) {
  return (
    <>
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.size}</td>
        <td>{product.color}</td>
        <td>{product.quantity}</td>
        <td>{product.price}</td>
        <td
          className="del"
          onClick={() => {
            setProducts(products.filter((item) => item.id !== product.id));
          }}
        >
          <ImCross />
        </td>
      </tr>
    </>
  );
}
