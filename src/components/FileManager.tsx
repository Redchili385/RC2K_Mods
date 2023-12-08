"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { ArcadeBaseTimes } from "./ArcadeBaseTimes";
import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import BasicMods from "./BasicMods";

export default function FileManager(){

    const [fileBytes, setFileBytes] = useState<ArrayBuffer | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
  
    function onSelectedFilesChange(event: ChangeEvent<HTMLInputElement>){
      const reader = new FileReader();
      const files = event.target.files
      if(files == null){
        return
      }
      const selectedFile = files[0]
      setFileName(selectedFile.name);
      reader.onload = function() {
        const arrayBuffer = this.result as ArrayBuffer; 
        setFileBytes(arrayBuffer.slice(0))
      }
      reader.readAsArrayBuffer(selectedFile);
    }

    useEffect(() => {
        if(fileName != null){
            console.log(fileName)
        }
    }, [fileName])

    useEffect(() => {
        if(fileBytes != null){
            console.log(fileBytes)
        }
    }, [fileBytes])
  
    function downloadExecutable(bytes: ArrayBuffer){
        const blob = new Blob([new Uint8Array(bytes)], {type: "octet/stream"});
        const url = window.URL.createObjectURL(blob);
        download(url, fileName)
    }

    function download(url: string, fileName: string | null = null) {
        const a = document.createElement('a')
        a.href = url
        a.download = fileName ? fileName : url.split('/').pop() ?? "ral.exe"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
  
    return (<>
        <input type="file" onChange={onSelectedFilesChange}/>
        {fileBytes && fileBytes.byteLength != 5694976 && 
            <span className="font-bold text-red-600">RC2K Patch 6 required on this website.</span>
        }
        <br/>
        { fileBytes && fileBytes.byteLength == 5694976 &&
            <Tabs defaultValue={0}>
                <TabsList className="inline-block bg-gray-100 rounded-lg border-2 border-blue-100">
                    {["Basic Mods", "Arcade Base Times"].map((value, index) => 
                        <Tab value={index} key={index} className="text-lg font-bold bg-gray-200 mx-2 border-4 border-solid rounded-lg px-2 aria-selected:border-blue-600">
                            {value}
                        </Tab>
                    )}
                </TabsList>
                <br/>
                <span className="inline-block border border-black">
                    <TabPanel value={0}>
                        <BasicMods fileBytes={fileBytes} updateFileBytes={setFileBytes}/>
                    </TabPanel>
                    <TabPanel value={1}>
                        <ArcadeBaseTimes fileBytes={fileBytes} updateFileBytes={setFileBytes}/>
                    </TabPanel>
                </span>
            </Tabs>
        }
        { fileBytes && <button 
            id="downloadButton"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
            onClick={() => downloadExecutable(fileBytes)}>
                Download Executable
        </button> }
    </>)
}