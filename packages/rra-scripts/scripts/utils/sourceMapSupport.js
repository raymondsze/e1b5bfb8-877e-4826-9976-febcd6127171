try {
  if (!global.__SOURCE_MAP_SUPPORT_VALIDATED__) {
    require("source-map-support").install({
      environment: 'node',
    });
  }
} catch (error) {
  console.log(
    'To provide a \x1b[32mbetter debugging experience\x1b[0m, \x1b[33msource-map-support\x1b[0m is required.\n' +
    'Please follow the instruction to ensure \x1b[33msource-map-support\x1b[0m is installed.\n\n' +
    'With \x1b[36myarn\x1b[0m\n' +
    '  \x1b[36myarn\x1b[0m add \x1b[33msource-map-support\x1b[0m\n' +
    'With \x1b[36mnpm\x1b[0m\n' +
    '  \x1b[36mnpm\x1b[0m i -S \x1b[33msource-map-support\x1b[0m\n'
  );
} finally {
  global.__SOURCE_MAP_SUPPORT_VALIDATED__ = true;
}