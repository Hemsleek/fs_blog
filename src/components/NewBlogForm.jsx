import React from 'react'

const NewBlogForm = ({ handleSubmit}) => {

    return (
      <form onSubmit={handleSubmit}>
        <h2>Create New</h2>
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
      <button type="submit">Create</button>
    </form>
    )
}

export default NewBlogForm
