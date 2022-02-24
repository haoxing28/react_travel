import React from 'react'
import { Carousel, SideMenu, ProductCollection, BusinessPartners} from '../../components'
import { Col, Row, Typography, Spin } from 'antd'
import sideImage1 from '../../assets/images/sider_2019_02-04-2.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_12-09.png'
import styles from './HomePage.module.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {requestDataAction} from '../../redux/recommendProducts/recommendProductsActions'
import { useSelector } from '../../redux/hooks';
import {MainLayout} from '../../layouts/mainLayout'

export const HomePage: React.FC = () => {
  
    const loading = useSelector((state)=>state.recommendProducts.loading)
    const productList = useSelector((state)=>state.recommendProducts.productList)
    const error = useSelector((state)=>state.recommendProducts.error)
    const {t} = useTranslation()
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(requestDataAction())
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
            
              <Row style={{marginTop: 20}}>
                <Col span={6}>
                    <div><SideMenu/></div>
                </Col>
                <Col span={18}>
                    <div><Carousel/></div>
                </Col>
              </Row>
                <ProductCollection
                title={<Typography.Title level={3} type="warning">{t("home_page.hot_recommended")}</Typography.Title>}
                sideImage={sideImage1}
                products={productList[0].touristRoutes}
                />
                <ProductCollection
                title={<Typography.Title level={3} type="danger">{t("home_page.new_arrival")}</Typography.Title>}
                sideImage={sideImage2}
                products={productList[1].touristRoutes}
                />
                <ProductCollection
                title={<Typography.Title level={3} type="success">{t("home_page.domestic_travel")}</Typography.Title>}
                sideImage={sideImage3}
                products={productList[2].touristRoutes}
                />
                <BusinessPartners/>
      </MainLayout>
    )
  }
