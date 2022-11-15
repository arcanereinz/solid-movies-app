import { A } from 'solid-start';
import { TMediaItems } from '~/services/tmdbAPI';
import Poster from './Poster';

export function Card({
  item,
  id,
  loading = 'eager',
}: {
  item: TMediaItems;
  id?: string;
  loading?: 'eager' | 'lazy';
}) {
  const media = () =>
    item && 'media_type' in item
      ? item.media_type
      : item && 'name' in item
      ? 'tv'
      : 'movie';
  return (
    <div class="card" id={id}>
      <A class="card__link" href={`/${media()}/${item.id}`}>
        <div class="card__img">
          <hr
            class="js-scroll-zone"
            style={{
              // position to always be able to put into view
              position: 'absolute',
              top: '0px',
              height: '1rem',
              width: '1rem',
              border: 0,
              // background: 'orange',
            }}
          />
          <Poster
            // src={"https://image.tmdb.org/t/p/" + item.poster_path}
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`}
            alt={'title' in item ? item.title : item.name}
            width={370}
            height={556}
            loading={loading}
          />
        </div>
        <h2 class="text-3xl m-1">{'title' in item ? item.title : item.name}</h2>
      </A>
    </div>
  );
}
