import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies default variant and size', () => {
    const { container } = render(<Button>Default</Button>);
    const button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies destructive variant', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('bg-destructive');
  });

  it('applies outline variant', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    const button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('border', 'border-gray-300');
  });

  it('applies secondary variant', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    const button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('bg-secondary');
  });

  it('applies ghost variant', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    const button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('applies link variant', () => {
    const { container } = render(<Button variant="link">Link</Button>);
    const button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('underline-offset-4');
  });

  it('applies size variants', () => {
    const { container, rerender } = render(<Button size="sm">Small</Button>);
    let button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('h-8');

    rerender(<Button size="lg">Large</Button>);
    button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('h-10');

    rerender(<Button size="icon">Icon</Button>);
    button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('size-9');

    rerender(<Button size="icon-sm">Icon</Button>);
    button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('size-8');

    rerender(<Button size="icon-lg">Icon</Button>);
    button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('size-10');
  });

  it('renders as Slot when asChild is true', () => {
    const { container } = render(
      <Button asChild>
        <a href="#">Link</a>
      </Button>
    );
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>);
    const button = container.querySelector('[data-slot="button"]');
    expect(button).toHaveClass('custom-class');
  });

  it('handles onClick event', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
