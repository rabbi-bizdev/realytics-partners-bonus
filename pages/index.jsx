
import Head from 'next/head'
import BonusCalculator from '../components/BonusCalculator'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Realytics Bonus Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-white p-8">
        <BonusCalculator />
      </main>
    </div>
  )
}
