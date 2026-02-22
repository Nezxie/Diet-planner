import {useState, useId} from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import './styles/InlineEditable.css'

function validateInput(inputType,inputValue,placeholder){
    if(inputType === "text"){
        inputValue=inputValue+"";
        inputValue=inputValue.trim();
        if(inputValue.length<1){
            return placeholder;
        }
        return inputValue;
    }
    else if(inputType === "number"){
        return parseInt(inputValue)||0;
    }
    else{
        throw new Error(`Input type: ${inputType} has no validation handler declared. Accepted input types: "text", "number".`);
    }
}

export default function InlineEditable({value,onSave,placeholder="Untitled", className="", displayAs="p", editAs="input", type="text"}){
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(value);
    const id = useId()

    function handleSubmit(){
        let newValue = validateInput(type,draftValue,placeholder)
        onSave(newValue);
        setIsEditing(false);
        setDraftValue(newValue);
    }
    
    const DisplayComponent = displayAs;
    const EditComponent = editAs;

    if(!isEditing){
        return(
            <div className={`inline-editable ${className}`} onClick={() => setIsEditing(true)}>
                <DisplayComponent className="inline-editable-value">{value}</DisplayComponent>
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
                                    id={id} 
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