import Header from './Header.jsx'
import toast, { Toaster } from 'react-hot-toast';
import './styles/PreferencesPage.css'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {downloadRecipeListData,importRecipeListData} from './utils/recipeStorage.js'
import {getFile} from './utils/fileUtils.js'

const notify_save = () => toast('Settings saved successfully.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
})
const notify_download = () => toast('Your download should start in a moment.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
})
const notify_import_success = () => toast('Your recipe list was imported successfully.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
})

export default function PreferencesPage(){
    async function onImportRecipeList(){
        const fileContents = await getFile();
        if(confirm("Are you sure you want to replace your current recipe list?")){
            importRecipeListData(fileContents);
            notify_import_success();
        }
    }
    function onExportRecipeList(){
        downloadRecipeListData();
        notify_download();
    }

    return(
        <>
        <Header/>
        <div className='app-body'>
            <section className="function-buttons">
                <button className="function-button" onClick={onExportRecipeList}>Export recipe list</button>
                <button className="function-button" onClick={onImportRecipeList}>Import recipe list</button>
            </section>
            <p>Placeholders for:</p>
            <p>Target calories input (and implement display + style days that exceed that in calendar)</p>
            <p>Default filters on: vegan, vegetarian, keto (those will be auto generated for recipes)</p>
            <p>would be great to have custom filters too, if so we manage them here (add/remove)</p>
            <p>Hide calories everywhere toggle</p>
            <p>How many max days in calendar setting (default:7)</p>
            <button className='save-button' onClick={notify_save}><SaveOutlinedIcon fontSize="small"/>Save settings</button>
        </div>
        <Toaster />
        </>
    )
}