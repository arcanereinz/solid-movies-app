// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import 'nprogress/nprogress.css';
import './routes/layout.scss';
import './assets/css/global.scss';
import './root.css';
import { TheFooter } from '~/components/TheFooter';
import { TheNav } from '~/components/TheNav';
import { HydrationScript } from 'solid-js/web';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Solid Movies</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta
          name="description"
          content="sample solid-start solid-js movie site"
        />
        <HydrationScript />
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading</div>}>
            {/* <div class="mr-2 font-extrabold line-through decoration-red-500">test</div> */}
            <TheNav />
            <Routes>
              <FileRoutes />
            </Routes>
            <TheFooter />
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
