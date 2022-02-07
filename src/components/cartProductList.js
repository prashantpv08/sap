import React from 'react'

const CartProductList = ({cartData, decreaseQuantity, increaseQuantity }) => {

    const cartProducts = () => (
        <ul className="flexParent">
            {cartData?.map((val, i) => {
                return(
                <li key={i}>
                    <div className='d-flex align-items-center justify-content-between mobile'>
                    <div className='d-flex'>
                        <span className='mr-4'><i className="fab fa-product-hunt"></i></span>
                        <div>
                        <h4>{val.title}</h4>
                        <h5>{val.desc}</h5>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='quantity'>
                        <span className='negative' onClick={() => decreaseQuantity(i)}>-</span>
                        <input type="number" value={val.quantity} readOnly/>
                        <span className='positive' onClick={() => increaseQuantity(i)}>+</span>
                        </div>
                        <p>{val.currency}{val.price}</p>
                    </div>
                    </div>
                </li>
                );
            })}
        </ul>
    );
    
    return (
        <div className='mini-cart-dropdown'>
            {cartProducts()}
        </div>
    )
}

export default CartProductList;