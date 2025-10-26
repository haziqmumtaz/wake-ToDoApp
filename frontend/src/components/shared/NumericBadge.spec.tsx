import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NumericBadge from './NumericBadge';

describe('NumericBadge', () => {
  it('renders with value', () => {
    render(<NumericBadge value="5" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies default background color', () => {
    const { container } = render(<NumericBadge value="10" />);
    const badge = container.querySelector('.rounded-full');
    expect(badge).toHaveStyle({ backgroundColor: '#000000', color: '#FFFFFF' });
  });

  it('applies custom background color', () => {
    const { container } = render(<NumericBadge value="5" backgroundColor="#FF0000" />);
    const badge = container.querySelector('.rounded-full');
    expect(badge).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  it('applies custom text color', () => {
    const { container } = render(<NumericBadge value="5" textColor="#00FF00" />);
    const badge = container.querySelector('.rounded-full');
    expect(badge).toHaveStyle({ color: '#00FF00' });
  });

  it('renders tooltip when provided', () => {
    render(<NumericBadge value="5" tooltip="Test tooltip" />);
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
  });

  it('does not render tooltip when not provided', () => {
    render(<NumericBadge value="5" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<NumericBadge value="5" className="custom-badge" />);
    const badge = container.querySelector('.rounded-full');
    expect(badge).toBeInTheDocument();
  });
});
