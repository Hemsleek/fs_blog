import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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