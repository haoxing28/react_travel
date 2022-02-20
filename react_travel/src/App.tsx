import React from 'react';
import styles from './App.module.css'
import {Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners} from './components'
import { Col, Row, Typography } from 'antd'
import {productList1, productList2, productList3} from './mockups'
import sideImage1 from './assets/images/sider_2019_02-04-2.png'
import sideImage2 from './assets/images/sider_2019_02-04.png'
import sideImage3 from './assets/images/sider_2019_12-09.png'

function App() {
  return (
    <div className={styles.App}>
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
          title={<Typography.Title level={3} type="warning">Hot</Typography.Title>}
          sideImage={sideImage1}
          products={productList1}
        />
        <ProductCollection
          title={<Typography.Title level={3} type="danger">New</Typography.Title>}
          sideImage={sideImage2}
          products={productList2}
        />
        <ProductCollection
          title={<Typography.Title level={3} type="success">Domestic</Typography.Title>}
          sideImage={sideImage3}
          products={productList3}
        />
        <BusinessPartners/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
