import { cn } from 'cn';

type ColorSwatchesProps = {
  colors: string[];
  value: string;
  onChange: (color: string) => void;
};

const ColorSwatches = ({ colors, value, onChange }: ColorSwatchesProps) => (
  <div className="flex gap-2">
    {colors.map((color) => (
      <button
        key={color}
        type="button"
        onClick={() => onChange(color)}
        aria-label={color}
        style={{ backgroundColor: color }}
        className={cn(
          'size-5 cursor-pointer rounded-full border-2',
          value === color ? 'border-foreground' : 'border-transparent',
        )}
      />
    ))}
  </div>
);

export default ColorSwatches;
