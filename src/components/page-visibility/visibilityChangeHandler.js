export default function (inst) {
  inst.setState(
    ({ visibilityState }) => ({ visibilityState: visibilityState.concat(document.visibilityState) }),
    () => {
      document.hidden
        ? inst.videoElement.pause()
        : inst.videoElement.play().catch(err => {debugger;});
    }
  );
}
