import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(<Textarea defaultValue="Initial value" />);
    expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument();
  });

  it('handles onChange', async () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles disabled state', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Textarea className="custom-class" />);
    const textarea = container.querySelector('[data-slot="textarea"]');
    expect(textarea).toHaveClass('custom-class');
  });

  it('applies aria-invalid attribute', () => {
    const { container } = render(<Textarea aria-invalid={true} />);
    const textarea = container.querySelector('[data-slot="textarea"]');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('allows all standard textarea props', () => {
    render(<Textarea rows={5} cols={10} required />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '10');
    expect(textarea).toBeRequired();
  });
});
