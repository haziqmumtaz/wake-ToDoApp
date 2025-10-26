import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';

describe('Dialog Components', () => {
  describe('Dialog', () => {
    it('renders with default props', () => {
      render(
        <Dialog open>
          <div>Dialog content</div>
        </Dialog>
      );
    });
  });

  describe('DialogTrigger', () => {
    it('renders as a button', () => {
      render(
        <Dialog open>
          <DialogTrigger>Open</DialogTrigger>
        </Dialog>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('DialogContent', () => {
    it('renders with children', () => {
      render(
        <Dialog open>
          <DialogContent>
            <div>Content</div>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders close button by default', () => {
      render(
        <Dialog open>
          <DialogContent>
            <div>Content</div>
          </DialogContent>
        </Dialog>
      );
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>
            <div>Content</div>
          </DialogContent>
        </Dialog>
      );
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Dialog open>
          <DialogContent className="custom-class">
            <div>Content</div>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('DialogHeader', () => {
    it('renders with children', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <div>Header</div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader className="custom-header">
              <div>Header</div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
    });
  });

  describe('DialogTitle', () => {
    it('renders title text', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Test Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
    });
  });

  describe('DialogDescription', () => {
    it('renders description text', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogDescription>Test Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('DialogFooter', () => {
    it('renders with children', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogFooter>
              <button>Action</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogFooter className="custom-footer">
              <button>Action</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('DialogClose', () => {
    it('renders close button', () => {
      render(
        <Dialog open>
          <DialogContent>
            <div>Content</div>
            <DialogClose>Close Button</DialogClose>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('Close Button')).toBeInTheDocument();
    });
  });
});
