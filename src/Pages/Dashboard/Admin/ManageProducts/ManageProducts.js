import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useSwal from '../../../../hooks/useSwal';

const ManageProducts = () => {
    const { swalConfirmation, swalSuccess, startLoading, stopLoading } = useSwal();
    const [products, setProducts] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0);
    useEffect(() => {
        axios.get('https://shrouded-stream-54821.herokuapp.com/products')
            .then(response => {
                setProducts(response.data)
                setDataLoading(false)
            })
    }, [deleteCount])

    const onDeleteProduct = (_id) => {
        swalConfirmation("delete", "You won't be able to revert this!")
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`https://shrouded-stream-54821.herokuapp.com/products/${_id}`)
                        .then(response => {
                            setDeleteCount(deleteCount + 1)
                            swalSuccess('Product Deleted')
                        })
                }
            })
    }
    return (
        <div className="container mt-3 mb-3 shadow-lg p-2 bg-body rounded">
            {
                dataLoading ? startLoading('Products Loading') : stopLoading()
            }
            <h2 className="text-danger text-center"><span className="border-bottom border-2 border-danger">
                All Products</span>
            </h2>
            <div className="overflow-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Company</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map(product => <tr
                                key={product._id}
                            >
                                <td>
                                    <img height='100' width='auto' src={product.img} alt="" />
                                </td>
                                <td>{product.company}</td>
                                <td>{product.model}</td>
                                <td>{product.price} €</td>
                                <td>
                                    <button onClick={() => { onDeleteProduct(product._id) }} className='btn btn-sm btn-outline-danger m-2'>
                                        Delete
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

export default ManageProducts;