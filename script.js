window.onload = function(){
    var filesName = localStorage.getItem("filesName");
    if (filesName){
        files = JSON.parse(filesName);
        console.log(files);
        addFileContainer();
        localStorage.clear();
    }

    let uploadBtn = document.getElementById("uploadBtn");
    let dropArea = document.getElementById("dropArea");
    let filesContainer = document.getElementById("files");
    let deleteFile = document.getElementsByClassName("deleteFile");
    let viewContent = document.getElementsByClassName("viewContent");
    let fileInfoObject = {};
    var files;

    uploadBtn.addEventListener("change", (event)=>{
        files = event.target.files;
        handleFiles();
    });
    
    ['dragover', 'drop'].forEach(eventname=>{
        dropArea.addEventListener(eventname, preventDefaults);
    });
    
    function preventDefaults(event){
        event.preventDefault();
    }
    
    dropArea.addEventListener("drop", dropFile);
    
    function dropFile(event){
        files = event.dataTransfer.files;
        handleFiles();
    }
    
    function deleteFiles(){
        for (let i = 0; i < deleteFile.length; i++) {
            deleteFile[i].addEventListener("click", (event)=>{
                // console.dir(event.target.parentElement.parentElement.parentElement);
                event.target.parentElement.parentElement.remove();
            });
        }
    }
    
    function viewFiles(){
        for(let i=0; i < viewContent.length; i++){
            viewContent[i].addEventListener("click", (event)=>{
                let targetedFile = event.target.previousElementSibling.innerText;
                window.name = fileInfoObject[targetedFile];
                // console.log(files);
                // localStorage.setItem("filesName", JSON.stringify(files));
                // console.log(files);
                window.location.href = "content.html";
            });
        }
    }
    
    function addFileContainer(){
        for(let i=0; i<files.length; i++){
            filesContainer.innerHTML += "<div class='fileContainer'><p>" + files[i].name + "</p><button class='viewContent'>View Content</button><button class='deleteFile'><img src='https://imgs.search.brave.com/AUIP78LDEbjbs1gTHVLUt_iFqo0gnosDa5RfvMxhsq0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pY29u/cy52ZXJ5aWNvbi5j/b20vcG5nL28vbWlz/Y2VsbGFuZW91cy9t/ZWRpdW0tdGhpbi1s/aW5lYXItaWNvbi9j/cm9zcy0yMy5wbmc'></button></div>"
        }
    }
    
    function handleFiles(){
        addFileContainer();
        for (let i=0; i<files.length; i++){
            let fileReader = new FileReader();
            fileReader.readAsText(files[i]);
            fileReader.onload = function(event){
                fileInfoObject[files[i].name] = event.target.result;
            }
        }
        deleteFiles();
        viewFiles();
    }
    
};

