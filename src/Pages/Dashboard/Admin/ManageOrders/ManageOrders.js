import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useSwal from '../../../../hooks/useSwal';

const ManageOrders = () => {
    const { swalConfirmation, swalSuccess, startLoading, stopLoading } = useSwal();
    const [dataLoading, setDataLoading] = useState(true)
    const [orders, setOrders] = useState([]);
    const [deleteCount, setDeleteCount] = useState(0);
    const [modifiedCount, setModifiedCount] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/orders`)
            .then(response => {
                setOrders(response.data)
                setDataLoading(false)
            })
    }, [modifiedCount, deleteCount])

    const onCancelOrder = _id => {
        swalConfirmation("delete", "You won't be able to revert this!")
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:5000/orders/${_id}`)
                        .then(response => {
                            setDeleteCount(deleteCount + 1)
                            swalSuccess('Order Deleted')
                        })
                }
            })
    }

    const onAcceptOrder = _id => {
        swalConfirmation('accept')
            .then(result => {
                if (result.isConfirmed) {
                    const data = {
                        status: 'Shipped'
                    }
                    axios.put(`http://localhost:5000/orders/${_id}`, data)
                        .then(response => {
                            setModifiedCount(modifiedCount + 1)
                            swalSuccess('Order Shipped')
                        })
                }
            })
    }
    return (
        <div className="container mt-3 mb-3 shadow-lg p-2 bg-body rounded">
            {
                dataLoading ? startLoading('Orders Loading') : stopLoading()
            }
            <h2 className="text-danger text-center"><span className="border-bottom border-2 border-danger">
                List Of All Available Orders</span>
            </h2>
            <div className="overflow-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Product Info</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(order => <tr
                                key={order._id}
                            >
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.productInfo}</td>
                                <td>{order.productPrice} €</td>
                                <td className={order.status === 'Shipped' ? 'text-success' : 'text-danger'}>
                                    {order.status}
                                </td>
                                <td>
                                    <button onClick={() => { onCancelOrder(order._id) }} className='btn btn-sm btn-outline-danger m-2'>
                                        Delete
                                    </button>
                                    <button disabled={order.status === 'Shipped' ? true : false}
                                        onClick={() => { onAcceptOrder(order._id) }} className='btn btn-sm btn-outline-success m-2'>
                                        Shipped
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>

        </div>
    );
};

export default ManageOrders;