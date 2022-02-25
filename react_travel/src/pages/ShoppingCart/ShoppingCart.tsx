import React, { useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import { Row, Col, Affix } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks"; 
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../../layouts/mainLayout";
import { clearShoppingCartItem, checkout } from "../../redux/shoppingCart/slice";
import { PaymentCard, ProductList } from "../../components";



export const ShoppingCartPage = () => {
    const loading = useSelector(s => s.shoppingCart.loading)
  const jwt = useSelector(s => s.user.token) as string
  const items = useSelector(s => s.shoppingCart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  return (
      <MainLayout>
          <Col span={16}>
              <div className={styles['product-list-container']}>
                  <ProductList data={items.map(s => s.touristRoute)}/>
              </div>
          </Col>
          <Col span={8}>
              <Affix>
                <div className={styles['payment-card-container']}>
                    <PaymentCard
                loading={loading}
                originalPrice={items
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={items
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if(items.length <= 0){
                    return
                  }
                  dispatch(checkout(jwt))
                  navigate('/placeOrder')
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({
                      jwt,
                      itemIds: items.map((s) => s.id),
                    })
                  );
                }}
              />
                </div>
              </Affix>
              
          </Col>
      </MainLayout>
  );
};
