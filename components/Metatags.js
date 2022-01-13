import Head from 'next/head';

export default function Metatags({
  title = 'Personalized Halo Infinite Stats | StatShot',
  description = 'A next.js web app built to provide intelligent and dynamic halo infinite stats to players.',
  image = 'https://fireship.io/courses/react-next-firebase/img/featured.png',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@johnmasonwill" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={`${title} | StatShot`}/>
      <meta property="og:description" content={`${description} | StatShot`} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
