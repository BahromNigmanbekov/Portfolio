import gsap from 'gsap';

/**
 * rig    -> the whole assembly (strap + hardware + card), rotates from the top pivot
 * strap  -> the lanyard strap itself, kept fully opaque/visible through the whole drop
 * bgText -> text sitting behind the badge, revealed once the badge has landed and settled
 * line1  -> vivid orange path, drawn LEFT -> RIGHT while the badge falls
 * line2  -> deep burnt-orange path, drawn RIGHT -> LEFT while the badge falls (interlocks with line1)
 */
export const initBadgeAnimation = (rig, strap, bgText, line1, line2) => {
  gsap.set(rig, { transformOrigin: 'top center' });
  if (strap) gsap.set(strap, { opacity: 1 }); // never fade the cord — stays clearly visible
  if (bgText) gsap.set(bgText, { opacity: 0, y: 30, scale: 0.96 }); // hidden until the badge settles

  // Each path is authored in the direction it should visually draw:
  // line1's `d` runs left->right, line2's `d` runs right->left — so the
  // same dashoffset technique naturally animates each in its own direction.
  [line1, line2].forEach((path) => {
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  });

  const tl = gsap.timeline();

  // 1. Drop down from above the frame, cord trailing and visible the whole way
  tl.fromTo(
    rig,
    { y: -680, rotation: -8, opacity: 1 },
    { y: 0, rotation: 0, duration: 1.8, ease: 'bounce.out' }
  );

  // 1b. At the exact same moment the badge starts falling, draw both lines —
  //     line1 left -> right, line2 right -> left, finishing together as the badge lands
  if (line1) tl.to(line1, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0);
  if (line2) tl.to(line2, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0);

  tl
    // 2. Big swing on landing
    .to(rig, { rotation: 12, duration: 1.1, ease: 'power2.out' })
    .to(rig, { rotation: -6, duration: 1, ease: 'power1.inOut' })
    .to(rig, { rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.35)' });

  // 3. Background text fades/rises in only once the swing has settled down
  if (bgText) {
    tl.to(
      bgText,
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.6' // start slightly before the very last wobble finishes, feels connected
    );
  }

  // 4. Endless slow pendulum drift once everything is settled
  gsap.to(rig, {
    rotation: 2.5,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: tl.duration(),
  });

  return tl;
};