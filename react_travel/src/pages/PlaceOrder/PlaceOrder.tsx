import React from 'react';
import { MainLayout } from '../../layouts/mainLayout';
import { PaymentForm, CheckOutCard } from '../../components'; 
import { Row, Col } from 'antd';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../redux/order/slice';

export const PlaceOrder: React.FC = (props) => {
    const loading = useSelector(s => s.order.loading)
  const jwt = useSelector(s => s.user.token) as string
  const order = useSelector(s => s.order.currentOrder)
  const dispatch = useDispatch()

    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm/>
                </Col>
                <Col span={12}>
                    <CheckOutCard
                        loading={loading}
                        order={order}
                        onCheckout={() => {
                            dispatch(placeOrder({jwt, orderId: order.id}))
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
};
