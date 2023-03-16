<template>
  <div class="about">
    <h1>My Opinion</h1>
    <p>A website, where everyone can share their opinion about... Stuff.</p>
    <p>Created as an university project, utilizing Vue with PHP backend.</p>
    <h2>Links</h2>
    <div class="buttons-container">
      <a href="https://github.com/Athlon007/myopinion-vue" target="_blank">
        <button>GitHub</button>
      </a>
      <a href="http://kfigura.nl" target="_blank">
        <button>Author</button>
      </a>
    </div>
    <h2>Libraries</h2>
    <ul>
      <li><a href="https://vuejs.org/" target="_blank">Vue</a></li>
      <li><a href="https://router.vuejs.org/" target="_blank">Vue Router</a></li>
      <li><a href="https://www.getpapercss.com/" target="_blank">Paper</a></li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }

  .buttons-container {
    display: flex;
    justify-content: center;
  }

  .buttons-container a {
    margin: 0 1rem;
  }
}
</style>
