import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NumericBadgeProps {
  value: number;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  tooltip?: string;
}

const NumericBadge = ({
  value,
  backgroundColor = '#000000',
  textColor = '#FFFFFF',
  className = '',
  tooltip = '',
}: NumericBadgeProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`numeric-badge rounded-full px-2 py-1 shadow-lg ${className} cursor-default`}
          style={{ color: textColor, backgroundColor: backgroundColor }}
        >
          {value}
        </div>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default NumericBadge;
