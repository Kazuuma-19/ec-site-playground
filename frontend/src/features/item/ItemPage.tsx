import { useCallback, useEffect, useState } from "react";
import { CustomLink } from "../../components/CustomLink";
import { axiosInstance } from "../../lib/axiosInstance";
import type { Item } from "./types/itemType";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";

export function ItemPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<"priceAsc" | "priceDesc">("priceAsc");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  /**
   * アイテムを取得する
   * searchKeyword, sort, pageが変更されたらアイテムを取得する
   */
  const fetchItems = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/items?sort=${sort}&page=${page}&size=9&keyword=${searchKeyword}`,
      );
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [searchKeyword, sort, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  /**
   * 検索フォームの検索ボタンクリックイベント
   *
   * @param e イベント
   */
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(0); // 検索時にページをリセット(ページを遷移した先で検索をするとバグるため)
  };

  /**
   * 検索フォームのキーワード変更イベント
   *
   * @param e イベント
   */
  const handleSearchKeywordChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchKeyword(e.target.value);
    setPage(0);
  };

  /**
   * ページネーションのページ変更
   *
   * @param _ 使用しない
   * @param value ページ番号(1~)
   */
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1); // ページ番号は0から始まるため1を引く
  };

  /**
   * 検索フォームのクリアボタンクリックイベント
   */
  const handleClear = () => {
    setSearchKeyword("");
    setPage(0);
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
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            検索
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            クリア
          </button>
        </form>
      </div>

      <div className="flex justify-between items-end mb-3">
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

        <div className="text-sm text-gray-600">
          {`全${totalPages}ページ中 ${page + 1}ページ目`}
        </div>
      </div>

      {/* アイテムが0件の場合 */}
      {items.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p className="text-lg mb-2">検索結果が見つかりませんでした</p>
          <p className="text-sm">検索条件を変更して、もう一度お試しください</p>
        </div>
      )}

      {/* アイテムが1件以上の場合 */}
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
              <p className="text-sm text-gray-600">{`M: ${item.itemPriceM}円`}</p>
              <p className="text-sm text-gray-600">{`L: ${item.itemPriceL}円`}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages >= 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            color="primary"
            size="large"
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
