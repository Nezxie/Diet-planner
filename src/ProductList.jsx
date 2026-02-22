import './styles/ProductList.css'
import MacroLabel from './MacroLabel.jsx'

export default function ProductList({foodList,onSelectProduct}){
    let list = <p>No products found.</p>
    if(foodList.length>0){
        list = foodList.map((item)=>{
                return (
                    <li key={item.id}>
                        <button onClick={()=>{onSelectProduct(item.id)}}>+</button>
                        <p>{item.name}</p>
                        <MacroLabel item={item} />
                    </li>
                )
            })
    }
    return (
        <ul>
            {list}
        </ul>
    );
}