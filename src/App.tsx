import { DropFileInput } from './component'
import './App.css'

const App = () => {
  const onFileChange = (files: any) => {
    console.log(files);
  }

  return (
    <>
      <div>
        <h2 className="header">
            React drop files input
        </h2>
        <DropFileInput
            onFileChange={(files) => onFileChange(files)}
        />
      </div>
    </>
  )
}

export default App
