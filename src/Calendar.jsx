import {useState} from 'react'
import Drawer from './Drawer'
import toast, { Toaster } from 'react-hot-toast';

const notify_save = () => toast('Recipe added to the schedule.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
});

function saveRecipe(){
    notify_save();
}

export default function Calendar(){
    const [showModal, setShowModal] = useState(false);

    return(
        <>
        <button onClick={() => setShowModal(true)}>Show drawer</button>
        {showModal && <Drawer onClose={() => setShowModal(false)} title={"Select a meal"} onSave={saveRecipe}>
            <p>Some text</p>
            <ul>
                <li>list</li>
                <li>of</li>
                <li>items</li>
            </ul>
            </Drawer>}
        <Toaster/>
        </>
    )
}