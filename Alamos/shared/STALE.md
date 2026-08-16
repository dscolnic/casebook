# shared/engine is stale — use ../gamekit instead

This directory is an old snapshot: nothing imports it, its `npcs.js` predates
the rig rewrite (243 lines vs 600+) and its `world.js` is the original Los
Alamos world. Keeping it invites edits that go nowhere.

The maintained engine is `../gamekit/engine`, with `../gamekit/THEME_CONTRACT.md`
describing the interface. Safe to delete this directory once you are happy.
