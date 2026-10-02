// ==========================================================================
// GLE Quotation Studio - 1-Item Edition Application Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const toggleEditBtn = document.getElementById('toggleEditBtn');
  const editBtnText = document.getElementById('editBtnText');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentThemeName = document.getElementById('currentThemeName');
  const resetBtn = document.getElementById('resetBtn');
  const printBtn = document.getElementById('printBtn');
  const quotationDoc = document.getElementById('quotationDoc');

  // State
  let isEditing = false;
  const themes = [
    { id: 'theme-emerald', name: 'Emerald Luxury' },
    { id: 'theme-slate', name: 'Modern Slate' },
    { id: 'theme-minimal', name: 'Clean Minimal' }
  ];
  let currentThemeIndex = 0;

  // Toggle Edit Mode
  function setEditMode(enable) {
    isEditing = enable;
    document.body.classList.toggle('is-editing', isEditing);
    toggleEditBtn.classList.toggle('active', isEditing);
    editBtnText.textContent = isEditing ? 'Done Editing' : 'Edit Mode';

    const editables = quotationDoc.querySelectorAll('[contenteditable]');
    editables.forEach(el => {
      el.setAttribute('contenteditable', isEditing ? 'true' : 'false');
    });

    if (!isEditing) {
      saveContent();
    }
  }

  if (toggleEditBtn) {
    toggleEditBtn.addEventListener('click', () => {
      setEditMode(!isEditing);
    });
  }

  // Cycle Themes
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      quotationDoc.classList.remove(themes[currentThemeIndex].id);
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const nextTheme = themes[currentThemeIndex];
      quotationDoc.classList.add(nextTheme.id);
      currentThemeName.textContent = nextTheme.name;
      localStorage.setItem('gle_quotation_1_theme', nextTheme.id);
    });
  }

  // Text Gap & Spacing Controls
  const spacingMenuBtn = document.getElementById('spacingMenuBtn');
  const spacingPopover = document.getElementById('spacingPopover');
  const closeSpacingBtn = document.getElementById('closeSpacingBtn');
  const wordSpacingSlider = document.getElementById('wordSpacingSlider');
  const lineHeightSlider = document.getElementById('lineHeightSlider');
  const letterSpacingSlider = document.getElementById('letterSpacingSlider');
  const wordGapVal = document.getElementById('wordGapVal');
  const lineHeightVal = document.getElementById('lineHeightVal');
  const letterGapVal = document.getElementById('letterGapVal');
  const currentGapLabel = document.getElementById('currentGapLabel');
  const presetPills = document.querySelectorAll('.preset-pill');

  const spacingPresets = {
    compact: { word: 0.01, line: 1.45, letter: 0.00, label: 'Tight' },
    normal: { word: 0.06, line: 1.62, letter: 0.01, label: 'Normal' },
    spacious: { word: 0.12, line: 1.75, letter: 0.02, label: 'Spacious' },
    wide: { word: 0.20, line: 1.95, letter: 0.03, label: 'Wide' }
  };

  function applySpacing(word, line, letter, label = 'Custom') {
    quotationDoc.style.setProperty('--text-word-spacing', `${word}em`);
    quotationDoc.style.setProperty('--text-line-height', line);
    quotationDoc.style.setProperty('--text-letter-spacing', `${letter}em`);

    if (wordSpacingSlider) wordSpacingSlider.value = word;
    if (lineHeightSlider) lineHeightSlider.value = line;
    if (letterSpacingSlider) letterSpacingSlider.value = letter;

    if (wordGapVal) wordGapVal.textContent = `${word}em`;
    if (lineHeightVal) lineHeightVal.textContent = line;
    if (letterGapVal) letterGapVal.textContent = `${letter}em`;
    if (currentGapLabel) currentGapLabel.textContent = label;

    presetPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-preset') === label.toLowerCase());
    });

    localStorage.setItem('gle_text_spacing_1', JSON.stringify({ word, line, letter, label }));
  }

  if (spacingMenuBtn && spacingPopover) {
    spacingMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      spacingPopover.classList.toggle('open');
    });

    if (closeSpacingBtn) {
      closeSpacingBtn.addEventListener('click', () => {
        spacingPopover.classList.remove('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (!spacingPopover.contains(e.target) && !spacingMenuBtn.contains(e.target)) {
        spacingPopover.classList.remove('open');
      }
    });

    if (wordSpacingSlider) {
      wordSpacingSlider.addEventListener('input', () => {
        applySpacing(parseFloat(wordSpacingSlider.value), parseFloat(lineHeightSlider.value), parseFloat(letterSpacingSlider.value), 'Custom');
      });
    }

    if (lineHeightSlider) {
      lineHeightSlider.addEventListener('input', () => {
        applySpacing(parseFloat(wordSpacingSlider.value), parseFloat(lineHeightSlider.value), parseFloat(letterSpacingSlider.value), 'Custom');
      });
    }

    if (letterSpacingSlider) {
      letterSpacingSlider.addEventListener('input', () => {
        applySpacing(parseFloat(wordSpacingSlider.value), parseFloat(lineHeightSlider.value), parseFloat(letterSpacingSlider.value), 'Custom');
      });
    }

    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const pKey = pill.getAttribute('data-preset');
        if (spacingPresets[pKey]) {
          const cfg = spacingPresets[pKey];
          applySpacing(cfg.word, cfg.line, cfg.letter, cfg.label);
        }
      });
    });
  }

  // Bold Text Controls
  const boldToggleBtn = document.getElementById('boldToggleBtn');
  const boldStatusLabel = document.getElementById('boldStatusLabel');
  const textWeightVal = document.getElementById('textWeightVal');
  const weightPills = document.querySelectorAll('.weight-pill');

  let currentWeight = 'normal';

  function applyWeight(weightKey) {
    currentWeight = weightKey;
    quotationDoc.classList.remove('text-weight-medium', 'text-weight-semibold', 'text-weight-bold');

    if (weightKey !== 'normal') {
      quotationDoc.classList.add(`text-weight-${weightKey}`);
    }

    weightPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-weight') === weightKey);
    });

    const labelMap = {
      normal: 'Regular',
      medium: 'Medium',
      semibold: 'Semi-Bold',
      bold: 'Bold'
    };

    if (textWeightVal) textWeightVal.textContent = labelMap[weightKey] || 'Regular';
    if (boldStatusLabel) boldStatusLabel.textContent = (weightKey === 'bold' ? 'ON' : (weightKey === 'semibold' ? 'Semi' : 'OFF'));
    if (boldToggleBtn) boldToggleBtn.classList.toggle('active', weightKey === 'bold' || weightKey === 'semibold');

    localStorage.setItem('gle_text_weight_1', weightKey);
  }

  if (boldToggleBtn) {
    boldToggleBtn.addEventListener('click', () => {
      const selection = window.getSelection();
      if (isEditing && selection && selection.toString().trim().length > 0) {
        document.execCommand('bold', false, null);
        saveContent();
        return;
      }

      const nextWeight = (currentWeight === 'bold' || currentWeight === 'semibold') ? 'normal' : 'bold';
      applyWeight(nextWeight);
    });
  }

  weightPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const wKey = pill.getAttribute('data-weight');
      applyWeight(wKey);
    });
  });

  // Print / Save PDF
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      if (isEditing) {
        setEditMode(false);
      }
      window.print();
    });
  }

  // Reset to original data
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all edits to the original quotation?')) {
        localStorage.removeItem('gle_quotation_1_data');
        localStorage.removeItem('gle_quotation_1_theme');
        localStorage.removeItem('gle_text_spacing_1');
        localStorage.removeItem('gle_text_weight_1');
        location.reload();
      }
    });
  }

  // Local Storage Save / Load
  function saveContent() {
    const data = {};
    const editables = quotationDoc.querySelectorAll('[data-key]');
    editables.forEach(el => {
      const key = el.getAttribute('data-key');
      data[key] = el.innerHTML;
    });
    localStorage.setItem('gle_quotation_1_data', JSON.stringify(data));
  }

  function loadSavedContent() {
    try {
      const savedTheme = localStorage.getItem('gle_quotation_1_theme');
      if (savedTheme) {
        const foundIndex = themes.findIndex(t => t.id === savedTheme);
        if (foundIndex !== -1) {
          quotationDoc.classList.remove(themes[currentThemeIndex].id);
          currentThemeIndex = foundIndex;
          quotationDoc.classList.add(themes[currentThemeIndex].id);
          if (currentThemeName) currentThemeName.textContent = themes[currentThemeIndex].name;
        }
      }

      const raw = localStorage.getItem('gle_quotation_1_data');
      if (raw) {
        const data = JSON.parse(raw);
        for (const [key, val] of Object.entries(data)) {
          const el = quotationDoc.querySelector(`[data-key="${key}"]`);
          if (el) {
            el.innerHTML = val;
          }
        }
      }

      const savedSpacing = localStorage.getItem('gle_text_spacing_1');
      if (savedSpacing) {
        const sp = JSON.parse(savedSpacing);
        applySpacing(sp.word, sp.line, sp.letter, sp.label || 'Custom');
      }

      const savedWeight = localStorage.getItem('gle_text_weight_1');
      if (savedWeight) {
        applyWeight(savedWeight);
      }
    } catch (e) {
      console.error('Error loading stored content:', e);
    }
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Ctrl + P or Cmd + P
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      if (isEditing) setEditMode(false);
      window.print();
    }
    // Ctrl + E to toggle edit mode
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      setEditMode(!isEditing);
    }
    // Ctrl + B to toggle bold text
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      const selection = window.getSelection();
      if (isEditing && selection && selection.toString().trim().length > 0) {
        document.execCommand('bold', false, null);
        saveContent();
      } else {
        const nextWeight = (currentWeight === 'bold' || currentWeight === 'semibold') ? 'normal' : 'bold';
        applyWeight(nextWeight);
      }
    }
  });

  // Initialize
  loadSavedContent();
});
