import { IconType } from '@libs/AllIcons';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import Icon from './icon';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  rate: number;
  showRating?: boolean;
  reviews?: number;
  readOnly?: boolean;
  handler?: (value: number) => void;
}

const RatingComponent = memo<RatingProps>(
  ({
    size = 20,
    rate = 24,
    showRating = false,
    reviews,
    readOnly = true,
    className = 'justify-start items-center',
    handler = () => null,
    ...props
  }) => {
    const Stars = () => {
      const items = [1, 2, 3, 4, 5];
      const stars = items.map((item) => {
        let icon: IconType;
        if (item <= rate) {
          icon = 'star';
        } else if (item > rate && item < rate + 1) {
          icon = 'star-half';
        } else {
          icon = 'star-outline';
        }

        return (
          <div
            key={item}
            className={[!readOnly && 'cursor-pointer'].join(' ')}
            onClick={() => {
              if (!readOnly) {
                handler(item);
              }
            }}
          >
            <Icon name={icon} size={size} color="gray" style={{ color: 'rgb(246, 189, 0)' }} />
          </div>
        );
      });

      return stars;
    };

    return (
      <div {...props} className={['flex flex-row', className].join(' ')}>
        {Stars()}
        {showRating && <div>({rate.toFixed(1)})</div>}
        {reviews && reviews !== 0 && (
          <div className="text-muted text-sm ml-1">({reviews || ''})</div>
        )}
      </div>
    );
  }
);

const Rating = dynamic(() => Promise.resolve(RatingComponent), {
  ssr: false,
});

export default Rating;
