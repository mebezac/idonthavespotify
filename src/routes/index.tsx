import { createSignal, onMount } from 'solid-js';
import { load, ReCaptchaInstance } from 'recaptcha-v3';

import type { SpotifyContent, Error } from '~/@types/global';

import SearchBar, { SearchForm } from '~/components/SearchBar';
import SearchCard from '~/components/SearchCard';

import fetchSpotifyContent from '~/server/rpc/spotifyContent';
import fetchSearchCount from '~/server/rpc/searchCount';

import * as ENV from '~/config/env/client';

export default function Home() {
  const [recaptcha, setRecaptcha] = createSignal<ReCaptchaInstance>();

  const [spotifyContent, setSpotifyContent] = createSignal<SpotifyContent | undefined>();
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | undefined>();

  const [searchCount, setSearchCount] = createSignal(0);

  onMount(async () => {
    const [recaptchaInstance, count] = await Promise.all([
      load(ENV.recaptcha.siteKey),
      fetchSearchCount(),
    ]);

    setRecaptcha(recaptchaInstance);
    setSearchCount(count);
  });

  const handleOnSearch = async (formData: SearchForm) => {
    setLoading(true);

    try {
      const token = await recaptcha()!.execute('submit');
      const response = await fetchSpotifyContent(formData.spotifyLink, token);

      setSpotifyContent(response);
      setSearchCount(searchCount() + 1);

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    } catch (err) {
      const { message } = err as Error;
      console.error(message);
      setError('Something went wrong, try again later');
    }

    setLoading(false);
  };

  return (
    <div class="bg-black text-white flex flex-col h-screen overflow-auto p-4">
      <main class="flex-1 flex flex-col justify-start items-center">
        <div class="text-center my-8 sm:my-16">
          <h1 class="text-6xl uppercase">I don't have spotify</h1>
          <h2 class="mt-6">Find Spotify content on YouTube, Apple Music, Tidal, SoundCloud and more.</h2>
        </div>
        <SearchBar onSearch={handleOnSearch} isLoading={loading()} />
        {loading() && <p class="mt-8">Loading...</p>}
        {error() && <p class="mt-8">{error()}</p>}
        {!loading() && !error() && spotifyContent() && <SearchCard spotifyContent={spotifyContent()!} />}
      </main>
      <footer class="text-center">
        <p class="text-sm">{'Queries performed: '}
          <span class="font-bold">{searchCount()}</span>
        </p>
        <p class="text-sm">{'Made with ❤️ by '}
          <a
            href="https://sjdonado.de"
            class="text-green-500 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Juan Rodriguez
          </a>
        </p>
      </footer>
    </div>
  );
}
