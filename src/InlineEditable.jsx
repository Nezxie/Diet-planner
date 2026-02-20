import {useState} from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import './styles/InlineEditable.css'


export default function InlineEditable({value,onSave,placeholder="Untitled", className="", displayAs="p", editAs="input", type="text"}){
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(value);
    
    function handleSubmit(){
        let newValue=draftValue;
        if(type === "text"){
            if(typeof draftValue == "string"){
            newValue = draftValue.trim();
                if(newValue.length<=0){
                    newValue=placeholder;
                }
            }
        }
        else if(type === "number"){
            newValue=parseInt(newValue)||0;
        }
        console.log(newValue, typeof newValue , draftValue, typeof draftValue );
            onSave(newValue);
            setIsEditing(false);
    }
    const DisplayComponent = displayAs;
    const EditComponent = editAs;

    if(!isEditing){
        return(
            <div className={`inline-editable ${className}`} onClick={() => setIsEditing(true)}>
                <DisplayComponent>{value}</DisplayComponent>
                <button type='button' aria-label='edit'>{<EditOutlinedIcon/>}</button>
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
                                    className={`inline-editable-input ${displayAs}` }
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