import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../app/components/Header';  // Adjust the path as necessary
import '@testing-library/jest-dom'



describe('Header Component', () => {
  it('renders the logo image with correct src', () => {
    render(<Header />);
    const image = screen.getByRole('img', { name: /picture of the author/i });
    expect(image).toHaveAttribute('width', '250');
    expect(image).toHaveAttribute('height', '250');
    expect(image).toHaveAttribute('alt', 'Picture of the author');
  });
});
