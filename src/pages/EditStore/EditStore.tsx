import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import DataTable from '../../components/DataTable/DataTable'
import { productHeaders } from '../../constants/tableHeaders'
import { createProduct, getAllProducts, updateProduct } from '../../services/product'
import { dataObj, onChangeEventType, productType } from '../../types'
import Modal from '../../components/Modal/Modal'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import toast from 'react-hot-toast'

type Props = {}

export default function EditStore({ }: Props) {
    const [products, setProducts] = useState<productType[]>([])
    const [selectedProduct, setSelectedProduct] = useState(-1)
    const [product, setProduct] = useState<productType>({})
    const [openModal, setOpenModal] = useState(true)
    const [isNew, setIsNew] = useState(false)
    const { isLoggedIn } = useContext(AppContext)

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (selectedProduct !== -1) setProduct(products[selectedProduct])
        else setProduct({})
    }, [selectedProduct])

    const getProducts = async () => {
        try {
            const _products = await getAllProducts()
            if (_products && Array.isArray(_products)) setProducts(_products)
        } catch (error) {
            console.error(error)
        }
    }

    const updateData = (key: string, e: any) => {
        const value = e.target.value
        setProduct({ ...product, [key]: value })
    }

    const saveNewProduct = async () => {
        try {
            if (checkData()) return toast.error('Check required fields.')
            const saved = await createProduct(product)
            if (saved) {
                toast.success('Product saved successfully!')
                setSelectedProduct(-1)
                setOpenModal(false)
                setIsNew(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateProductData = async () => {
        try {
            if (checkData()) return toast.error('Check required fields.')
            const saved = await updateProduct(product)
            if (saved) {
                toast.success('Product updated successfully!')
                setSelectedProduct(-1)
                setOpenModal(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const checkData = () => {
        if (!product.title) return true
    }

    const cancel = () => {
        setOpenModal(false)
        setSelectedProduct(-1)
        setIsNew(false)
    }

    return isLoggedIn ?
        <div className="editstore__container">
            {openModal &&
                <Modal
                    title={product.title}
                    subtitle={isNew ? 'Create Product' : 'Edit Product'}>
                    <div className="editstore__modal">
                        <InputField
                            label='Title'
                            name='title'
                            updateData={updateData}
                        />
                        <InputField
                            label='Price'
                            name='price'
                            updateData={updateData}
                        />
                        <div className="editstore__row">
                            <InputField
                                label='Image'
                                name='image'
                                type='file'
                                image={product.image}
                                setImage={image => updateData('image', { target: { value: image } })}
                                updateData={updateData}
                            />
                            <img src={product.image} alt={product.title} className="editstore__modal-image" />
                        </div>
                        <InputField
                            label='Description'
                            name='description'
                            type='textarea'
                            rows={6}
                            updateData={updateData}
                        />
                        <div className="editstore__modal-buttons">
                            <Button
                                label='Cancel'
                                handleClick={cancel}
                                bgColor='lightgray'
                            />
                            <Button
                                label='Save changes'
                                handleClick={isNew ? saveNewProduct : updateProductData}
                            />
                        </div>
                    </div>
                </Modal>}
            <DataTable
                title='Products'
                tableData={products}
                setTableData={setProducts}
                tableHeaders={productHeaders}
                selected={selectedProduct}
                setSelected={setSelectedProduct}
                style={{ width: '70vw', filter: openModal ? 'blur(4px)' : '' }} />
        </div>
        : <p>Permission denied.</p>
}