import { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import { Container, Divider, Title } from '@mantine/core';
import QueryEditor from './components/QueryEditor';

import ReactJson from 'react-json-view';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';

import QueriesTag from "./components/Queries/QueriesTag";

function App() {
  const [jsonFile, setJsonFile] = useState(null)
  const [selectedFilename, setSelectedFilename] = useState("")
  const [results, setResults] = useState({});
  const [queryInput, setQueryInput] = useState("")
  const [error, setError] = useState("")
  const [recommendedQueries,setRecommendedQueries] = useState([])

  const handleFileUpload = async (uploadedFile) => {
    setJsonFile(uploadedFile[0])
    setSelectedFilename(uploadedFile[0].name)
    setResults(null) //reset

    const formData = new FormData()
    formData.append('json-file',uploadedFile[0])

    //send request to get recommended queries
    const response = await fetch('http://localhost:4000/api/query-recommendations',{
      method : 'POST',
      headers : {
        'Accept' : 'application/json',
      },
      body: formData,
    })

    const {data} = await response.json()

    setRecommendedQueries(data)
  }

  const handleQuerySubmit = async () => {
    const formData = new FormData();

    formData.append('json-file', jsonFile)
    formData.append('query', queryInput)

    try {
      const response = await fetch('http://localhost:4000/api/query-json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      let data = await response.json()

      if (Array.isArray(data)) {
        console.log('Data is an array');
        setResults(data);
      } else if (typeof data === 'object' && data !== null) {
        console.log('Data is an object');
        setResults([data]);
      } else {
        console.log('Data is invalid');
        setError('Invalid JSON response');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    console.log(results);
  }, [results])

  const recommendedQueryClicked = async (item) => {
    //update selected query
    setQueryInput(item)
  }



  return (
    <div className="App">
      <header className="App-header">
        <Container className="w-full main-container">
          <Title align="center" style={{ marginBottom: '20px' }}>JSON Query Tool</Title>
          <div className='flex flex-col w-full gap-8 '>


            <div className='flex flex-col gap-1 p-4 border rounded-lg shadow-xl'>
                <p className='flex items-start justify-start text-lg font-bold' >File</p>
                <Divider style={{ borderTop: '0.1px solid gray' }} my="lg" />
                <FileUpload
                    onFileUpload={handleFileUpload}
                    fileName={selectedFilename}
                />
            </div>
            {/*Recommended Queries*/}
            <div className="flex flex-col">
              {recommendedQueries && recommendedQueries.length > 0 && (
                  <p className="items-start justify-start text-lg font-bold">Generated Quries</p>
              )}
              <div className="grid grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 w-full gap-2">
                {recommendedQueries.map((item)=> (
                    <QueriesTag onClick={recommendedQueryClicked} query={item}/>
                ))}
              </div>
            </div>
            {/*Query Editor box*/}
            <div className='flex flex-col gap-1 p-4 border rounded-lg shadow-xl'>
              <p className='flex items-start justify-start text-lg font-bold' >Query</p>
              <Divider style={{ borderTop: '0.1px solid gray' }} my="lg" />
              <QueryEditor
              queryInput={queryInput}
              setQueryInput={setQueryInput}
              onSubmitQuery={handleQuerySubmit}
            />
            </div>

            <div className="flex w-full border rounded-xl bg-[#002b36]">
              {results && results.length > 0 && (
                <div className='results-box w-full text-sm'>
                  <Title order={4} style={{ color: 'white' }}>Results</Title>
                  {/*<ReactJson src={results} theme="monokai" collapsed={true} enableClipboard={true} />*/}
                  <JsonView  data={results} shouldExpandNode={allExpanded} style={darkStyles}/>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
}

export default App;