import {useState, useEffect} from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';


export default function InlineEditable({value,onSave,placeholder="Untitled", className="", displayAs="p", editAs="input", type="text"}){
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(value);
    
    function handleSubmit(){
        let newValue = draftValue.trim();
            if(newValue.length<=0){
                newValue=placeholder;
                if(type === "number"){
                    newValue=0;
                }
            }
            onSave(newValue);
            setIsEditing(false);
    }
    const DisplayComponent = displayAs;
    const EditComponent = editAs;

    if(!isEditing){
        return(
            <div className={`inline-editable ${className}`} onClick={() => setIsEditing(true)}>
                <DisplayComponent>{value||placeholder}</DisplayComponent>
                <button type='submit' aria-label='edit'>{<EditOutlinedIcon/>}</button>
            </div>
                                  
        )
    }
    return(
        <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        }}
                        className={`inline-editable ${className}`}>
                                <EditComponent 
                                    autoFocus
                                    type={type} 
                                    className='inline-editable-input' 
                                    onChange={(e)=>{setDraftValue(e.target.value)}} 
                                    value={draftValue}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape"){
                                            setDraftValue(value);
                                            setIsEditing(false);
                                        };
                                    }}
                                        ></EditComponent>
                                <button type='submit' aria-label='save'>{<CheckOutlinedIcon/>}</button>     
        </form>
    );
}