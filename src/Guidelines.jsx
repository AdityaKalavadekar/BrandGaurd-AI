import { useEffect, useState } from 'react'
import './Guidelines.css'

function Guidelines() {
  const [formData, setFormData] = useState({
    brandName: '',
    description: '',
    tone: 'Professional',
    tagline: '',
    approvedWords: '',
    restrictedWords: '',
    importantFacts: '',
  })

  const [saved, setSaved] = useState(false)

  // Load previously saved guidelines
  useEffect(() => {
    const savedData = localStorage.getItem('brandGuidelines')

    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  // Update form when the user types
  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setSaved(false)
  }

  // Save guidelines in the browser
  function handleSubmit(event) {
    event.preventDefault()

    localStorage.setItem(
      'brandGuidelines',
      JSON.stringify(formData)
    )

    setSaved(true)
  }

  return (
    <div className="guidelines-page">
      <div className="guidelines-heading">
        
        <p>
          Add your company's brand rules so BrandGuard AI
          can check content against them.
        </p>
      </div>

      <form className="guidelines-form" onSubmit={handleSubmit}>
        <label>Brand Name</label>
        <input
          type="text"
          name="brandName"
          placeholder="Example: Inkloom AI"
          value={formData.brandName}
          onChange={handleChange}
          required
        />

        <label>Brand Description</label>
        <textarea
          name="description"
          placeholder="Describe what your company does..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />

        <label>Brand Tone</label>
        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
        >
          <option>Professional</option>
          <option>Friendly</option>
          <option>Formal</option>
          <option>Creative</option>
          <option>Casual</option>
        </select>

        <label>Official Tagline</label>
        <input
          type="text"
          name="tagline"
          placeholder="Enter your official brand slogan"
          value={formData.tagline}
          onChange={handleChange}
        />

        <label>Approved Words</label>
        <textarea
          name="approvedWords"
          placeholder="Enter words your brand prefers..."
          value={formData.approvedWords}
          onChange={handleChange}
          rows="3"
        />

        <label>Restricted Words</label>
        <textarea
          name="restrictedWords"
          placeholder="Enter words your brand should avoid..."
          value={formData.restrictedWords}
          onChange={handleChange}
          rows="3"
        />

        <label>Important Brand Facts</label>
        <textarea
          name="importantFacts"
          placeholder="Enter official facts that content must follow..."
          value={formData.importantFacts}
          onChange={handleChange}
          rows="4"
        />

        <button type="submit" className="save-guidelines-btn">
          Save Brand Guidelines
        </button>

        {saved && (
          <p className="success-message">
            Brand guidelines saved successfully!
          </p>
        )}
      </form>
    </div>
  )
}

export default Guidelines