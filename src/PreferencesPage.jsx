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
        <div className='app-body'>
            <p>Here well have some options user can save like filters and calories and stuff.</p>
            <p>So target calories</p>
            <p>Export and import recipes via json?</p>
            <p>How many days in calendar?</p>
            <button className='save-button' onClick={notify_save}><SaveOutlinedIcon fontSize="small"/>Save settings</button>
        </div>
        <Toaster />
        </>
    )
}