import Head from 'next/head'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import Featured from '../components/Featured'
import Overview from '../components/Overview'
import Subscribe from '../components/Subscribe'


export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Daily Commissions</title>
        <meta name="description" content="A Platform To Nourish Creativity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner></Banner>
      <Overview></Overview>
      <Featured></Featured>
      <Categories></Categories>
      <Subscribe></Subscribe>
    </div>
  )
}
