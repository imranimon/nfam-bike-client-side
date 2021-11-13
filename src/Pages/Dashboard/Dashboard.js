import React, { useState } from 'react';
import 'react-bootstrap-drawer/lib/style.css';
import './Dashboard.css'
import { Col, Collapse, Container, Nav, Row } from 'react-bootstrap';
import {Switch } from 'react-router-dom';
import { Drawer, DrawerNavigation, DrawerNavigationHeader } from 'react-bootstrap-drawer';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import MyOrders from './GeneralUser/MyOrders/MyOrders';
import Payment from './GeneralUser/Payment/Payment';
import PrivateRoute from '../Shared/PrivateRoute/PrivateRoute';
import AdminRoute from '../Shared/AdminRoute/AdminRoute';
import AddReview from './GeneralUser/AddReview/AddReview';
import ManageOrders from './Admin/ManageOrders/ManageOrders';
import MakeAdmin from './Admin/MakeAdmin/MakeAdmin';
import AddProduct from './Admin/AddProduct/AddProduct';
import ManageProducts from './Admin/ManageProducts/ManageProducts';
import Footer from '../Shared/Footer/Footer'
const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const handleToggle = () => setOpen(!open);
    const {admin, logOut, setIsLoading } = useAuth()
    const history = useHistory()
    let { path, url } = useRouteMatch();

    const handleLogout = () => {
        logOut()
            .then(() => {
                history.push('/')
            })
            .finally(() => setIsLoading(false))
    }
    return (<>
        <Container fluid style={{ backgroundColor: '#F7F7F7' }}>
            <Row className="flex-xl-nowrap">
                <Col xs={12} md={3} lg={2} >
                    <Drawer>
                        <Drawer.Toggle onClick={handleToggle} />
                        <Collapse in={open}>
                            <Drawer.Overflow>
                                <Drawer.ToC>
                                    <DrawerNavigationHeader className='fs-3'>Dashboard</DrawerNavigationHeader>
                                    <DrawerNavigation className='fs-6'>
                                        {!admin &&
                                            <div>
                                                <Nav.Item>
                                                    <Nav.Link as={Link} to={`${url}`}>My Orders</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link as={Link} to={`${url}/pay`}>Payment</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link as={Link} to={`${url}/add-review`}>Review</Nav.Link>
                                                </Nav.Item>
                                            </div>

                                        }
                                        {
                                            admin &&
                                            <div>
                                                <Nav.Item>
                                                    <Nav.Link as={Link} to={`${url}`}>Manage All Orders</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link as={Link} to={`${url}/add-product`}>Add A Product</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link as={Link} to={`${url}/make-admin`}>Make Admin</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link as={Link} to={`${url}/manage-products`}>Manage Products</Nav.Link>
                                                </Nav.Item>
                                            </div>
                                        }
                                        <Nav.Item>
                                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item >
                                            <Nav.Link onClick={handleLogout}>Sign-Out</Nav.Link>
                                        </Nav.Item>
                                    </DrawerNavigation>
                                </Drawer.ToC>
                            </Drawer.Overflow>
                        </Collapse>
                    </Drawer>
                </Col>
                <Col xs={12} md={9} lg={10}>
                    <div className="bg-dashboard"></div>
                    <Switch>
                        {
                            !admin &&
                            <PrivateRoute exact path={path}>
                                <MyOrders></MyOrders>
                            </PrivateRoute>
                        }
                        {
                            admin &&
                            <AdminRoute exact path={path}>
                                <ManageOrders></ManageOrders>
                            </AdminRoute>
                        }
                        <PrivateRoute path={`${path}/pay`}>
                            <Payment></Payment>
                        </PrivateRoute>
                        <PrivateRoute path={`${path}/add-review`}>
                            <AddReview></AddReview>
                        </PrivateRoute>
                        <AdminRoute path={`${path}/make-admin`}>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                        <AdminRoute path={`${path}/add-product`}>
                            <AddProduct></AddProduct>
                        </AdminRoute>
                        <AdminRoute path={`${path}/manage-products`}>
                            <ManageProducts></ManageProducts>
                        </AdminRoute>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer></Footer>
    </>
    );
};

export default Dashboard;