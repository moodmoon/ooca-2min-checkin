let audio = null
let playing = false

// A light, playful original loop: gentle plucks + warm chords.
// Keep it quiet enough to sit behind the reflection experience.
const MUSIC_PATH = '/audio/ooca-uplift-loop.wav'

function getAudio() {
  if (!audio) {
    audio = new Audio(MUSIC_PATH)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.16
    audio.addEventListener('play', () => { playing = true })
    audio.addEventListener('pause', () => { playing = false })
    audio.addEventListener('ended', () => { playing = false })
  }
  return audio
}

export function isAmbientPlaying() {
  return playing
}

export async function toggleAmbientMusic() {
  const player = getAudio()

  if (playing) {
    player.pause()
    return false
  }

  try {
    await player.play()
    return true
  } catch (error) {
    console.warn('Ambient music could not start:', error)
    playing = false
    return false
  }
}

export function stopAmbientMusic() {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
  playing = false
}
