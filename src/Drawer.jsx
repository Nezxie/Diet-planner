import { createPortal } from "react-dom"
import './styles/Drawer.css'
import { useState, useEffect } from "react"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Drawer({onClose, children, title, onSave, saveText=""}){
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        setVisible(true);
        requestAnimationFrame(() => {
            setOpen(true);
        })
    },[])

    function handleClose(){
        setOpen(false);
    }
    
    if (!visible) return null;
    return createPortal(
        <div className={`modal-backdrop ${open?"modal-opened":"modal-closed"}`} 
        onClick={handleClose} 
        onAnimationEnd={(e)=>{
            if(!open && e.target === e.currentTarget){
                 onClose();
                 }}}>
            <div role="dialog" aria-modal="true" className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="drawer-title-row">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={handleClose}><CloseOutlinedIcon/></button>
                </div>
                <div className="drawer-children">
                    {children}
               </div>
                {saveText&&<div className="button-row"><button onClick={()=>{onSave();handleClose()}} className="save-button">{saveText}</button></div>}
            </div>
        </div>,
        document.body
      )
}