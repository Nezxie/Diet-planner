let fileHandle;

const filePickerOpts = {
  types: [
    {
      description: "JSON or TXT",
      accept: {
        "text/plain": [".txt"],
        "application/json": [".json"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

export async function getFile(){
    [fileHandle] = await window.showOpenFilePicker(filePickerOpts);
    if(!fileHandle)
        return;
    const fileData = await fileHandle.getFile();
    const content = await fileData.text()
    return content;
}

export function triggerDownloadJSONFile(data){
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString],{ type: "application/json" })
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download="recipe-list-export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

