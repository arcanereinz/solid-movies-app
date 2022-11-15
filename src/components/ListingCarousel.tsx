import { createResource, createSignal, For, Show } from 'solid-js';
import { A } from 'solid-start';
import { Card } from './Card';
import { css } from 'solid-styled-components';
import { formatToId } from '~/utils/format';
import { TMediaItems } from '~/services/tmdbAPI';
import { ChevronLeft } from './ChevronLeft';
import { ChevronRight } from './ChevronRight';

function max(a, b) {
  return a > b || (b ?? null) === null ? a : b;
}
function min(a, b) {
  return a < b || (b ?? null) === null ? a : b;
}

const SCROLL_FACTOR = 4;

export function ListingCarousel(props: {
  items: TMediaItems[];
  viewAllHref: string;
  title: string;
  viewAllUrl?: boolean;
}) {
  const btnClass = css`
    opacity: 30%;
    &:hover {
      opacity: 100%;
      transition: 500ms;
    }
  `;

  const cardPrefix = formatToId(props.title, 'listing_carousel_card');
  const [colId, setColId] = createSignal({ [cardPrefix]: 0 });
  return (
    <Show when={!!props.items?.length}>
      <div id={cardPrefix} class="listing listing--carousel">
        <Show when={props.title || props.viewAllUrl}>
          <div class="listing__head">
            <Show when={props.title}>
              <h2 class="listing__title">{props.title}</h2>
            </Show>

            <Show when={props.viewAllUrl}>
              <A href={props.viewAllHref} class="listing__explore">
                <strong>Explore All</strong>
              </A>
            </Show>
          </div>
        </Show>

        <div class="carousel">
          <button
            class={['carousel__nav carousel__nav--left', btnClass].join(' ')}
            aria-label="Previous"
            type="button"
            // disabled="disableLeftButton"
            onClick={() => {
              const currColId = colId()[cardPrefix];
              // go to previous column id but not before first item
              const prevColId = max(
                props.items.length - 1 === currColId
                  ? SCROLL_FACTOR *
                      Math.floor(
                        props.items.length / SCROLL_FACTOR - 1, // get previous colId
                      )
                  : currColId - SCROLL_FACTOR,
                SCROLL_FACTOR,
              );
              // console.log('nang', prevColId);

              document
                .querySelector(
                  `#${cardPrefix}${
                    prevColId - SCROLL_FACTOR
                  } hr.js-scroll-zone`,
                )
                .scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
              setColId({
                [cardPrefix]: prevColId,
              });
            }}
          >
            <ChevronLeft />
          </button>

          <div class="carousel__items" style={`svg { display: hidden; }`}>
            <For each={props.items}>
              {(item, getIndex) => (
                <Card
                  item={item}
                  id={`${cardPrefix}${getIndex()}`}
                  loading={getIndex() >= 4 + 4 ? 'lazy' : 'eager'} // lazy-load offscreen images
                />
              )}
            </For>

            <div class="card">
              <A href={props.viewAllHref} class="card__link">
                <div class="card__img">
                  <span>Explore All</span>
                </div>
              </A>
            </div>
          </div>

          <button
            class={['carousel__nav carousel__nav--right', btnClass].join(' ')}
            aria-label="Next"
            type="button"
            // disabled="disableRightButton"
            onClick={() => {
              // go to next  (current | 4) + 4 but not past last item
              const nextColId = min(
                (colId()[cardPrefix] || SCROLL_FACTOR) + SCROLL_FACTOR,
                props.items.length - 1,
              );
              document
                .querySelector(`#${cardPrefix}${nextColId} hr.js-scroll-zone`)
                .scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
              setColId({ [cardPrefix]: nextColId });
              // console.log('nang', colId());
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </Show>
  );
}
