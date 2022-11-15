import { JSX, splitProps } from 'solid-js';
import chevronLeftImg from '../assets/images/chevron-left.svg';

export function ChevronLeft(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const [local, imgProps] = splitProps(props, ['class']);
  return (
    <img
      class={['ml-5 w-10 h-10 text-gray-400 hover:block', local.class].join(
        ' ',
      )}
      src={chevronLeftImg}
      alt="left-navigation"
      {...imgProps}
    />
  );
}
