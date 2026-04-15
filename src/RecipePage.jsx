import Recipe from './Recipe.jsx'
import Header from './Header.jsx'
import toast, { Toaster } from 'react-hot-toast';

const notify_save = () => toast('Changes saved successfully.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
});
const notify_clear = () => toast.error('Cleared recipe to pristine.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_delete',
    icon:'🗑️'
});
const notify_restore_saved_data = () => toast('Restored last version of recipe.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_restore',
    icon:'☑️'
});

export default function RecipePage(){
    return(
        <>
        <Header/>
        <Recipe notifySaved={notify_save} notifyClear={notify_clear} notifyRestore={notify_restore_saved_data}/>
        <Toaster />
        </>
    )
}