import { useDropzone } from 'react-dropzone';
import { useMemo, useState } from 'react'
import './App.css';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function App() {
  const {
    acceptedFiles, 
    rejectedFiles, 
    getRootProps, 
    getInputProps, 
    isDragActive, 
    isDragAccept, 
    isDragReject
  } = useDropzone({
    accept: ".pdf"
  });

  // const [readfile,setReadFile] = useState();

  function displayAcceptedFilesContent(file) {
      const fileData = file[0]
      // console.log(Object.getPrototypeOf(fileData))
      const blob = new Blob([JSON.stringify(fileData)], {type : 'application/json'});
      const reader = new FileReader();
      reader.onload = function(e) {
        e.preventDefault()
        console.log(e.target);
      };
      console.log(blob)
      reader.readAsText(blob);
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle: {}),
    ...(isDragReject ? rejectStyle: {})
  }),
  [
    isDragAccept,
    isDragActive,
    isDragReject,
  ])
  
  return (
    <div className="App">
      <h1>Building a Drag-n-drop stl file-read application!</h1>
      <div className="dnd" {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="file_contents">
        {
          (acceptedFiles == null) ? {} : displayAcceptedFilesContent(acceptedFiles) 
        }
      </div>
    </div>
  );
}

export default App;
