const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', async () => {

  const createYoutube = () => {
    return new Promise((resolve) => {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        const player = new YT.Player('player', {
          videoId: 'svFbZEhVVDg',
          events: {
            onReady: () => resolve(player)
          }
        });
      };
    });
  };

  const player = await createYoutube();

  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: '../../assets/targets/tarianSumazau.mind',
  });

  const { renderer, cssRenderer, cssScene, camera } = mindarThree;

  const obj = new CSS3DObject(document.querySelector("#ar-div"));

  const anchor = mindarThree.addCSSAnchor(0);
  anchor.group.add(obj);

  anchor.onTargetFound = () => player.playVideo();
  anchor.onTargetLost = () => player.pauseVideo();

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    cssRenderer.render(cssScene, camera);
  });

});
