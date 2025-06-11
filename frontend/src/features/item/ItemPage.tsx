import { useEffect, useState } from "react";
import { CustomLink } from "../../components/CustomLink";
import { axiosInstance } from "../../lib/axiosInstance";
import type { Item } from "./types/itemType";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export function ItemPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<"priceAsc" | "priceDesc">("priceAsc");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get(`/items?sort=${sort}`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, [sort]);

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

      <div className="text-right mb-3 mr-2">
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="item-sort-label">並び替え</InputLabel>

          <Select
            labelId="item-sort-label"
            id="item-sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="並び替え"
          >
            <MenuItem value="priceAsc" selected>
              価格が安い順
            </MenuItem>
            <MenuItem value="priceDesc">価格が高い順</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Pizza Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.itemId}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <CustomLink
              to="/item/$itemId"
              params={{ itemId: String(item.itemId) }}
            >
              <img
                src={item.imagePath}
                alt={item.itemName}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CustomLink>

            <div className="p-4">
              <h3 className="text-base font-semibold mb-1">
                <CustomLink
                  to="/item/$itemId"
                  params={{ itemId: String(item.itemId) }}
                  className="text-blue-600 hover:underline"
                >
                  {item.itemName}
                </CustomLink>
              </h3>
              <p className="text-sm text-gray-600">M: {item.itemPriceM}</p>
              <p className="text-sm text-gray-600">L: {item.itemPriceL}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
