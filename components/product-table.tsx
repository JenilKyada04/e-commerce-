import { Product } from "../app/types/index";

type ProductTableProps = {
  products: Product[];
};

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">🛒 Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th>Brand</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 10).map((product) => (
              <tr key={product.id} className="border-b last:border-none">
                <td className="py-3">{product.title}</td>
                <td>{product.brand}</td>
                <td className="font-medium">₹ {product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
