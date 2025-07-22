
import { useState } from 'react'

export default function BonusCalculator() {
  const [dealAmount, setDealAmount] = useState(5000)
  const [role, setRole] = useState('lead')
  const [mode, setMode] = useState('boost')
  const [daysSinceStart, setDaysSinceStart] = useState(20)
  const [upsell, setUpsell] = useState(0)
  const [retentionMonths, setRetentionMonths] = useState(0)
  const [knowledgeTop, setKnowledgeTop] = useState(false)

  const isWelcomePeriod = daysSinceStart <= 45

  let basePercent = 0

  if (role === 'lead') {
    basePercent = mode === 'boost' ? 10 : 5
    if (isWelcomePeriod) basePercent += mode === 'boost' ? 5 : 7
  }

  if (role === 'closer') {
    basePercent = mode === 'boost' ? 25 : 20
    if (isWelcomePeriod) basePercent += mode === 'boost' ? 5 : 5
  }

  if (role === 'intel') {
    basePercent = mode === 'boost' ? 7 : 5
  }

  let bonus = (dealAmount * basePercent) / 100

  if (upsell > 0) {
    const upsellPercent = mode === 'boost' ? 10 : 5
    bonus += (upsell * upsellPercent) / 100
  }

  if (retentionMonths >= 12) {
    const retentionPercent = mode === 'boost' ? 5 : 3
    bonus += (dealAmount * retentionPercent) / 100
  }

  if (knowledgeTop) {
    bonus += mode === 'boost' ? 500 : 200
  }

  const cap = mode === 'boost' ? 0.4 : 0.3
  const maxPayout = dealAmount * cap

  if (bonus > maxPayout) bonus = maxPayout

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl border">
      <h1 className="text-3xl font-semibold mb-6 text-indigo-800">Realytics Bonus Simulator</h1>

      <div className="space-y-4">
        <label className="block">
          Deal Amount ($):
          <input
            type="number"
            value={dealAmount}
            onChange={(e) => setDealAmount(Number(e.target.value))}
            className="border p-2 w-full mt-1 rounded"
          />
        </label>

        <label className="block">
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          >
            <option value="lead">Lead Provider</option>
            <option value="closer">Closer</option>
            <option value="intel">Deal Intelligence</option>
          </select>
        </label>

        <label className="block">
          Mode:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          >
            <option value="boost">Boost (до 12/2025)</option>
            <option value="steady">Steady (после 12/2025)</option>
          </select>
        </label>

        <label className="block">
          Days Since Start:
          <input
            type="number"
            value={daysSinceStart}
            onChange={(e) => setDaysSinceStart(Number(e.target.value))}
            className="border p-2 w-full mt-1 rounded"
          />
          <small>Welcome period = первые 45 дней</small>
        </label>

        <label className="block">
          Upsell Amount ($):
          <input
            type="number"
            value={upsell}
            onChange={(e) => setUpsell(Number(e.target.value))}
            className="border p-2 w-full mt-1 rounded"
          />
        </label>

        <label className="block">
          Retention Months:
          <input
            type="number"
            value={retentionMonths}
            onChange={(e) => setRetentionMonths(Number(e.target.value))}
            className="border p-2 w-full mt-1 rounded"
          />
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={knowledgeTop}
            onChange={(e) => setKnowledgeTop(e.target.checked)}
          />{' '}
          Top-10% Knowledge Contributor
        </label>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold">Your Bonus:</h2>
        <p className="text-2xl font-bold text-indigo-700">${bonus.toFixed(2)}</p>
        <small>Max payout cap: ${maxPayout.toFixed(2)}</small>
      </div>
    </div>
  )
}
