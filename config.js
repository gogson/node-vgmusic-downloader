//
//  Configuration
//

// VGMusic domain URL
var domain = 'http://www.vgmusic.com';

// Destination folder
var downloadFolder = './download';

// Pages to parse containing .mid links
var pages = [
  'music/console/nintendo/nes',
  'music/console/nintendo/gameboy',
  'music/console/nintendo/snes',
  'music/console/nintendo/n64',
  'music/console/nintendo/virtualboy',
  'music/console/nintendo/gba',
  'music/console/nintendo/gamecube',
  'music/console/nintendo/ds',
  'music/console/nintendo/3ds',
  'music/console/nintendo/wii',
  'music/console/nintendo/wiiu',
  // 'music/console/sega/master',
  // 'music/console/sega/gamegear',
  // 'music/console/sega/genesis',
  // 'music/console/sega/segacd',
  // 'music/console/sega/32x',
  // 'music/console/sega/saturn',
  // 'music/console/sega/dreamcast',
  // 'music/console/sony/ps1',
  // 'music/console/sony/ps2',
  // 'music/console/sony/ps3',
  // 'music/console/sony/ps4',
  // 'music/console/sony/psp',
  // 'music/console/microsoft/xbox',
  // 'music/console/microsoft/xbox360',
  // 'music/console/microsoft/xboxone',
  // 'music/console/nec/tg16',
  // 'music/console/nec/tduo',
  // 'music/console/nec/sgx',
  // 'music/console/nec/pcfx',
  // 'music/console/snk/neogeo',
  // 'music/console/snk/neogeopocket',
  // 'music/console/atari/2600',
  // 'music/console/atari/jaguar',
  // 'music/console/coleco/colecovision',
  // 'music/console/mattel/intellivision',
  // 'music/console/magnavox/odyssey2',
  // 'music/console/3do/3do',
  // 'music/console/philips/cd',
  // 'music/computer/commodore/commodore',
  // 'music/computer/microsoft/windows',
  // 'music/computer/tomy/tutor',
  // 'music/computer/miscellaneous/msx',
  // 'music/computer/atari/atari',
  // 'music/computer/commodore/amiga',
  // 'music/computer/amstrad/amstradcpc',
  // 'music/computer/apple/appleii',
  // 'music/computer/apple/macintosh',
  // 'music/computer/nec/pc98',
  // 'music/computer/sinclair/spectrum',
  // 'music/other/miscellaneous/arcade',
  // 'music/other/miscellaneous/medley',
  // 'music/other/miscellaneous/piano',
];

// Export configuration.
module.exports.domain = domain;
module.exports.pages = pages;
module.exports.downloadFolder = downloadFolder;
