import React from 'react'
import {Link} from '../src/Link'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

test('Link create has success', () => {
  const mockProps = {
    router: {
      history: {
        push: jest.fn(),
        replace: jest.fn(),
        createHref: jest.fn()
      }
    },
    onClick: jest.fn(),
    to: 'http://facebook.github.io'
  }
  const link = renderer.create(
    <Link {...mockProps}>Facebook Github</Link>
  )

  let tree = link.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Link text check', () => {
  const mockProps = {
    router: {
      history: {
        push: jest.fn(),
        replace: jest.fn(),
        createHref: jest.fn()
      }
    },
    to: 'http://facebook.github.io'
  }

  const link = shallow(
    <Link {...mockProps}>Facebook Github</Link>
  )

  expect(link.text()).toEqual('Facebook Github')
})
