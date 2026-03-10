import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import benchmarkData from './data/benchmarks.json'
import './App.css'

const DEPTH_LABELS = {
  default: 'Default',
  '4096': '4K',
  '8192': '8K',
  '16384': '16K',
  '32768': '32K',
  '65536': '64K',
  '131072': '128K',
}

function getModelResults(model, backendId, depth) {
  if (depth === 'default') {
    return model.results[backendId] ?? null
  }
  return model.depth_results?.[backendId]?.[depth] ?? null
}

function App() {
  const [selectedBackends, setSelectedBackends] = useState(
    benchmarkData.backends.map((b) => b.id)
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [chartMetric, setChartMetric] = useState('pp512')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' })
  const [selectedDepth, setSelectedDepth] = useState('default')

  const toggleBackend = (id) => {
    setSelectedBackends((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev
        return prev.filter((b) => b !== id)
      }
      return [...prev, id]
    })
  }

  const activeBackends = benchmarkData.backends.filter((b) =>
    selectedBackends.includes(b.id)
  )

  const filteredModels = useMemo(() => {
    let models = benchmarkData.models.filter((m) => {
      const hasAnyResult = selectedBackends.some(
        (bid) => getModelResults(m, bid, selectedDepth) != null
      )
      const matchesSearch =
        !searchQuery ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.params.toLowerCase().includes(searchQuery.toLowerCase())
      return hasAnyResult && matchesSearch
    })

    if (sortConfig.key) {
      models = [...models].sort((a, b) => {
        const { backendId, metric } = parseSortKey(sortConfig.key)
        const aR = getModelResults(a, backendId, selectedDepth)
        const bR = getModelResults(b, backendId, selectedDepth)
        const aVal = aR?.[metric] ?? 0
        const bVal = bR?.[metric] ?? 0
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal
      })
    }

    return models
  }, [selectedBackends, searchQuery, sortConfig, selectedDepth])

  const parseSortKey = (key) => {
    const parts = key.split('__')
    return { backendId: parts[0], metric: parts[1] }
  }

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'desc' ? 'asc' : 'desc' }
      }
      return { key, direction: 'desc' }
    })
  }

  const getWinner = (model, metric) => {
    if (activeBackends.length < 2) return null
    let bestId = null
    let bestVal = -1
    for (const b of activeBackends) {
      const r = getModelResults(model, b.id, selectedDepth)
      const val = r?.[metric]
      if (val != null && val > bestVal) {
        bestVal = val
        bestId = b.id
      }
    }
    return bestId
  }

  const getDelta = (model, metric) => {
    if (activeBackends.length !== 2) return null
    const [a, b] = activeBackends
    const rA = getModelResults(model, a.id, selectedDepth)
    const rB = getModelResults(model, b.id, selectedDepth)
    const valA = rA?.[metric]
    const valB = rB?.[metric]
    if (valA == null || valB == null) return null
    return valA - valB
  }

  const maxChartVal = useMemo(() => {
    let max = 0
    for (const m of filteredModels) {
      for (const b of activeBackends) {
        const r = getModelResults(m, b.id, selectedDepth)
        const val = r?.[chartMetric] ?? 0
        if (val > max) max = val
      }
    }
    return max
  }, [filteredModels, activeBackends, chartMetric, selectedDepth])

  const multiBackend = activeBackends.length > 1

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <div>
              <motion.h1
                className="header-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Strix Halo
                <br />
                GPU Benchmarks
              </motion.h1>
              <motion.p
                className="header-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                llama-bench on AMD Ryzen AI Max+ 395 &middot; Models by{' '}
                <a href="https://huggingface.co/unsloth" target="_blank" rel="noopener noreferrer">
                  Unsloth
                </a>
              </motion.p>
            </div>
            <motion.div
              className="header-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="dot" />
              {benchmarkData.models.length} models &middot;{' '}
              {benchmarkData.backends.length} backends
            </motion.div>
          </div>

          {/* Backend info cards */}
          <div className="backend-info-cards">
            {activeBackends.map((b, i) => (
              <motion.div
                key={b.id}
                className="backend-info-card"
                style={{ '--card-color': b.color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: b.color,
                  }}
                />
                <div className="info-header">
                  <div
                    className="info-dot"
                    style={{ background: b.color, boxShadow: `0 0 10px ${b.color}` }}
                  />
                  <span className="info-name">{b.name}</span>
                </div>
                <div className="info-detail">
                  <span>OS:</span> {b.os}
                  <br />
                  <span>Kernel:</span> {b.kernel}
                </div>
              </motion.div>
            ))}
          </div>
        </header>

        {/* Filters */}
        <motion.div
          className="filters"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="filter-label">Backend</span>
          {benchmarkData.backends.map((b) => (
            <button
              key={b.id}
              className={`filter-chip ${selectedBackends.includes(b.id) ? 'active' : ''}`}
              onClick={() => toggleBackend(b.id)}
            >
              <span
                className="chip-dot"
                style={{
                  background: b.color,
                  boxShadow: selectedBackends.includes(b.id)
                    ? `0 0 8px ${b.color}`
                    : 'none',
                }}
              />
              {b.shortName}
            </button>
          ))}

          <div className="filter-divider" />

          <span className="filter-label">Context</span>
          {benchmarkData.depths.map((d) => (
            <button
              key={d}
              className={`filter-chip filter-chip--depth ${selectedDepth === d ? 'active' : ''}`}
              onClick={() => setSelectedDepth(d)}
            >
              {DEPTH_LABELS[d] || d}
            </button>
          ))}

          <div className="filter-divider" />

          <div className="model-search">
            <span className="search-icon">&gt;_</span>
            <input
              type="text"
              placeholder="Filter models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Depth info note */}
        {selectedDepth !== 'default' && (
          <motion.div
            className="depth-note"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            Showing results at context depth <strong>{Number(selectedDepth).toLocaleString()}</strong> tokens.
            Only models with depth benchmarks are shown.
          </motion.div>
        )}

        {/* Table */}
        <motion.div
          className="table-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <table className="bench-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Size</th>
                <th>Params</th>
                {activeBackends.map((b) => (
                  <th
                    key={`${b.id}-pp`}
                    className={`sortable ${sortConfig.key === `${b.id}__pp512` ? 'sorted' : ''}`}
                    onClick={() => handleSort(`${b.id}__pp512`)}
                  >
                    <div className="backend-header">
                      <span className="header-dot" style={{ background: b.color }} />
                      {multiBackend ? `${b.shortName} ` : ''}pp512
                      <span className="sort-arrow">
                        {sortConfig.key === `${b.id}__pp512`
                          ? sortConfig.direction === 'desc'
                            ? '\u25BC'
                            : '\u25B2'
                          : '\u25BC'}
                      </span>
                    </div>
                  </th>
                ))}
                {multiBackend && <th>{'Δ'} pp512</th>}
                {activeBackends.map((b) => (
                  <th
                    key={`${b.id}-tg`}
                    className={`sortable ${sortConfig.key === `${b.id}__tg128` ? 'sorted' : ''}`}
                    onClick={() => handleSort(`${b.id}__tg128`)}
                  >
                    <div className="backend-header">
                      <span className="header-dot" style={{ background: b.color }} />
                      {multiBackend ? `${b.shortName} ` : ''}tg128
                      <span className="sort-arrow">
                        {sortConfig.key === `${b.id}__tg128`
                          ? sortConfig.direction === 'desc'
                            ? '\u25BC'
                            : '\u25B2'
                          : '\u25BC'}
                      </span>
                    </div>
                  </th>
                ))}
                {multiBackend && <th>{'Δ'} tg128</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredModels.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3 + activeBackends.length * 2 + (multiBackend ? 2 : 0)}
                    >
                      <div className="empty-state">
                        <div className="empty-icon">:/</div>
                        <p>No models match your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredModels.map((model, i) => {
                    const ppWinner = getWinner(model, 'pp512')
                    const tgWinner = getWinner(model, 'tg128')
                    const ppDelta = getDelta(model, 'pp512')
                    const tgDelta = getDelta(model, 'tg128')

                    return (
                      <motion.tr
                        key={model.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.03 }}
                        layout
                      >
                        <td>
                          <div className="model-cell">
                            <span className="model-name">{model.name}</span>
                            <span className="model-meta">{model.file}</span>
                          </div>
                        </td>
                        <td>
                          <span className="model-meta">{model.size}</span>
                        </td>
                        <td>
                          <span className="model-meta">{model.params}</span>
                        </td>

                        {/* pp512 scores */}
                        {activeBackends.map((b) => {
                          const r = getModelResults(model, b.id, selectedDepth)
                          const isWinner = multiBackend && ppWinner === b.id
                          return (
                            <td
                              key={`${b.id}-pp`}
                              className={`score-cell ${isWinner ? 'winner' : ''}`}
                            >
                              {r ? (
                                <>
                                  <span
                                    className="score-value"
                                    style={isWinner ? { color: '#69f0ae' } : {}}
                                  >
                                    {r.pp512.toFixed(2)}
                                  </span>
                                  <span className="score-std">
                                    {'±'}{r.pp512_std.toFixed(2)}
                                  </span>
                                  {isWinner && (
                                    <span
                                      className="winner-badge"
                                      style={{
                                        background: '#69f0ae',
                                        color: '#0a0a0f',
                                      }}
                                    >
                                      W
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="score-std">&mdash;</span>
                              )}
                            </td>
                          )
                        })}
                        {multiBackend && (
                          <td className="delta-cell">
                            {ppDelta != null ? (
                              <DeltaValue
                                value={ppDelta}
                                label={activeBackends[0].shortName}
                              />
                            ) : (
                              '\u2014'
                            )}
                          </td>
                        )}

                        {/* tg128 scores */}
                        {activeBackends.map((b) => {
                          const r = getModelResults(model, b.id, selectedDepth)
                          const isWinner = multiBackend && tgWinner === b.id
                          return (
                            <td
                              key={`${b.id}-tg`}
                              className={`score-cell ${isWinner ? 'winner' : ''}`}
                            >
                              {r ? (
                                <>
                                  <span
                                    className="score-value"
                                    style={isWinner ? { color: '#69f0ae' } : {}}
                                  >
                                    {r.tg128.toFixed(2)}
                                  </span>
                                  <span className="score-std">
                                    {'±'}{r.tg128_std.toFixed(2)}
                                  </span>
                                  {isWinner && (
                                    <span
                                      className="winner-badge"
                                      style={{
                                        background: '#69f0ae',
                                        color: '#0a0a0f',
                                      }}
                                    >
                                      W
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="score-std">&mdash;</span>
                              )}
                            </td>
                          )
                        })}
                        {multiBackend && (
                          <td className="delta-cell">
                            {tgDelta != null ? (
                              <DeltaValue
                                value={tgDelta}
                                label={activeBackends[0].shortName}
                              />
                            ) : (
                              '\u2014'
                            )}
                          </td>
                        )}
                      </motion.tr>
                    )
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="chart-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="section-title">Visual Comparison</h2>
          <p className="section-subtitle">
            tokens per second across models
            {selectedDepth !== 'default' && ` @ ${Number(selectedDepth).toLocaleString()} context`}
          </p>

          <div className="chart-toggle">
            <button
              className={chartMetric === 'pp512' ? 'active' : ''}
              onClick={() => setChartMetric('pp512')}
            >
              pp512 (prompt)
            </button>
            <button
              className={chartMetric === 'tg128' ? 'active' : ''}
              onClick={() => setChartMetric('tg128')}
            >
              tg128 (generation)
            </button>
          </div>

          <div className="chart-container">
            <div className="bar-chart">
              {filteredModels.map((model) => {
                const winner = getWinner(model, chartMetric)
                return (
                  <div key={model.name} className="bar-group">
                    <div className="bar-group-label">{model.name}</div>
                    {activeBackends.map((b) => {
                      const r = getModelResults(model, b.id, selectedDepth)
                      const val = r?.[chartMetric] ?? 0
                      const pct = maxChartVal > 0 ? (val / maxChartVal) * 100 : 0
                      const isWinner = multiBackend && winner === b.id
                      return (
                        <div key={b.id} className="bar-row">
                          <span className="bar-backend-label">{b.shortName}</span>
                          <div className="bar-track">
                            <motion.div
                              className="bar-fill"
                              style={{
                                background: `linear-gradient(90deg, ${b.color}cc, ${b.color}88)`,
                                boxShadow: isWinner
                                  ? `0 0 20px ${b.color}40`
                                  : 'none',
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{
                                duration: 0.8,
                                delay: 0.1,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          </div>
                          <span
                            className={`bar-value ${isWinner ? 'is-winner' : ''}`}
                          >
                            {val.toFixed(1)} t/s
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="footer">
          Strix Halo GPU Benchmarks &middot; llama-bench &middot;{' '}
          <a href="https://przbadu.dev" target="_blank" rel="noopener noreferrer">
            przbadu.dev
          </a>
          {' '}&middot;{' '}
          <a href="https://github.com/przbadu" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </div>
  )
}

function DeltaValue({ value, label }) {
  const abs = Math.abs(value)
  if (abs < 0.01) {
    return <span className="delta-neutral">~0</span>
  }
  const isPositive = value > 0
  return (
    <span className={isPositive ? 'delta-positive' : 'delta-negative'}>
      {isPositive ? '+' : '-'}
      {abs.toFixed(2)}
    </span>
  )
}

export default App
