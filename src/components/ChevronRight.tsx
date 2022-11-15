import { JSX, splitProps } from 'solid-js';
import chevronRightImg from '../assets/images/chevron-right.svg';

export function ChevronRight(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const [local, imgProps] = splitProps(props, ['class']);
  return (
    <img
      class={['ml-5 w-10 h-10 text-gray-400 hover:block', local.class].join(
        ' ',
      )}
      src={chevronRightImg}
      alt="left-navigation"
      {...imgProps}
    />
  );
}
