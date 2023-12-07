"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { ArcadeBaseTimes } from "./ArcadeBaseTimes";

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
        <br/>
        { fileBytes && 
            <span className="inline-block border border-black">
                <ArcadeBaseTimes fileBytes={fileBytes} updateFileBytes={setFileBytes}/>
            </span>
        }
        <br/>
        { fileBytes && <button 
            id="downloadButton"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
            onClick={() => downloadExecutable(fileBytes)}>
                Download Executable
        </button> }
    </>)
}