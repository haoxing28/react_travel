import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import { Spin, Row, Col, DatePicker, Anchor, Menu, Divider, Typography, Button } from 'antd'
import styles from './DetailPage.module.css'
import { ProductIntro, ProductComments } from "../../components";
import { commentMockData } from "./mockup";
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {MainLayout} from '../../layouts/mainLayout'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";


export const DetailPage : React.FC = () => {
    const { touristRouteId } = useParams();
    const loading = useSelector((state)=>state.productDetail.loading)
    const product = useSelector((state)=>state.productDetail.data)
    const error = useSelector((state)=>state.productDetail.error)
    const jwt = useSelector((state)=>state.user.token) as string
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)
    const dispatch = useDispatch()
    const { RangePicker } = DatePicker;
    
    useEffect(() => {
        dispatch(getProductDetail(touristRouteId))
    }, [])   

    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        />
      );
    }

    if (error) {
      return <div>Error：{error}</div>;
    }

    return (
        <MainLayout>
            <div className={styles['product-intro-container']}>
                <Row>
                    <Col span={13}>
                        <ProductIntro
                            title={product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map((p) => p.url)}
                        />
                    </Col>
                    <Col span={11}>
                        <Button
                            style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                            type="primary"
                            danger
                            loading={shoppingCartLoading}
                            onClick={() => {
                                dispatch(
                                addShoppingCartItem({ jwt, touristRouteId: product.id })
                                );
                            }}>
                            <ShoppingCartOutlined/>
                            Add to Cart
                        </Button>
                        <RangePicker open style={{ marginTop: 20}} />
                    </Col>
                </Row>
            </div>
            <Anchor className={styles['product-detail-anchor']}>
                <Menu mode='horizontal'>
                    <Menu.Item key="1">
                        <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Anchor.Link href="#fees" title="费用"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
                    </Menu.Item>
                </Menu>
            </Anchor>
            <div id="feature" className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>Special</Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{__html:product.features}} 
                        style={{ margin:50 }}
                ></div>
            </div>
            <div id="fees" className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>Fees</Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{__html:product.fees}} 
                        style={{ margin:50 }}
                ></div>
            </div>
            <div id="notes" className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>How to Apply</Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{__html:product.notes}} 
                        style={{ margin:50 }}
                ></div>
            </div>
            <div id="comments" className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>Comments</Typography.Title>
                </Divider>
                <div style={{margin: 40}}>
                    <ProductComments data={commentMockData}/>
                </div>
            </div>
        </MainLayout>
    )
}