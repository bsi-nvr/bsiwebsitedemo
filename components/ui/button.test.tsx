import { render } from '@testing-library/react'
import React from 'react'
import { Button } from './button'

describe('Button', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button>Hi</Button>)
    expect(container).toBeTruthy()
  })
})
