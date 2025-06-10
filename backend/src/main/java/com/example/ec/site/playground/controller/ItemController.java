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
import org.springframework.web.bind.annotation.*;

/** アイテム操作を行うコントローラクラス. */
@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
  private final ItemService itemService;
  private final ToppingService toppingService;

  private static final String CART_ITEMS_SESSION = "cartItems";

  /**
   * アイテム一覧を取得する.
   *
   * @return アイテムのリスト
   */
  @GetMapping
  public ResponseEntity<?> getAllItems() {
    return ResponseEntity.ok(itemService.getAllItems());
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

    List<CartItemResponse> responses = new ArrayList<>();
    for (AddCartRequest cartItem : cartItems) {
      CartItemResponse cartItemResponse = new CartItemResponse();
      List<ToppingResponse> toppingList = new ArrayList<>();

      Integer itemId = cartItem.getItemId();
      Character itemSize = cartItem.getSize();
      Integer quantity = cartItem.getQuantity();
      Integer subtotalPrice = cartItem.getSubtotalPrice();

      // アイテムの情報をレスポンスにセットする
      Item item = itemService.getItemById(itemId);
      cartItemResponse.setItemId(itemId);
      cartItemResponse.setItemName(item.getItemName());
      cartItemResponse.setItemPath(item.getItemPath());
      cartItemResponse.setSize(itemSize);
      cartItemResponse.setItemPrice(
          itemSize.equals('M') ? item.getItemPriceM() : item.getItemPriceL());
      cartItemResponse.setQuantity(quantity);
      cartItemResponse.setSubtotalPrice(subtotalPrice);

      List<Integer> toppingIdList = cartItem.getToppingIdList();
      if (!toppingIdList.isEmpty()) {
        // トッピングの情報をレスポンスにセットする
        for (Integer cartToppingId : toppingIdList) {
          ToppingResponse toppingResponse = new ToppingResponse();
          Topping topping = toppingService.getToppingById(cartToppingId);

          toppingResponse.setToppingId(topping.getToppingId());
          toppingResponse.setToppingName(topping.getToppingName());
          toppingResponse.setToppingPrice(
              itemSize.equals('M') ? topping.getPriceM() : topping.getPriceL());

          toppingList.add(toppingResponse);
        }
      }
      cartItemResponse.setToppingList(toppingList);
      // カートアイテムのレスポンスリストに追加
      responses.add(cartItemResponse);
    }
    return ResponseEntity.ok(responses);
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
}
