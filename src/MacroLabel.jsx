import './styles/MacroLabel.css'

export default function MacroLabel({item}){
    return(
        <div className='labels'>
                            <p className="label energy-label">E: {item?.nutriens?.energy}kcal</p>
                            <p className="label protein-label">P: {item?.nutriens?.protein}g</p>
                            <p className="label carbs-label">C: {item?.nutriens?.carbs}g</p>
                            <p className="label fats-label">F: {item?.nutriens?.fat}g</p>
                            </div>
    )
}