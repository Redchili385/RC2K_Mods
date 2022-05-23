document.querySelector('input').addEventListener('change', function() {
  const reader = new FileReader();
  const fileName = this.files[0].name;
  reader.onload = function() {
    const arrayBuffer = this.result;
    console.log(fileName);
    console.log(arrayBuffer);
    loadData(arrayBuffer.slice(), fileName);
  }
  reader.readAsArrayBuffer(this.files[0]);
}, false);

function loadData(arrayBuffer, fileName){
  rallyData = new RallyData(arrayBuffer, fileName);
  const arcadeTimes = rallyData.getArcadeTimes();
  const baseDiv = document.getElementById("arcadeBaseTimes")
  console.log(arcadeTimes)
  dictDiv = Dom.renderDictOfEditableArrays(arcadeTimes)
  baseDiv.appendChild(dictDiv);
}

function writeAndDownloadArcadeState(){
  const dict = dictDiv.getDict()
  rallyData.setArcadeTimes(dict)
  button = document.getElementById("downloadButton");
  const array = rallyData.array;
  console.log("array");
  console.log(array);
  const blob = new Blob([array], {type: "octet/stream"});
  console.log("blob loaded");
  const url = window.URL.createObjectURL(blob);
  console.log(rallyData)
  download(url, rallyData.fileName)
  return dict
}

function download(url, fileName = undefined) {
  const a = document.createElement('a')
  a.href = url
  if(fileName == null){
    a.download = url.split('/').pop()
  }
  else{
    a.download = fileName
  }
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}