import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg';
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'

export const Header: React.FC = () => {
  return (
    <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}> 
            <Typography.Text>Make Travel Happy</Typography.Text>
            <Dropdown.Button 
            style={{marginLeft: 15}}
            overlay={
              <Menu>
                <Menu.Item>English</Menu.Item>
                <Menu.Item>中文</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined/>}
            >Language</Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button>Register</Button>
              <Button>Login</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="" className={styles['App-logo']}/>
          <Typography.Title level={3} className={styles.title}>React Travel</Typography.Title>
          <Input.Search 
            placeholder='Please enter destination, theme or keywords'
            className={styles['search-input']}/>
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']}>
          <Menu.Item key={1}>Home</Menu.Item>
          <Menu.Item key={2}>Weekend</Menu.Item>
          <Menu.Item key={3}>Team</Menu.Item>
          <Menu.Item key={4}>Independent</Menu.Item>
          <Menu.Item key={5}>Personal</Menu.Item>
          <Menu.Item key={6}>Cruise</Menu.Item>
          <Menu.Item key={7}>Hotel</Menu.Item>
        </Menu>
    </div>
    );
};
