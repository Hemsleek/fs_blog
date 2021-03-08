import React from 'react'

const NewBlogForm = ({ handleSubmit}) => {
    return (
      <form onSubmit={handleSubmit}>
      <div>
          title:
          <input
          type="text"
          name="Title"
        />
      </div>
      <div>
          author:
          <input
          type="text"
          name="Author"
        />
      </div>
      <div>
          url:
          <input
          type="text"
          name="Url"
        />
      </div>
      <button type="submit">save</button>
    </form>
    )
}

export default NewBlogForm
