import './App.css'
import Header from './components/Header'
import TopicExplainer, { footerTextContent, footerCodeContent } from './components/TopicExplainer'
import FooterPanel from './components/FooterPanel'
import { useState } from 'react'

function App() {
  const [topic] = useState('Introduction to React')

  const sampleCode = `function Greeting({ name }) {\n  return <h1>Hello, ${"{name}"}!</h1>;\n}`
  const sampleText = 'React lets you compose UI from small, reusable components.'

  return (
    <div className="ppt-root">
      <Header title={`Topic: ${topic}`} />
      <TopicExplainer topic={topic} />
      <FooterPanel contentText={footerTextContent} contentCode={footerCodeContent} />
    </div>
  )
}

export default App
