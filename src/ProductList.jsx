import './styles/ProductList.css'
export default function ProductList({foodList}){
    let list = <p>No products found.</p>
    if(foodList.length>0){
        list = foodList.map((item)=>{
                return (
                    <li key={item.id}>
                        <button>+</button>
                        <h2>{item.name}</h2>
                        <div className='labels'>
                        <p className="label energy-label">E: {item.nutriens.energy}kcal</p>
                        <p className="label protein-label">P: {item.nutriens.protein}g</p>
                        <p className="label carbs-label">C: {item.nutriens.carbs}g</p>
                        <p className="label fats-label">F: {item.nutriens.fat}g</p>
                        </div>
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