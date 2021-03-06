import React, { Component } from 'react'
import {Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners} from '../../components'
import { Col, Row, Typography, Spin } from 'antd'
import sideImage1 from '../../assets/images/sider_2019_02-04-2.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_12-09.png'
import styles from './HomePage.module.css'
import { WithTranslation, withTranslation } from 'react-i18next'
import {connect} from 'react-redux'
import axios from "axios";
import { RootState } from '../../redux/store'
import {requestDataAction} from '../../redux/recommendProducts/recommendProductsActions'

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends Component<PropsType> {
  
  componentDidMount() {
    this.props.requestData()
  }

  render() {
    const {t, productList, loading, error} = this.props
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
      <div>
            <Header/>
            <div className={styles['page-content']}>
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
            </div>
            <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestData: () => {
      dispatch(requestDataAction());
    }
  };
};

const HomePage = connect( mapStateToProps,mapDispatchToProps)(withTranslation()(HomePageComponent))
