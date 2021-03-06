import React, {useEffect} from "react";
import styles from './Search.module.css'
import { FilterArea, ProductList} from '../../components'
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSearch/slice'
import {MainLayout} from '../../layouts/mainLayout'

interface MatchParams {
    keywords: string | undefined
}

export const SearchPage : React.FC = () => {
    const { keywords } = useParams();
    const loading = useSelector((state) => state.productSearch.loading);
    const error = useSelector((s) => s.productSearch.error);
    const pagination = useSelector((s) => s.productSearch.pagination);
    const productList = useSelector((s) => s.productSearch.data);
    console.log('product', productList)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
    }, [location])

    const onPageChange = (nextPage, pageSize) => {
        dispatch(searchProduct({ nextPage, pageSize, keywords }));
    };

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
            <div className={styles['product-list-container']}>
                <FilterArea />
            </div>
            <div className={styles['product-list-container']}>
                <ProductList 
                data={productList}
                paging={pagination}
                onPageChange={onPageChange}/>
            </div>
        </MainLayout>)
}