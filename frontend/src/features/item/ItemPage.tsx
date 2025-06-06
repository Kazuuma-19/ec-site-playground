import { useState } from "react";
import { CustomLink } from "../../components/CustomLink";

const pizzaItems = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: "じゃがバターベーコン",
  priceM: "1,380円(税抜)",
  priceL: "2,380円(税抜)",
  image: `/${i + 1}.jpg`,
}));

export function ItemPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Form */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mb-8">
        <h2 className="text-lg font-semibold mb-4">商品を検索する</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="商品名"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            検索
          </button>
          <button
            type="reset"
            onClick={() => setSearchTerm("")}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            クリア
          </button>
        </form>
      </div>

      {/* Pizza Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pizzaItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <CustomLink to="/item/$itemId" params={{ itemId: String(item.id) }}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CustomLink>

            <div className="p-4">
              <h3 className="text-base font-semibold mb-1">
                <CustomLink
                  to="/item/$itemId"
                  params={{ itemId: String(item.id) }}
                  className="text-blue-600 hover:underline"
                >
                  {item.name}
                </CustomLink>
              </h3>
              <p className="text-sm text-gray-600">M: {item.priceM}</p>
              <p className="text-sm text-gray-600">L: {item.priceL}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
