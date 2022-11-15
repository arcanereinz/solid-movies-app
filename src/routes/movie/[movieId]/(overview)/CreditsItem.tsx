import { A } from 'solid-start';
import { IFeatured } from '~/services/tmdbAPI';
import './CreditItems.scss';

export function CreditsItem({
  person,
  id,
  loading = 'eager',
}: {
  person: IFeatured['credits']['cast'][0];
  id: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <div id={id} class="credits-item">
      <A class="credits-item__link" href={`/person/${person.id}`}>
        <div class="credits-item__img">
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
          <img
            v-if="poster"
            loading={loading}
            width="370"
            height="556"
            sizes="xsmall:29vw small:29vw medium:17vw large:14vw xlarge:13vw xlarge1:11vw xlarge2:12vw xlarge3:342"
            alt={person.name}
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${person.profile_path}`}
          />
          {/* <PlaceholderIcon v-else /> */}
        </div>

        <h2 class="credits-item__name">{person.name}</h2>

        <div class="credits-item__character">{person.character}</div>
      </A>
    </div>
  );
}
