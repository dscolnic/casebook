import { Game } from './core/Game.js';

/**
 * Entry point. Boots the Game orchestrator once the DOM is ready and surfaces any
 * fatal init error to the loading panel instead of a blank screen.
 */
async function boot() {
  try {
    const game = new Game();
    await game.init();
  } catch (err) {
    console.error('[DeepWatch] fatal init error', err);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.hidden = false;
      loading.querySelector('.loading-panel').textContent = 'Failed to dive — see console.';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
