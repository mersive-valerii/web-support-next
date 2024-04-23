import React from 'react';
import { render, screen } from '@testing-library/react';
import CardText from '../app/components/CardText'; 
import '@testing-library/jest-dom'

describe('CardText Component', () => {
  test('displays the correct text', () => {
    const testText = "Hello, this is a test!";
    render(<CardText text={testText} />);

    const textElement = screen.getByText(testText);
    expect(textElement).toBeInTheDocument();
  });
});
