document.querySelector('input').addEventListener('change', function() {

  var reader = new FileReader();
  filename = this.files[0].name;
  reader.onload = function() {

    arrayBuffer = this.result;
    console.log(filename);
    d = document.getElementById("downloadButton");
    console.log(arrayBuffer);
    loadData(arrayBuffer.slice());
    let array = new Uint8Array(arrayBuffer);
    console.log("array");
    console.log(array);
    let blob = new Blob([array], {type: "octet/stream"});
    console.log("blob loaded");
    d.href = window.URL.createObjectURL(blob);
    d.download = filename;
  }
  reader.readAsArrayBuffer(this.files[0]);

}, false);

function loadData(arrayBuffer){
  let array = new Uint8Array(arrayBuffer); 
  let arcadeIndex = 0;
  while(!(
    array[arcadeIndex+0] === "L".charCodeAt(0) &&
    array[arcadeIndex+1] === "2".charCodeAt(0) &&
    array[arcadeIndex+2] === "1".charCodeAt(0)
  ) && arcadeIndex < array.length
  ){
    arcadeIndex++;
  }
  console.log("arcadeIndex");
  console.log(arcadeIndex);
  let i = arcadeIndex;
  let arcadeLevels = []
  while(true){
    if(array[i] === "L".charCodeAt(0)){
      i++;
      let key = 10*(array[i++]-48) + array[i++] - 48;
      console.log("key");
      console.log(key);
      let values = [];
      while(array[i] == 32){
        i++;
        let value = 100*(array[i++]-48) + 10*(array[i++]-48) + array[i++] - 48;
        values.push(value);
      }
      arcadeLevels[key] = values;
      i += 2;
    }
    else{
      break;
    }
  }
  console.log(arcadeLevels);
  let baseDiv = document.getElementById("arcadeBaseTimes");
  baseDiv.innerHTML = "";
  for(let levelId in arcadeLevels){
    let levelDiv = document.createElement("div");
    levelDiv.innerHTML = "Level " + levelId;
    let level = arcadeLevels[levelId];
    for(let timeId in level){
      let time = level[timeId];
      let timeDiv = document.createElement("input");
      timeDiv.setAttribute("value",time);
      timeDiv.setAttribute("size",3);
      levelDiv.appendChild(timeDiv);
    }
    baseDiv.appendChild(levelDiv);
  }
}