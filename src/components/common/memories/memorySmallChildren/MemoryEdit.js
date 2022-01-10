import { useState } from 'react'

import { memoryEdit } from '../../../../lib/api.js'
import { logoImageLink } from '../../../../lib/config.js'
import { uploadImageMemory } from '../../../../lib/imageHosting.js'
import LocationPicker from '../../maps/LocationPicker.js'


const initialState = {
  name: '',
  location: '',
  image: '',
  notes: '',
  lat: 0,
  long: 0,
  visitDate: new Date(),
}
const maxLengthNotes = 200


function MemoryEdit ({ memory, handleSwitchToShow, updateClientsideMemory }) {
  const [formData, setFormData] = useState(memory ? memory : initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState({ ...initialState, visitDate: 0 })
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  
  const handleChange = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    try {
      await memoryEdit(memory._id, formData)
      // update client without re-fetching
      updateClientsideMemory(formData)
      handleSwitchToShow()
    } catch (err) {
      console.log('error response:', err)
      setFormErrors(err.response.data.errors)
    }
  }

  const handleImageUpload = async (e) => {
    try {
      setIsUploadingImage(true)
      const newImageUrl = await uploadImageMemory(e.target.files[0])
      setFormData({ ...formData, image: newImageUrl })
      setIsUploadingImage(false)
    } catch (err) {
      setIsUploadingImage(false)
    }
  }

  const captureLocation = (location) => {
    setFormData({ ...formData, long: location[0], lat: location[1] })
  }

  return (
    <form 
      className="container-fluid row"
      onSubmit={handleSubmit}>
      <div className='row'>
        <div className="form-group col">
          <label className="label" htmlFor="image" role="button">
            <p>Share a photo?</p>
            <img 
              src={formData.image ? formData.image : logoImageLink} 
              alt={formData.name} 
              className='memory-edit-image' 
            />
          </label>
          <input 
            type="file" 
            className='d-none'
            id="image" 
            accept="image/png, image/jpeg"
            onChange={handleImageUpload} 
          />
          {isUploadingImage && <p>Image uploading</p>}
        </div>
        <div className="form-group col">
          <label htmlFor="location">Where were you?</label>
          <LocationPicker getLocationFromMap={captureLocation} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="name">What happened?</label>
        <input
          type='text' 
          name="name"
          id="name"
          className={
            `form-control 
                ${(formErrors.name ) ? 'border-danger' : ''}
                `}
          value={formData.name}
          onChange={handleChange} />
        {formErrors.name && <p className="text-danger">{formErrors.name}</p>  }
      </div>
      <div className="form-group">
        <label htmlFor="visitDate">When were you there?</label>
        <input
          type='date' 
          name="visitDate"
          id="visitDate"
          className={
            `form-control 
                ${(formErrors.visitDate ) ? 'border-danger' : ''}
                `}
          value={formData.visitDate}
          onChange={handleChange} />
        {Boolean(formErrors.visitDate) && <p className="text-danger">{formErrors.visitDate}</p>  }
      </div>
      <div className="form-group">
        <label htmlFor="notes">What did you love?</label>
        <textarea 
          name="notes"
          id="notes"
          className={
            `form-control 
                ${(notesRemainingChars < 0 ||
                  formErrors.notes ) ? 'border-danger' : ''}`}
          value={formData.notes}
          onChange={handleChange} />
        <div className='row'>
          <small 
            className={`form-text ml-auto text-end ${
              (notesRemainingChars < 0) ? 'text-danger' : 'text-muted'
            }`}
          >{notesRemainingChars} characters remaining</small>
        </div>
        {formErrors.notes && <p className="text-danger">{formErrors.notes}</p>  }
      </div>
      <div className='row'>
        {isUploadingImage && <p>Image uploading...</p>}
        <button 
          type="submit"
          className={`btn btn-success ml-auto ${isUploadingImage && 'disabled'}`}
          aria-disabled={isUploadingImage}
        >Save this memory!</button>
      </div>
    </form>
  )
}

export default MemoryEdit