import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title content and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Asiyanbi Mubashir',
    url:'http:hemsleek.com',
    likes:2
  }

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
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Asiyanbi Mubashir',
    url:'http:hemsleek.com',
    likes:2
  }

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

test('blog url and likes show when view button clicked',() =>{
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Asiyanbi Mubashir',
    url:'http:hemsleek.com',
    likes:2
  }

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

test('calls event handler twice when likes button is clicked twice',() =>{
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Asiyanbi Mubashir',
    url:'http:hemsleek.com',
    likes:2
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} incrementLikes={mockHandler} />
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})