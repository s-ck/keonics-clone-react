export const initalState = {
    basket : [],
    user : null,
};

export const getSubtotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

export const addTax = (amount) => {
    let subtotal = amount;
    if(amount > 500){
        subtotal = subtotal+(amount*5)/100;
    }else if(amount > 5000){
        subtotal = subtotal+(amount*10)/100;
    }
    return subtotal;
}
    
    
export const reducer = (state, action) => {
    switch(action.type){
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket: [...state.basket, action.item] 
            }
            break;
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket, action.item],
            };
            break;
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketitem) => basketitem.id === action.id
            );
            
            console.log(index)    

            let newbasket = [...state.basket];

            if(index >= 0){
                newbasket.splice(index,1);
            }else{
                console.warn(`can not remove item ${action.id} as it is no longer in basket`)
            }
            return{
                ...state,
                basket:newbasket
            }
            break;
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }
        default:
            return{
                state
            }
    }
} 
