import Header from './Header.jsx'
import toast, { Toaster } from 'react-hot-toast';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';


const notify_save = () => toast('Settings saved successfully.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
})
export default function PreferencesPage(){
    return(
        <>
        <Header/>
        <p>Here well have some options user can save like filters and calories and stuff.</p>
        <button className='save-button' onClick={notify_save}><SaveOutlinedIcon fontSize="small"/>Save settings</button>
        <Toaster />
        </>
    )
}