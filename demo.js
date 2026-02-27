if (process.argv.includes('--test-screen')) {
  const blessed = require('blessed');
  const screen = blessed.screen({
    smartCSR: true,
    title: 'Test Screen'
  });
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '20%',
    content: 'New Screen',
    tags: true,
    border: { type: 'line' }
  });
  screen.append(box);
  screen.render();
  screen.key(['q', 'C-c'], () => process.exit(0));
  return;
}
const blessed = require('blessed')

// Dynamically import chalk
let chalk
let blinkInterval = null
let blinkOn = false
const { diagrams } = require('./diagrams');

(async () => {
  const chalkImport = await import('chalk');
  chalk = chalkImport.default || chalkImport;
  startDemo();
})()

function startDemo() {
  let diagramIndex = 0;
  let hashLineIndex = null;
  const screen = blessed.screen({
    smartCSR: true,
    title: 'STP Terminal Demo'
  })

  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '90%',
    height: '90%',
    content: '',
    tags: true,
    border: { type: 'line' }
  })

  function colorize(line, replacements = []) {
  if (!chalk) return line

  replacements.forEach(({ pattern, style }) => {
    line = line.replace(pattern, match => style(match))
  })

  return line
}

function startBlinking() {
  if (blinkInterval) return

  blinkInterval = setInterval(() => {
    blinkOn = !blinkOn
    showHashLine()
  }, 500)
}

function stopBlinking() {
  if (blinkInterval) {
    clearInterval(blinkInterval)
    blinkInterval = null
  }
  blinkOn = false
}

  // Color lines starting with # in cyan
