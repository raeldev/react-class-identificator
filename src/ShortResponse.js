const identifyClasses = (classList) => {
  if (!classList) return [];

  return classList.map((c) => {
    let leftNumberOfMinutes = Math.floor(c.startMinute / 10);
    if (leftNumberOfMinutes % 2 !== 0) {
      return c;
    }
  });
};
