// src/api/searchAddress.ts
import axios from "axios";

/**
 * 郵便番号から住所を検索します
 * @param zipcode 郵便番号（例: "1050011"）
 * @returns 住所文字列（例: "東京都港区芝公園"）または null
 */
export const searchAddress = async (
  zipcode: string,
): Promise<string | null> => {
  try {
    const response = await axios.get("https://zipcoda.net/api", {
      params: { zipcode },
    });
    const items = response.data?.items;
    console.log(items[0].components);
    if (items?.length) {
      return items[0].components;
    }

    return null;
  } catch (error) {
    console.error("住所検索エラー:", error);
    return null;
  }
};
