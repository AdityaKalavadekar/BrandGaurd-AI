
import { useState } from 'react'
import './ContentChecker.css'

function ContentChecker() {
  const [content, setContent] = useState('')
  const [results, setResults] = useState(null)

  function checkContent() {
    if (!content.trim()) {
      alert('Please enter some content to check.')
      return
    }

    const savedData = localStorage.getItem('brandGuidelines')

    if (!savedData) {
      alert('Please save your Brand Guidelines first.')
      return
    }

    const guidelines = JSON.parse(savedData)

    const restrictedWords = guidelines.restrictedWords
      .split(',')
      .map(word => word.trim())
      .filter(word => word !== '')

    const foundWords = restrictedWords.filter(word => {
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const pattern = new RegExp(`\\b${escapedWord}\\b`, 'i')
      return pattern.test(content)
    })

    setResults({
      checked: true,
      foundWords: foundWords,
      status: foundWords.length === 0 ? 'Passed' : 'Issues Found'
    })
  }

  return (
    <div className="checker-page">
      <div className="checker-heading">
        
        <p>
          Check your content against your saved brand guidelines.
        </p>
      </div>

      <div className="checker-card">
        <label>Enter your content</label>

        <textarea
          rows="8"
          placeholder="Paste your marketing content here..."
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
            setResults(null)
          }}
        />

        <button onClick={checkContent}>
          Check My Content
        </button>
      </div>

      {results && (
        <div className="checker-results">
          <h3>Analysis Results</h3>

          <h2 className={results.foundWords.length === 0
            ? 'passed'
            : 'failed'
          }>
            {results.status}
          </h2>

          {results.foundWords.length === 0 ? (
            <p>
              No restricted words were found in your content.
            </p>
          ) : (
            <>
              <p>The following restricted words were detected:</p>
              <ul>
                {results.foundWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
              <p>Please review and replace these words.</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ContentChecker
