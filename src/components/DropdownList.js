import React from 'react';

const DropdownList = ({cartData, removeProduct}) => {
    
    const dropDownListProducts = () => {
        return cartData?.map((val, i) => {
            return(
            <li key={i}>
                <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    <i className="fas fa-times mr-4" onClick={() => removeProduct(val)}></i>
                    <div>
                    <h4>{val.title}</h4>
                    <h4>{val.currency}{val.price}</h4>
                    </div>
                </div>
                <div>
                    <p>Qty {val.quantity}</p>
                </div>
                </div>
            </li>
            );
        })
    }
    return (
        <ul className="flexParent">
            {dropDownListProducts()}
        </ul>
    )
};

export default DropdownList;
