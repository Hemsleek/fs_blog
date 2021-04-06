import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM, pretyDOM } from '@testing-library/dom'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Asiyanbi Mubashir',
  url:'http:hemsleek.com',
  likes:2
}

test('renders title content and author', () => {

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'ASIYANBI MUBASHIR'
  )
})

test('does not render url and likes ', () => {

  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).not.toHaveTextContent(
    'Likes - 2'
  )
  expect(component.container).not.toHaveTextContent(
    'http:hemsleek.com'
  )

})

test('blog url and likes show when view button clicked',() => {


  const component = render(
    <Blog blog={blog} />
  )
  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent(
    'Likes - 2'
  )
  expect(component.container).toHaveTextContent(
    'http:hemsleek.com'
  )
})

test('calls event handler twice when likes button is clicked twice',() => {


  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} incrementLikes={mockHandler} />
  )

  const viewButton = component.getByText('View')
  console.log(prettyDOM(viewButton))

  fireEvent.click(viewButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('form calls event handler', () => {


  const handleSubmit = jest.fn()


  const component = render(
    <NewBlogForm handleSubmit={handleSubmit}/>
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('input[name=\'Title\']')
  const author = component.container.querySelector('input[name=\'Author\']')
  const url = component.container.querySelector('input[name=\'Url\']')

  fireEvent.change(title,{
    target:{ value:'Component testing is done with react-testing-library' }
  })
  fireEvent.change(author,{
    target:{ value:'Asiyanbi Mubashir' }
  })
  fireEvent.change(url,{
    target:{ value:'http:hemsleek.com' }
  })
  fireEvent.submit(form)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  console.log(prettyDOM(title))
  const test = handleSubmit.mock.calls[0][0].title
  console.log(test)
  expect(handleSubmit.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
})