import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useSwal from '../../../../hooks/useSwal';

const MyOrders = () => {
    const { swalConfirmation, swalSuccess, startLoading, stopLoading } = useSwal();
    const [dataLoading, setDataLoading] = useState(true)
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [deleteCount, setDeleteCount] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:5000/orders/?email=${user.email}`)
            .then(response => {
                setOrders(response.data)
                setDataLoading(false)
            })
    }, [user, deleteCount])
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
    return (
        <div className="container mt-3 mb-3 shadow-lg p-2 bg-body rounded">
            {
                dataLoading ? startLoading('Orders Loading') : stopLoading()
            }
            <h2 className="text-center text-danger"><span className="border-bottom border-2 border-danger">
                List Of Your Orders</span>
            </h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
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
                            <td>{order.productInfo}</td>
                            <td>{order.productPrice} €</td>
                            <td className={order.status === 'Accepted' ? 'text-success' : 'text-danger'}>
                                {order.status}
                            </td>
                            <td>
                                <button onClick={() => { onCancelOrder(order._id) }} className='btn btn-sm btn-outline-danger'>
                                    Delete
                                </button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </div >
    );
};

export default MyOrders;