import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg';
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'
import { useNavigate, useParams, useLocation, useMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {addLanguage, changeLanguage} from '../../redux/language/languageActions'
import { useSelector } from '../../redux/hooks';
import jwtDecode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  //const match = useMatch();
  const languageList = useSelector((state)=>state.language.languageList)
  const language = useSelector((state)=>state.language.language)
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const jwt = useSelector((state)=>state.user.token)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if(jwt) {
      const token = jwtDecode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])

  const menuClickHandler = (e) => {
    if(e.key === 'new'){
      dispatch(addLanguage("new_lang", "newlang"))
    }else {
      dispatch(changeLanguage(e.key))
    }
  }

  const onLogOut = () => {
    dispatch(userSlice.actions.logOut());
    navigate('/')
  }

  return (
    <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}> 
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button 
            style={{marginLeft: 15}}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })}
                <Menu.Item key={'new'}>{t("header.add_new_language")}</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined/>}
            >{language === 'en' ? "English" : "中文"}
            </Dropdown.Button>
            {jwt ?
              <Button.Group className={styles['button-group']}>
                <span>{t("header.welcome")}
                <Typography.Text strong>{username}</Typography.Text>
                </span>
                <Button>{t("header.shoppingCart")}</Button>
                <Button onClick={onLogOut}>{t("header.signOut")}</Button>
              </Button.Group>
              :
              <Button.Group className={styles['button-group']}>
                <Button onClick={()=>{navigate('/Register')}}>{t("header.register")}</Button>
                <Button onClick={()=>{navigate('/SignIn')}}>{t("header.signin")}</Button>
              </Button.Group>
            }
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={()=>{navigate('/')}}>
            <img src={logo} alt="" className={styles['App-logo']}/>
            <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
          </span>
          <Input.Search 
              placeholder='Please enter destination, theme or keywords'
              className={styles['search-input']}
              onSearch={(keywords) => {navigate(`/Search/${keywords}`)}}/>
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']}>
          <Menu.Item key={1} onClick={()=>{navigate('/')}}>{t("header.home_page")}</Menu.Item>
          <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
          <Menu.Item key={3}>{t("header.group")}</Menu.Item>
          <Menu.Item key={4}>{t("header.backpack")}</Menu.Item>
          <Menu.Item key={5}>{t("header.private")}</Menu.Item>
          <Menu.Item key={6}>{t("header.cruise")}</Menu.Item>
          <Menu.Item key={7}>{t("header.hotel")}</Menu.Item>
          <Menu.Item key={8}>{t("header.local")}</Menu.Item>
          <Menu.Item key={9}>{t("header.theme")}</Menu.Item>
          <Menu.Item key={10}>{t("header.custom")}</Menu.Item>
          <Menu.Item key={11}>{t("header.study")}</Menu.Item>
          <Menu.Item key={12}>{t("header.visa")}</Menu.Item>
          <Menu.Item key={13}>{t("header.enterprise")}</Menu.Item>
          {/* <Menu.Item key={14}>{t("header.high_end")}</Menu.Item>
          <Menu.Item key={15}>{t("header.outdoor")}</Menu.Item>
          <Menu.Item key={16}>{t("header.insurance")}</Menu.Item> */}
        </Menu>
    </div>
    );
};
