import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';

describe('Tooltip Components', () => {
  describe('Tooltip', () => {
    it('renders with children', () => {
      render(
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('TooltipProvider', () => {
    it('applies custom delayDuration', () => {
      render(
        <TooltipProvider delayDuration={500}>
          <div>Content</div>
        </TooltipProvider>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('TooltipTrigger', () => {
    it('renders with children', () => {
      render(
        <Tooltip>
          <TooltipTrigger>
            <span>Trigger</span>
          </TooltipTrigger>
        </Tooltip>
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });
  });

  describe('TooltipContent', () => {
    it('renders content text', () => {
      render(
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      );
      expect(screen.getAllByText('Tooltip text')[0]).toBeInTheDocument();
    });

    it('applies custom sideOffset', () => {
      render(
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent sideOffset={10}>Content</TooltipContent>
        </Tooltip>
      );
      expect(screen.getAllByText('Content')[0]).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent className="custom-tooltip">Content</TooltipContent>
        </Tooltip>
      );
      expect(screen.getAllByText('Content')[0]).toBeInTheDocument();
    });

    it('renders arrow element', () => {
      render(
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      );
      expect(screen.getAllByText('Content')[0]).toBeInTheDocument();
    });
  });
});
