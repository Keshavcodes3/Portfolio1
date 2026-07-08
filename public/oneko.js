// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");
  let persistPosition = true;

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  // --- 🎀 CUTE PHYSICS & BLACK THEME CONFIGURATION ---
  const baseSpeed = 10;
  let currentSpeed = 0;
  let targetRotation = 0;
  let currentRotation = 0;
  let squashStretchY = 1;
  let squashStretchX = 1;

  // Custom interaction flags
  let greetCooldown = false;
  let isGreeting = false;
  let greetTimer = 0;
  const greetings = ["hello", "hihi", "nya", "mew", "hi"];
  // ---------------------------------------------------

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]],
  };

  // ✨ TICKLE & DANCE INTERACTION
  function sayHello() {
    if (greetCooldown) return;

    greetCooldown = true;
    isGreeting = true;
    greetTimer = 12; // Extended duration to let the tickle dance play out
    idleTime = 0;
    resetIdleAnimation();

    // Create a sleek, black-themed minimalist bubble
    const bubble = document.createElement("div");
    bubble.innerText = greetings[Math.floor(Math.random() * greetings.length)];
    bubble.style.position = "fixed";
    bubble.style.left = `${nekoPosX - 6}px`;
    bubble.style.top = `${nekoPosY - 32}px`;
    bubble.style.fontSize = "11px";
    bubble.style.fontWeight = "500";
    bubble.style.color = "#ffffff";
    bubble.style.backgroundColor = "#111111"; // Deep black background
    bubble.style.padding = "2px 8px";
    bubble.style.borderRadius = "6px";
    bubble.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    bubble.style.border = "1px solid #333333"; // Subtle dark border
    bubble.style.pointerEvents = "none";
    bubble.style.userSelect = "none";
    bubble.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    bubble.style.transform = "scale(0) translateY(6px)";
    bubble.style.fontFamily = "monospace, sans-serif";
    bubble.style.zIndex = 2147483647;

    document.body.appendChild(bubble);

    requestAnimationFrame(() => {
      bubble.style.transform = "scale(1) translateY(0px)";
    });

    // Fade out
    setTimeout(() => {
      bubble.style.transform = "translateY(-10px) scale(0.8)";
      bubble.style.opacity = "0";
      setTimeout(() => bubble.remove(), 400);
      greetCooldown = false;
    }, 1000);
  }

  function init() {
    let nekoFile = "./oneko.gif"
    const curScript = document.currentScript
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat
    }
    if (curScript && curScript.dataset.persistPosition) {
      if (curScript.dataset.persistPosition === "") {
        persistPosition = true;
      } else {
        persistPosition = JSON.parse(curScript.dataset.persistPosition.toLowerCase());
      }
    }

    if (persistPosition) {
      let storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
      if (storedNeko !== null) {
        nekoPosX = storedNeko.nekoPosX;
        nekoPosY = storedNeko.nekoPosY;
        mousePosX = storedNeko.mousePosX;
        mousePosY = storedNeko.mousePosY;
        frameCount = storedNeko.frameCount;
        idleTime = storedNeko.idleTime;
        idleAnimation = storedNeko.idleAnimation;
        idleAnimationFrame = storedNeko.idleAnimationFrame;
        nekoEl.style.backgroundPosition = storedNeko.bgPos;
      }
    }

    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "pointer";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;
    nekoEl.style.transition = "transform 0.05s linear"; // Snappier transition for rapid dance updates
    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    document.body.appendChild(nekoEl);

    nekoEl.addEventListener("click", sayHello);
    nekoEl.addEventListener("mouseenter", sayHello);

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    if (persistPosition) {
      window.addEventListener("beforeunload", function (event) {
        window.localStorage.setItem("oneko", JSON.stringify({
          nekoPosX: nekoPosX,
          nekoPosY: nekoPosY,
          mousePosX: mousePosX,
          mousePosY: mousePosY,
          frameCount: frameCount,
          idleTime: idleTime,
          idleAnimation: idleAnimation,
          idleAnimationFrame: idleAnimationFrame,
          bgPos: nekoEl.style.backgroundPosition
        }));
      });
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    if (!nekoEl.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 80) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    if (isGreeting) {
      // 🕺 TICKLE DANCE ANIMATION MATRIX
      // Cycles between scratching sprites rapidly to look like a joyful dance/wiggle
      const danceSprites = ["scratchSelf", "alert"];
      const currentDanceSprite = danceSprites[Math.floor(frameCount % danceSprites.length)];
      setSprite(currentDanceSprite, frameCount);

      // Fast, extreme vibrating rotation and hopping squash matrix
      currentRotation = Math.sin(frameCount * 1.5) * 22;
      squashStretchY = 1.1 + Math.sin(frameCount * 2.0) * 0.15;
      squashStretchX = 0.9 - Math.sin(frameCount * 2.0) * 0.15;

      const danceHopY = Math.sin(frameCount * 1.2) * 4 - 4; // Constant little bouncing off the floor

      nekoEl.style.transform = `translateY(${danceHopY}px) rotate(${currentRotation}deg) scale(${squashStretchX}, ${squashStretchY})`;

      greetTimer -= 1;
      if (greetTimer <= 0) isGreeting = false;
      return;
    }

    // Return to neutral layout when done dancing
    targetRotation = 0;
    currentRotation += (targetRotation - currentRotation) * 0.3;
    squashStretchX += (1 - squashStretchX) * 0.2;
    squashStretchY += (1 - squashStretchY) * 0.2;

    const breatheOffset = Math.sin(frameCount * 0.4) * 1.5;
    const idleTilt = Math.sin(frameCount * 0.2) * 3;
    nekoEl.style.transform = `translateY(${breatheOffset}px) rotate(${currentRotation + idleTilt}deg) scale(${squashStretchX}, ${squashStretchY})`;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) avalibleIdleAnimations.push("scratchWallW");
      if (nekoPosY < 32) avalibleIdleAnimations.push("scratchWallN");
      if (nekoPosX > window.innerWidth - 32) avalibleIdleAnimations.push("scratchWallE");
      if (nekoPosY > window.innerHeight - 32) avalibleIdleAnimations.push("scratchWallS");

      idleAnimation = avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < baseSpeed || distance < 48) {
      currentSpeed += (0 - currentSpeed) * 0.4;
      idle();
      return;
    }

    if (isGreeting) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);

      squashStretchY = 0.7;
      squashStretchX = 1.3;
      targetRotation = Math.sin(frameCount) * 15;
      currentRotation += (targetRotation - currentRotation) * 0.4;

      nekoEl.style.transform = `translateY(-12px) rotate(${currentRotation}deg) scale(${squashStretchX}, ${squashStretchY})`;

      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    currentSpeed += (baseSpeed - currentSpeed) * 0.25;

    nekoPosX -= (diffX / distance) * currentSpeed;
    nekoPosY -= (diffY / distance) * currentSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    const angleOfTravel = Math.atan2(-diffY, -diffX);
    targetRotation = Math.cos(angleOfTravel) * 12;
    currentRotation += (targetRotation - currentRotation) * 0.3;

    const hopWave = Math.abs(Math.sin(frameCount * 0.6));
    const runningHopY = -hopWave * 6;
    squashStretchY = 1 + (Math.sin(frameCount * 0.6) * 0.12);
    squashStretchX = 1 - (Math.sin(frameCount * 0.6) * 0.12);

    nekoEl.style.transform = `translateY(${runningHopY}px) rotate(${currentRotation}deg) scale(${squashStretchX}, ${squashStretchY})`;
  }

  init();
})();