import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NumericBadgeProps {
  value: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  tooltip?: string;
}

const NumericBadge = ({
  value,
  backgroundColor = '#000000',
  textColor = '#FFFFFF',
  tooltip = '',
}: NumericBadgeProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`rounded-full w-8 h-8 shadow-lg cursor-default flex items-center justify-center `}
          style={{ color: textColor, backgroundColor: backgroundColor }}
        >
          {Number(value) > 99 ? '99+' : value}
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
