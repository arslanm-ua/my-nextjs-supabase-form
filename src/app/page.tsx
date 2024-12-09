'use client'

import { useState } from 'react'

export default function FormPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (response.ok) {
        setMessage('Formular erfolgreich abgeschickt!')
        setFormData({ name: '', email: '', phone: '' }) // Formular leeren
      } else {
        
      }
    } catch (error) {
      setMessage('Serverfehlerr, bitte später erneut versuchen.')
    }
  }

  return (
    <div>
      <h1>Formular</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="phoneNumber">Telefonnummer:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <button type="submit">Absenden</button>
      </form>
    </div>
  )
}
