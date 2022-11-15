import { For, Resource } from 'solid-js';
import { A, createRouteData, useParams, useRouteData } from 'solid-start';
import { Card } from '~/components/Card';
import {
  getListItem,
  getMovies,
  getTrending,
  ITrendingMovies,
  ITrendingTvShows,
  TMediaItems,
} from '~/services/tmdbAPI';
import { formatToId } from '~/utils/format';

export function routeData({ params }) {
  return createRouteData(
    async (name) => {
      try {
        const items =
          name === 'trending'
            ? await getTrending('movie')
            : await getMovies(name);
        return { items };
      } catch {
        throw new Error('Data not available');
      }
    },
    {
      key: () => params.name,
    },
  );
}

export default function MovieCategories() {
  const data = useRouteData<
    () => Resource<{
      items: {
        results: TMediaItems[];
      };
    }>
  >();
  const params = useParams();

  return (
    <main class="main">
      <div class="listing">
        <div class="listing__head">
          <h2 class="listing__title">
            {getListItem('movie', params.name).TITLE}
          </h2>
          <A href="viewAllUrl" class="listing__explore">
            <strong>Explore All</strong>
          </A>
        </div>
        <div class="listing__items">
          <For each={data()?.items.results}>
            {(item, getIndex) => (
              <Card
                item={item}
                id={formatToId(
                  'title' in item ? item.title : item.name,
                  'categories',
                  getIndex(),
                )}
              />
            )}
          </For>
        </div>
      </div>
    </main>
  );
}
