import React from 'react'

// Demonstrates useRef to access a <video> DOM element and call imperative methods
export default function UseCase72() {
  const videoRef = React.useRef(null)
  const rafRef = React.useRef(null)
  const [playing, setPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [muted, setMuted] = React.useState(false)
  const [volume, setVolume] = React.useState(1)

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return

    function onLoaded() {
      setDuration(v.duration || 0)
      setCurrentTime(v.currentTime || 0)
    }

    function onPlay() { setPlaying(true) }
    function onPause() { setPlaying(false) }

    v.addEventListener('loadedmetadata', onLoaded)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)

    return () => {
      v.removeEventListener('loadedmetadata', onLoaded)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  // Update currentTime using requestAnimationFrame while playing
  React.useEffect(() => {
    const tick = () => {
      const v = videoRef.current
      if (v) setCurrentTime(v.currentTime)
      rafRef.current = requestAnimationFrame(tick)
    }

    if (playing) rafRef.current = requestAnimationFrame(tick)
    else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [playing])

  const play = () => videoRef.current && videoRef.current.play()
  const pause = () => videoRef.current && videoRef.current.pause()
  const toggle = () => (playing ? pause() : play())
  const seek = (t) => { if (videoRef.current) videoRef.current.currentTime = Math.max(0, Math.min((videoRef.current.duration || 0), t)) }
  const onMute = (m) => { if (videoRef.current) videoRef.current.muted = m; setMuted(m) }
  const onVolume = (v) => { if (videoRef.current) videoRef.current.volume = v; setVolume(v) }

  const fmt = (s = 0) => {
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    const min = Math.floor(s / 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <div style={{ padding: 16, maxWidth: 760 }}>
      <h3 style={{ marginTop: 0 }}>useRef — Imperative access to a video element</h3>

      <p style={{ color: 'var(--muted, #555)' }}>
        This demo uses <code>useRef</code> to access the underlying DOM node of a <code>&lt;video&gt;</code> element
        and call imperative methods like <code>play()</code>, <code>pause()</code>, or set the currentTime.
      </p>

      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ borderRadius: 8, overflow: 'hidden', background: '#071029' }}>
          <video
            ref={videoRef}
            style={{ width: '100%', display: 'block' }}
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            controls={false}
            muted={muted}
            volume={volume}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={play} style={{ padding: '8px 12px' }}>Play</button>
          <button onClick={pause} style={{ padding: '8px 12px' }}>Pause</button>
          <button onClick={toggle} style={{ padding: '8px 12px' }}>{playing ? 'Pause' : 'Play'}</button>
          <button onClick={() => seek(0)} style={{ padding: '8px 12px' }}>Restart</button>
          <button onClick={() => seek((videoRef.current?.currentTime || 0) - 10)} style={{ padding: '8px 12px' }}>-10s</button>
          <button onClick={() => seek((videoRef.current?.currentTime || 0) + 10)} style={{ padding: '8px 12px' }}>+10s</button>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" checked={muted} onChange={e => onMute(e.target.checked)} /> Mute
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            Volume
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => onVolume(Number(e.target.value))} />
          </label>

          <div style={{ marginLeft: 'auto' }}>
            <small>{fmt(currentTime)} / {fmt(duration)}</small>
          </div>
        </div>

        <div style={{ fontSize: 13, color: 'var(--muted, #666)' }}>
          <strong>Notes:</strong> The component demonstrates an imperative pattern where a ref points at the DOM element.
          Remember to clean up any animation frames or listeners when the component unmounts.
        </div>
      </div>
    </div>
  )
}
