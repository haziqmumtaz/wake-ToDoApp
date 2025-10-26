import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  let mockOnPageChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnPageChange = vi.fn();
  });

  it('disables previous button on first page', () => {
    render(<Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />);
    const prevButton = screen.getAllByRole('button')[0];
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination totalPages={10} currentPage={10} onPageChange={mockOnPageChange} />);
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking next', () => {
    render(<Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />);
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking previous', () => {
    render(<Pagination totalPages={10} currentPage={2} onPageChange={mockOnPageChange} />);
    const prevButton = screen.getAllByRole('button')[0];
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when clicking page number', () => {
    render(<Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />);
    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('renders all pages when totalPages <= 5', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('renders ellipsis when totalPages > 5', () => {
    render(<Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination totalPages={10} currentPage={3} onPageChange={mockOnPageChange} />);
    const currentButton = screen.getByRole('button', { name: '3' });
    expect(currentButton).toHaveClass('text-[#4200FF]');
  });

  it('handles edge case: page 1 with many pages', () => {
    render(<Pagination totalPages={100} currentPage={1} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('handles edge case: near end of pages', () => {
    render(<Pagination totalPages={100} currentPage={99} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '99' })).toBeInTheDocument();
  });

  it('handles middle page pagination display', () => {
    render(<Pagination totalPages={100} currentPage={50} onPageChange={mockOnPageChange} />);
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '50' })).toBeInTheDocument();
  });
});
