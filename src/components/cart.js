import {useState, useEffect} from 'react';
import CartProductList from './cartProductList';
import DropdownList from './DropdownList';

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [cartTotal, setCartTotal] = useState();

    const cartProductData = () => {
        fetch('https://dnc0cmt2n557n.cloudfront.net/products.json')
        .then(res => res.json())
        .then((res) => {
            const values = res.products.map(values => ({...values, quantity: 1}))
            setCartData(values);
        })
    };

    useEffect(() => {
        const localData =  JSON.parse(localStorage.getItem("cartData"));
        if(localData?.length !== 0 && localData !== null){
            setCartData(localData);
        }else{
            cartProductData();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(cartData));
        const localData =  JSON.parse(localStorage.getItem("cartData"));
        const cartTotal = localData?.reduce((acc, item) => acc + +item.price * item.quantity , 0);
        setCartTotal(cartTotal);
    },[cartData, cartTotal])
    
    // INCREASE QUANTITY
    const increaseQuantity = (i) => {
        setCartData(prev => {
            return prev.map((val,index) => {
                if(i === index){
                    return {
                        ...val, 
                        quantity: val.quantity + 1
                    };
                };
                return val;
            });
        });
    };

    // DECREASE QUANTITY
    const decreaseQuantity = i => {
        setCartData((prev) => {
            return prev.map((val,index) => {
                if(i === index){
                    if(val.quantity >= 2){
                        console.log('true')
                        return{
                        ...val, quantity: val.quantity - 1
                        }
                    }else{
                        return val;
                    }
                };
                    return val;
            });
        });
    };
    
    // REMOVE PRODUCT FROM CART
    const removeProduct = (val) => {
        const items = cartData.filter(item => item.id !== val.id)
        localStorage.setItem('cartData', JSON.stringify(items))
        setCartData(JSON.parse(localStorage.getItem('cartData')));
    }

    // TOTAL PRODUCT COUNT FOR CART ITEMS
    const cartCountTotal = cartData.length;

    return (
        <>
            <div className='header'>
                <div className='d-flex justify-content-end w-100 bg-grey align-items-center' onClick={() => setDropdown(!dropdown)}>
                    <p>${cartTotal} <span>{cartCountTotal} items</span></p>
                    <i className="fas fa-cart-arrow-down"></i>
                </div>   
            
                <div className={`dropdown ${dropdown ? 'd-block' : 'd-none'}`}>
                    <DropdownList removeProduct={removeProduct} cartData={cartData} />
                </div>
            </div>

            <CartProductList cartData={cartData} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity}/>
            
        </>
    );
}

export default Cart;