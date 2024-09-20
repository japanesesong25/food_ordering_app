import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../../stores/menu/productsSlice";
import ProductDetailCard from "../../components/ProductDetailCard";
import { Tabs } from "../../components/Tabs";
import { addToCart } from "../../stores/cart/cartSlice";

const Menu = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])


    const getUniqueCategories = (products) =>{
        const uniqueList = new Set()
        products.products.map((product) => uniqueList.add(product.name.name))
        return Array.from(uniqueList)
    }

    const onAddProduct = (product) => {
        console.log(product)
        dispatch(addToCart(product))
        
        const loc = localStorage.getItem("id")
      
        // const addToCart = {
        //     user: loc,
        //     items: [{
        //         product: product._id,
        //         amount: 1}]            
        // }
        // connectCart(addToCart)
        // console.log(addToCart)
    }
    // const connectCart = async(value) =>{
        // const response = await fetch(`http://localhost:8080/api/new-cart`,{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify({...value})
            
        // })
        // const onAddProduct = (product) => {
            
        // }
    // }
    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        let categories = products.products.map((product) => product.name.name);
        let index = categories.findIndex(category => newActiveTab === category);
        console.log(index);
        if (index > -1) {
            setActiveTabIndex(index);
        } else {
            setActiveTabIndex(0);
        }
    }

    return (
        <div className="bg-white">
           {
            products.status !== 'fulfilled' ?
            <div>loading...</div> :
            <div className="menu-wrapper">
                {
                    products.products &&
                    <Tabs
                        list={getUniqueCategories(products)}
                        activeTab={activeTab}
                        onTabSwitch={onTabSwitch}
                        />
                }
                <div className="flex flex-row mx-3">
                {
                    products.products && products.products[activeTabIndex].products.map((product, index) => {
                        return (
                           <ProductDetailCard key={index} product={product} onAddProduct={()=>onAddProduct(product)}/>
                          
                        )
                       
                    })
                }
                </div>
            </div>
           }
        </div>
    )
}

export default Menu;