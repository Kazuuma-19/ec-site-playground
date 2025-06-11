package com.example.ec.site.playground.controller;

import com.example.ec.site.playground.dto.request.AddCartRequest;
import com.example.ec.site.playground.dto.response.CartItemResponse;
import com.example.ec.site.playground.dto.response.ToppingResponse;
import com.example.ec.site.playground.model.Item;
import com.example.ec.site.playground.model.Topping;
import com.example.ec.site.playground.service.ItemService;
import com.example.ec.site.playground.service.ToppingService;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** アイテム操作を行うコントローラクラス. */
@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
  private static final String CART_ITEMS_SESSION = "cartItems";
  private final ItemService itemService;
  private final ToppingService toppingService;

  /**
   * ページネーション、ソートされたアイテムのリストを取得する.
   *
   * @param sort ソートの順序（priceAsc, priceDesc）
   * @param page ページ番号
   * @param size 1ページあたりのアイテム数
   * @return ページネーションされたアイテムのリスト
   */
  @GetMapping
  public ResponseEntity<?> getItems(
      @RequestParam(defaultValue = "priceAsc") String sort,
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "10") Integer size) {
    Sort sorting =
        switch (sort) {
          case "priceDesc" -> Sort.by(Sort.Direction.DESC, "itemPriceM");
          case "priceAsc" -> Sort.by(Sort.Direction.ASC, "itemPriceM");
          default -> Sort.by("itemId");
        };
    Pageable pageable = PageRequest.of(page, size, sorting);
    return ResponseEntity.ok(itemService.findItems(pageable));
  }

  /**
   * アイテム詳細を取得する.
   *
   * @param itemId アイテムID
   * @return アイテムの詳細情報
   */
  @GetMapping("/{itemId}")
  public ResponseEntity<?> getItemById(@PathVariable Integer itemId) {
    return ResponseEntity.ok(itemService.getItemById(itemId));
  }

  /**
   * カートに追加されたアイテムを取得する.
   *
   * @param session HTTPセッション
   * @return カートに追加されたアイテムのリスト
   */
  @GetMapping("/cart")
  public ResponseEntity<?> getCartItems(HttpSession session) {
    List<AddCartRequest> cartItems =
        (List<AddCartRequest>) session.getAttribute(CART_ITEMS_SESSION);
    // セッションにカートアイテムが存在しない場合は空のリストを返す
    if (cartItems == null || cartItems.isEmpty()) {
      return ResponseEntity.ok(new ArrayList<>());
    }

    List<CartItemResponse> responseList = new ArrayList<>();
    for (AddCartRequest cartItem : cartItems) {
      Character itemSize = cartItem.getSize();

      // アイテムの情報をレスポンスにセットする
      CartItemResponse cartItemResponse = new CartItemResponse();
      cartItemResponse.setItemId(cartItem.getItemId());
      cartItemResponse.setSize(itemSize);
      cartItemResponse.setQuantity(cartItem.getQuantity());
      cartItemResponse.setSubtotalPrice(cartItem.getSubtotalPrice());

      Item item = itemService.getItemById(cartItem.getItemId());
      cartItemResponse.setItemName(item.getItemName());
      cartItemResponse.setImagePath(item.getImagePath());
      cartItemResponse.setItemPrice(
          itemSize.equals('M') ? item.getItemPriceM() : item.getItemPriceL());

      List<Integer> toppingIdList = cartItem.getToppingIdList();
      List<ToppingResponse> toppingResponseList = getToppingResponses(toppingIdList, itemSize);
      cartItemResponse.setToppingList(toppingResponseList);
      // カートアイテムのレスポンスリストに追加
      responseList.add(cartItemResponse);
    }
    return ResponseEntity.ok(responseList);
  }

  /**
   * カートにアイテムを追加する.
   *
   * @param request カートに追加するアイテムのリクエスト
   * @param session HTTPセッション
   * @return カートにアイテムを追加した結果
   */
  @PostMapping("/cart")
  public ResponseEntity<?> addItemToCart(@RequestBody AddCartRequest request, HttpSession session) {
    List<AddCartRequest> cartItems =
        (List<AddCartRequest>) session.getAttribute(CART_ITEMS_SESSION);
    if (cartItems == null) {
      cartItems = new ArrayList<>();
    }
    // カートにアイテムを追加
    cartItems.add(request);
    session.setAttribute(CART_ITEMS_SESSION, cartItems);
    return ResponseEntity.ok().build();
  }

  /**
   * カートからアイテムを削除する.
   *
   * @param itemId アイテムID
   * @param session HTTPセッション
   * @return カートからアイテムを削除した結果
   */
  @DeleteMapping("/cart/{itemId}")
  public ResponseEntity<?> removeItemFromCart(@PathVariable Integer itemId, HttpSession session) {
    List<AddCartRequest> cartItems =
        (List<AddCartRequest>) session.getAttribute(CART_ITEMS_SESSION);
    if (cartItems != null) {
      cartItems.removeIf(item -> item.getItemId().equals(itemId));
      session.setAttribute(CART_ITEMS_SESSION, cartItems);
    }
    return ResponseEntity.noContent().build();
  }

  /**
   * トッピングIdからトッピング情報を取得し、レスポンスリストを作成する.
   *
   * @param toppingIdList トッピングIDのリスト
   * @param itemSize アイテムのサイズ（MまたはL）
   * @return トッピング情報のレスポンスリスト
   */
  private List<ToppingResponse> getToppingResponses(
      List<Integer> toppingIdList, Character itemSize) {
    List<ToppingResponse> toppingResponseList = new ArrayList<>();
    // トッピングがない場合は空のリストを返す
    if (toppingIdList == null || toppingIdList.isEmpty()) {
      return toppingResponseList;
    }
    for (Integer toppingId : toppingIdList) {
      Topping topping = toppingService.getToppingById(toppingId);

      ToppingResponse toppingResponse = new ToppingResponse();
      toppingResponse.setToppingId(topping.getToppingId());
      toppingResponse.setToppingName(topping.getToppingName());
      toppingResponse.setToppingPrice(
          itemSize.equals('M') ? topping.getPriceM() : topping.getPriceL());
      toppingResponseList.add(toppingResponse);
    }
    return toppingResponseList;
  }
}
