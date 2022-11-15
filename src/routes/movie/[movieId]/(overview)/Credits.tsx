import { createSignal, For } from 'solid-js';
import { css } from 'solid-styled-components';
import { ChevronLeft } from '~/components/ChevronLeft';
import { ChevronRight } from '~/components/ChevronRight';
import { IFeatured } from '~/services/tmdbAPI';
import { formatToId } from '~/utils/format';
import { CreditsItem } from './CreditsItem';

function max(a, b) {
  return a > b || (b ?? null) === null ? a : b;
}
function min(a, b) {
  return a < b || (b ?? null) === null ? a : b;
}

const SCROLL_FACTOR = 4;

export function Credits(props: { people: IFeatured['credits']['cast'] }) {
  const btnClass = css`
    opacity: 30%;
    &:hover {
      opacity: 100%;
      transition: 500ms;
    }
  `;
  const cardPrefix = formatToId('credits', 'credit_carousel_card');
  const [colId, setColId] = createSignal({ [cardPrefix]: 0 });
  return (
    <div class="listing listing--carousel">
      <div class="listing__head">
        <h2 class="listing__title">Cast</h2>
      </div>

      <div class="carousel">
        <button
          class={['carousel__nav carousel__nav--left', btnClass].join(' ')}
          aria-label="Previous"
          type="button"
          // disabled="disableLeftButton"
          // click="moveToClickEvent('left')"
          onClick={() => {
            const currColId = colId()[cardPrefix];
            // go to previous column id but not before first item
            const prevColId = max(
              props.people.length - 1 === currColId
                ? SCROLL_FACTOR *
                    Math.floor(
                      props.people.length / SCROLL_FACTOR - 1, // get previous colId
                    )
                : currColId - SCROLL_FACTOR,
              SCROLL_FACTOR,
            );
            // console.log('nang', prevColId);

            document
              .querySelector(
                `#${cardPrefix}${prevColId - SCROLL_FACTOR} hr.js-scroll-zone`,
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

        <div
          class="carousel__items"
          /*ref="carouselElement"*/
          /*scroll="scrollEvent"*/
        >
          <For each={props.people}>
            {(person, getIndex) => (
              <CreditsItem
                person={person}
                id={`${cardPrefix}${getIndex()}`}
                loading={getIndex() >= 4 + 4 ? 'lazy' : 'eager'} // lazy-load offscreen images
              />
            )}
          </For>
        </div>

        <button
          class={['carousel__nav carousel__nav--right', btnClass].join(' ')}
          aria-label="Next"
          type="button"
          // disabled="disableRightButton"
          // click="moveToClickEvent('right')"
          onClick={() => {
            // go to next  (current | 4) + 4 but not past last item
            const nextColId = min(
              (colId()[cardPrefix] || SCROLL_FACTOR) + SCROLL_FACTOR,
              props.people.length - 1,
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
  );
}
