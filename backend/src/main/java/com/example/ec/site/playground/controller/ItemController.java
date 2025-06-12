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
   * アイテムを価格でソートして取得する.
   *
   * @param sort ソートの順序（priceAsc, priceDesc）
   * @return ソートされたアイテムのリスト
   */
  @GetMapping
  public ResponseEntity<?> getSortedItems(@RequestParam(defaultValue = "priceAsc") String sort) {
    List<Item> items = itemService.findItemsSortedByPrice(sort);
    return ResponseEntity.ok(items);
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

    for (AddCartRequest item : cartItems) {
      boolean isSameItem = isSameItemWithToppings(item, request);
      if (isSameItem) {
        // 同じアイテムが存在する場合は数量、小計を更新
        item.setQuantity(item.getQuantity() + request.getQuantity());
        item.setSubtotalPrice(item.getSubtotalPrice() + request.getSubtotalPrice());
        return ResponseEntity.ok().build();
      }
    }

    // カートに同じアイテムが存在しない場合は新規追加し、セッションを更新
    cartItems.add(request);
    session.setAttribute(CART_ITEMS_SESSION, cartItems);
    return ResponseEntity.ok().build();
  }

  /**
   * カートからアイテムを削除する.
   *
   * @param itemIndex アイテムのインデックス
   * @param session HTTPセッション
   * @return カートからアイテムを削除した結果
   */
  @DeleteMapping("/cart/{itemIndex}")
  public ResponseEntity<?> removeItemFromCart(
      @PathVariable Integer itemIndex, HttpSession session) {
    List<AddCartRequest> cartItems =
        (List<AddCartRequest>) session.getAttribute(CART_ITEMS_SESSION);

    // 無効なインデックスの場合は400エラー
    if (cartItems == null || itemIndex < 0 || cartItems.size() <= itemIndex) {
      return ResponseEntity.badRequest().build();
    }

    cartItems.remove((int) itemIndex);
    session.setAttribute(CART_ITEMS_SESSION, cartItems);

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

  /**
   * アイテムとリクエストのアイテムが同じかどうかを確認する. アイテムIDとサイズが一致し、トッピングも一致する場合は同じアイテムとみなす.
   *
   * @param item カート内のアイテム
   * @param request リクエストのアイテム
   * @return 同じアイテムであればtrue、そうでなければfalse
   */
  private boolean isSameItemWithToppings(AddCartRequest item, AddCartRequest request) {
    List<Integer> toppingIdListInCart = item.getToppingIdList();
    List<Integer> toppingIdListInRequest = request.getToppingIdList();

    // アイテムIDとサイズ、トッピングの数が一致するか確認
    if (!item.getItemId().equals(request.getItemId())
        || !item.getSize().equals(request.getSize())
        || toppingIdListInCart.size() != toppingIdListInRequest.size()) {
      return false;
    }

    // トッピングが一致するか確認
    for (Integer toppingId : request.getToppingIdList()) {
      if (!item.getToppingIdList().contains(toppingId)) {
        return false;
      }
    }
    return true;
  }
}
