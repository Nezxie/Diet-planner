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
  if (window.showOpenFilePicker){
    [fileHandle] = await window.showOpenFilePicker(filePickerOpts);
    if(!fileHandle)
        return;
    const fileData = await fileHandle.getFile();
    const content = await fileData.text()
    return content;
  }
  else{
    const content = new Promise((resolve)=>{
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = async (e)=>{
        const fileData = e.target.files[0];
        resolve(await fileData.text());
      }
      input.click();
    })
    return content;
  }
}

export function triggerDownloadJSONFile(data, name){
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString],{ type: "application/json" })
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download=`${name}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function triggerDownloadTXTFile(data, name){
    const blob = new Blob([data],{ type: "text/plain" })
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download=`${name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