function colorDiagram(diagram, hashLineIndex = 0) {
  let lines = diagram.split('\n').map(line => {
    if (!chalk) return line

    // Always color #
    line = colorize(line, [
      { pattern: /#/g, style: chalk.cyan }
    ])

    // Diagram Index 1
    if (diagramIndex === 1) {
      if (hashLineIndex === 1) {
        line = colorize(line, [
          { pattern: / A /g, style: chalk.bgGreen.black },
          { pattern: / B /g, style: chalk.bgGreen.black },
          { pattern: / C /g, style: chalk.bgGreen.black },
          { pattern: / D /g, style: chalk.bgGreen.black }
        ])
      }

      if (hashLineIndex === 2) {
        const blink = match => {
          if (!blinkOn) return match
          return chalk.bgGreen.black(match)
        }

        line = line.replace(/ A /g, blink)
        line = line.replace(/ B /g, blink)
        line = line.replace(/ C /g, blink)
        line = line.replace(/ D /g, blink)
      }

      if (hashLineIndex === 3) {
        line = colorize(line, [
          { pattern: /SWITCH(?:\s*\(\d+\)|\s+\d+)/gi, style: chalk.bgGreen.black }
        ])
      }

      if (hashLineIndex === 4 || hashLineIndex === 6) {
        line = colorize(line, [
          { pattern: /SWITCH(?:\s*\(\d+\)|\s+\d+)/gi, style: chalk.bgGreen.black },
          { pattern: / A /g, style: chalk.bgGreen.black },
          { pattern: / B /g, style: chalk.bgGreen.black },
          { pattern: / C /g, style: chalk.bgGreen.black },
          { pattern: / D /g, style: chalk.bgGreen.black }
        ])
      }

      if (hashLineIndex === 5) {
        const blink = match => {
          if (!blinkOn) return match
          return chalk.bgRed.black(match)
        }
        line = line.replace(/SWITCH(?:\s*\(\d+\)|\s+\d+)/gi, blink)
        line = colorize(line, [
          { pattern: / A /g, style: chalk.bgGreen.black }
        ])
      }
    }

    // Diagram Index 2
    else if (diagramIndex === 2) {
      if (hashLineIndex === 0) {
        line = colorize(line, [
          { pattern: /SWITCH 1/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 2/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 3/g, style: chalk.bgGreen.black }
        ])
      }
      if (hashLineIndex === 1 || hashLineIndex === 2) {
        const blink = match => {
          if (!blinkOn) return match
          return chalk.bgYellow.black(match)
        }
        line = line.replace(/(?<=│)BPDUs(?=│)/g, blink)
      }
      if (hashLineIndex === 3) {
        line = colorize(line, [
          { pattern: /SWITCH 3/g, style: chalk.bgYellow.black }
        ])
      }
    }

    // Diagram Index 3
    else if (diagramIndex === 3) {
      if (hashLineIndex === 0) {
        line = colorize(line, [
          { pattern: /SWITCH 3/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 1/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 2/g, style: chalk.bgGreen.black },
          { pattern: /RB/g, style: chalk.yellow }
        ])
      }

      if (hashLineIndex === 1) {
        line = colorize(line, [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /00:1B:54:8A:00:03/g, style: chalk.bgGreen.black },
          { pattern: /00:1B:54:8A:00:02/g, style: chalk.bgGreen.black },
          { pattern: /00:1B:54:8A:00:01/g, style: chalk.bgGreen.black },
          { pattern: /24576/g, style: chalk.bgGreen.black },
          { pattern: / 32768 /g, style: chalk.bgGreen.black }
        ])
      }

      if (hashLineIndex === 2) {
        line = colorize(line, [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /24576/g, style: chalk.bgYellow.black },
          { pattern: / 32768 /g, style: chalk.bgRed.black },
        ])
      }
      if (hashLineIndex === 3) {
        line = colorize(line, [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /24576/g, style: chalk.bgYellow.black },
          { pattern: /03/g, style: chalk.bgRed.black },
          { pattern: /02/g, style: chalk.bgRed.black },
          { pattern: /01/g, style: chalk.bgGreen.black },
        ])
      }
      if (hashLineIndex === 4) {
        line = colorize(line, [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /00:1B:54:8A:00:03/g, style: chalk.bgRed.black },
          { pattern: /00:1B:54:8A:00:02/g, style: chalk.bgRed.black },
          { pattern: /00:1B:54:8A:00:01/g, style: chalk.bgGreen.black },
        ])
      }
      if (hashLineIndex === 5) {
        line = colorize(line, [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /SWITCH 3/g, style: chalk.bgYellow.black },
        ])
      }
    }

    // Diagram Index 4
    else if (diagramIndex === 4) {
      if (hashLineIndex === 0) {
        line = colorize(line, [
          { pattern: /RP/g, style: chalk.bgGreen.black }
        ])
      }

      if (hashLineIndex === 1) {
        line = colorize(line, [
          { pattern: /RP/g, style: chalk.bgGreen.black },
          { pattern: /PATH COST/g, style: chalk.bgYellow.black },
          { pattern: /10 Gbps = 2/g, style: chalk.yellow },
          { pattern: /1 Gbps = 4/g, style: chalk.yellow },
          { pattern: /100 Mbps = 19/g, style: chalk.yellow },
          { pattern: /10 Mbps = 100/g, style: chalk.yellow },
          { pattern: /1 Gbps(?!\s*=\s*\d+)/g, style: chalk.bgYellow.black },
          { pattern: /100 Mbps(?!\s*=\s*\d+)/g, style: chalk.bgYellow.black }
        ])
      }

      if (hashLineIndex === 2) {
        line = colorize(line, [
          { pattern: /DP/g, style: chalk.bgBlue.black }
        ])
      }

      if (hashLineIndex === 3) {
        line = colorize(line, [
          { pattern: /(?<=\(|─)BP(?=\)|─)/g, style: chalk.bgRed.black }
        ])
      }

      if (hashLineIndex === 4) {
        line = colorize(line, [
          { pattern: /DP/g, style: chalk.bgBlue.black },
          { pattern: /RP/g, style: chalk.bgGreen.black },
          { pattern: /(?<=\(|─)BP(?=\)|─)/g, style: chalk.bgRed.black }
        ])
      }
    }

    return line
  })


  let wordsToBold = [];
  if (diagramIndex === 0) {
    wordsToBold = [
      '| Terminal-based presentation on Spanning Tree Protocol (STP) |'
    ];
  } else if (diagramIndex === 1) {
    wordsToBold = [
      'topology', 
      'MAC addresses', 
      'Broadcast Signal', 
      'Broadcast Frame', 
      '(port)', 
      'Local Area Network (LAN)', 
      'loops', 'Broadcast Storm', 
      'Spanning Tree Protocol (STP)',
      'ARP (Address Resolution Protocol) Request',
    ];
  } else if (diagramIndex === 2) {
    wordsToBold = [
      'Bridge Protocol Data Units (BPDUs)', 
      'root bridge',
      'Hello Time',
      'Forward Delay',
      'Max Age',
    ];
  } else if (diagramIndex === 3) {
    wordsToBold = [
      'Bridge ID', 
      'priority',
      'NOT',
    ];
  } else if (diagramIndex === 4) {
    wordsToBold = [
      'root port (RP)',
      'Path cost',
      'designated port (DP)',
      'blocked port (BP)',
    ];
  } else if (diagramIndex === 5) {
    wordsToBold = [
      "| At least I think they're fun... don't @ me |",
      'Dr. Radia Perlman',
      'An Anlogrithm for Distributed Computation of a Spanning Tree in an Extended LAN',
      '1985',
      '1991',
      '1990',
      '2003',
      'standerdized',
      'IEEE 802.1D',
      'Rapid Spanning Tree Protocol',
      'IEEE 802.1w',
      'RSTP',
      'MSTP'
    ];
  }
  if (wordsToBold.length > 0) {
    const text = lines.join('\n');
    const bolded = boldWords(text, wordsToBold);
    return bolded;
  }
  return lines.join('\n');
}
  let diagramContent = colorDiagram(diagrams[diagramIndex], hashLineIndex);
  let hashLines = diagrams[diagramIndex].split('\n').filter(line => line.trim().startsWith('#'));
  let showHashLine = () => {
    if (hashLines.length === 0 || hashLineIndex === null) {
      box.setContent(diagramContent);
    } else {
      // Render diagram, but preserve original coloring for all lines
      const lines = diagrams[diagramIndex].split('\n');
      const coloredLines = colorDiagram(diagrams[diagramIndex], hashLineIndex).split('\n');
      const rendered = lines.map((line, idx) => {
        if (line.trim().startsWith('#')) {
          if (line === hashLines[hashLineIndex]) {
            // Highlight the current # line (overlay cyan on top of original coloring)
            return chalk ? chalk.bgBlue(coloredLines[idx]) : coloredLines[idx];
          } else {
            // Dim other # lines but keep their coloring
            return chalk ? chalk.dim(coloredLines[idx]) : coloredLines[idx];
          }
        }
        return coloredLines[idx];
      }).join('\n');
      box.setContent(rendered);
    }
    screen.render();
  };
  box.setContent(diagramContent);
  screen.append(box);
  screen.render();

  screen.key(['tab'], () => {
    if (diagramIndex < 6 ) {
      diagramIndex++;
    }
    hashLineIndex = null;
    diagramContent = colorDiagram(diagrams[diagramIndex], hashLineIndex);
    hashLines = diagrams[diagramIndex].split('\n').filter(line => line.trim().startsWith('#'));
    box.setContent(diagramContent);
    screen.render();
    stopBlinking()
  });
    // Backspace: show previous diagram
    screen.key(['backspace'], () => {
      if (diagramIndex > 0) {
        diagramIndex--;
      }
      hashLineIndex = null;
      diagramContent = colorDiagram(diagrams[diagramIndex], hashLineIndex);
      hashLines = diagrams[diagramIndex].split('\n').filter(line => line.trim().startsWith('#'));
      box.setContent(diagramContent);
      screen.render();
      stopBlinking();
    });

  // On z, show only the current # line
  screen.key(['z'], () => {
    if (hashLines.length === 0) return;
    if (hashLineIndex === null) {
      hashLineIndex = 0;
    } else {
      hashLineIndex = (hashLineIndex + 1) % hashLines.length;
    }
    showHashLine();
    startBlinking()
  });


  screen.key(['C-c'], () => process.exit(0))
}


// boldWords now processes the whole text and bolds only the first occurrence of each word in the entire text
function boldWords(text, words) {
  // Escape regex special chars and sort words by length descending to avoid substrings overriding
  const escapedWords = words
    .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length) // longer words first

  const seen = new Set()
  const regex = new RegExp(escapedWords.join('|'), 'gi')

  let replaced = false
  return text.replace(regex, match => {
    const lower = match.toLowerCase()
    if (seen.has(lower)) return match // already bolded
    seen.add(lower)
    replaced = true
    return chalk.bold(match)
  })
}