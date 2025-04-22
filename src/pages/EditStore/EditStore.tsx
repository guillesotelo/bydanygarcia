import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import DataTable from '../../components/DataTable/DataTable'
import { productHeaders } from '../../constants/tableHeaders'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../../services/product'
import { dataObj, onChangeEventType, productType } from '../../types'
import Modal from '../../components/Modal/Modal'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import toast from 'react-hot-toast'
import Switch from '../../components/Switch/Switch'
import Dropdown from '../../components/Dropdown/Dropdown'
import { useHistory } from 'react-router-dom'

type Props = {}

export default function EditStore({ }: Props) {
    const [products, setProducts] = useState<productType[]>([])
    const [selectedProduct, setSelectedProduct] = useState(-1)
    const [product, setProduct] = useState<productType>({ active: true })
    const [openModal, setOpenModal] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [loading, setLoading] = useState(false)
    const [removeProduct, setRemoveProduct] = useState(false)
    const { isLoggedIn } = useContext(AppContext)
    const history = useHistory()

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (selectedProduct !== -1) {
            setProduct(products[selectedProduct])
            setOpenModal(true)
        }
        else setProduct({ active: true })
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
            setLoading(true)
            const saved = await createProduct(product)
            if (saved) {
                toast.success('Product saved successfully!')
                setSelectedProduct(-1)
                setOpenModal(false)
                setIsNew(false)
                getProducts()
                setProduct({ active: true })
            } else toast.error('Error saving product. Please try again.')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('Error saving product. Please try again.')
            console.error(error)
        }
    }

    const updateProductData = async () => {
        try {
            if (checkData()) return toast.error('Check required fields.')
            setLoading(true)
            const saved = await updateProduct(product)
            if (saved) {
                toast.success('Product updated successfully!')
                setSelectedProduct(-1)
                setOpenModal(false)
                getProducts()
                setProduct({ active: true })
            } else toast.error('Error saving product. Please try again.')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('Error saving product. Please try again.')
            console.error(error)
        }
    }

    const checkData = () => {
        if (!product.title || (product.price && !product.currency)) return true
    }

    const cancel = () => {
        setOpenModal(false)
        setSelectedProduct(-1)
        setIsNew(false)
        setRemoveProduct(false)
    }

    const deleteSelectedProduct = async () => {
        try {
            setLoading(true)
            const deleted = await deleteProduct(product)
            if (deleted) {
                toast.success('Product deleted successfully!')
                setSelectedProduct(-1)
                setOpenModal(false)
                setRemoveProduct(false)
                getProducts()
            } else toast.error('Error deleting product. Please try again.')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('Error deleting product. Please try again.')
            console.error(error)
        }
    }

    return isLoggedIn ?
        <div className="editstore__container">
            <h1 className='editstore__title' style={{ filter: openModal ? 'blur(4px)' : '' }}>Edit Store</h1>
            {removeProduct ?
                <Modal title='Are you sure you want to remove this product?' onClose={cancel}>
                    <p>Title: {product.title}</p>
                    <p>Price: {product.price}</p>
                    <div className="editstore__modal-buttons">
                        <Button
                            label='Cancel'
                            handleClick={cancel}
                            bgColor='lightgray'
                            disabled={loading}
                            style={{ width: '100%' }}
                        />
                        <Button
                            label='Confirm deletion'
                            handleClick={deleteSelectedProduct}
                            disabled={loading}
                            style={{ width: '100%' }}
                        />
                    </div>
                </Modal>
                :
                openModal &&
                <Modal
                    title={isNew ? 'Create Product' : 'Edit Product'}
                    subtitle={isNew ? '' : product.title}
                    onClose={cancel}>
                    <div className="editstore__modal">
                        <InputField
                            label='Title'
                            name='title'
                            updateData={updateData}
                            disabled={loading}
                            value={product.title}
                        />
                        <div className="editstore__row">
                            <InputField
                                label='Price'
                                name='price'
                                updateData={updateData}
                                disabled={loading}
                                value={product.price}
                            />
                            <Dropdown
                                label='Currency'
                                options={['SEK', '€', '$', '£', 'ARS', 'COP']}
                                selected={product.currency}
                                value={product.currency}
                                setSelected={value => updateData('currency', { target: { value } })}
                                maxHeight='9rem'
                            />
                            <Dropdown
                                label='Stock'
                                options={Array.from({ length: 30 }).map((_, i) => i + 1)}
                                selected={product.stock}
                                value={product.stock}
                                setSelected={value => updateData('stock', { target: { value } })}
                                maxHeight='9rem'
                            />
                            <Switch
                                label='Active'
                                on='Yes'
                                off='No'
                                value={product.active}
                                setValue={value => updateData('active', { target: { value } })}
                            />
                        </div>
                        <div className="editstore__row">
                            <InputField
                                label='Image upload'
                                name='image'
                                type='file'
                                image={product.image}
                                setImage={image => updateData('image', { target: { value: image } })}
                                updateData={updateData}
                                disabled={loading}
                                placeholder='asd'
                            />
                            <InputField
                                label='Image URL'
                                name='image'
                                updateData={updateData}
                                disabled={loading}
                                value={product.image}
                            />
                            {product.image ? <img src={product.image} alt={product.title} className="editstore__modal-image" /> : ''}
                        </div>
                        <InputField
                            label='Description'
                            name='description'
                            type='textarea'
                            rows={6}
                            updateData={updateData}
                            disabled={loading}
                            value={product.description}
                        />
                        <div className="editstore__modal-buttons">
                            <Button
                                label='Cancel'
                                handleClick={cancel}
                                bgColor='lightgray'
                                disabled={loading}
                                style={{ width: '100%' }}
                            />
                            <Button
                                label='Save changes'
                                handleClick={isNew ? saveNewProduct : updateProductData}
                                disabled={loading}
                                style={{ width: '100%' }}
                            />
                        </div>
                        {!isNew && <Button
                            label='Delete'
                            handleClick={() => setRemoveProduct(true)}
                            bgColor='#ffb7b7'
                            disabled={loading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        />}
                    </div>
                </Modal>}
            <div className="editstore__row">
                <Button
                    label='+ &nbsp;Create new product'
                    handleClick={() => {
                        setIsNew(true)
                        setOpenModal(true)
                    }}
                    style={{ margin: '1rem 0 2rem', filter: openModal ? 'blur(4px)' : '' }}
                    disabled={loading}
                />
                <Button
                    label='View store'
                    handleClick={() => {
                       history.push('/')
                    }}
                    style={{ margin: '1rem 1rem 2rem', filter: openModal ? 'blur(4px)' : '' }}
                    disabled={loading}
                />
            </div>
            <DataTable
                title='Products'
                name='products'
                tableData={products}
                setTableData={setProducts}
                tableHeaders={productHeaders}
                selected={selectedProduct}
                setSelected={setSelectedProduct}
                style={{ width: '70vw', filter: openModal ? 'blur(4px)' : '' }} />
        </div>
        : <p style={{ position: 'absolute', top: '30%', right: '46%' }}>{isLoggedIn === null ? 'Loading Store...' : 'Permission denied.'}</p>
}