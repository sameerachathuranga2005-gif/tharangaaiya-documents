// ==========================================================================
// Green Light Enterprises - Official Pro Invoice Logic Engine (2026 Executive Edition)
// Universal In-Place Editing, Live Math, Amount-to-Words, JSON Save/Load & Print
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const toggleEditBtn = document.getElementById('toggleEditBtn');
  const editBtnText = document.getElementById('editBtnText');
  const addRowBtn = document.getElementById('addRowBtn');
  const clearRowsBtn = document.getElementById('clearRowsBtn');
  
  // Document Type Elements
  const docTypeMenuBtn = document.getElementById('docTypeMenuBtn');
  const docTypeLabel = document.getElementById('docTypeLabel');
  const docTypeHeading = document.getElementById('docTypeHeading');
  const docTypePopover = document.getElementById('docTypePopover');
  const closeDocTypeBtn = document.getElementById('closeDocTypeBtn');

  // Quick Catalog Elements
  const quickItemsBtn = document.getElementById('quickItemsBtn');
  const quickItemsPopover = document.getElementById('quickItemsPopover');
  const clientsMenuBtn = document.getElementById('clientsMenuBtn');
  const clientsPopover = document.getElementById('clientsPopover');

  // Tax & Discount Elements
  const taxMenuBtn = document.getElementById('taxMenuBtn');
  const taxRateLabel = document.getElementById('taxRateLabel');
  const taxPopover = document.getElementById('taxPopover');
  const closeTaxBtn = document.getElementById('closeTaxBtn');
  const taxSummaryRow = document.getElementById('taxSummaryRow');
  const taxTypeTitle = document.getElementById('taxTypeTitle');
  const taxRateBadge = document.getElementById('taxRateBadge');
  const taxValEl = document.getElementById('taxVal');

  const discountMenuBtn = document.getElementById('discountMenuBtn');
  const currentDiscountLabel = document.getElementById('currentDiscountLabel');
  const discountPopover = document.getElementById('discountPopover');
  const closeDiscountBtn = document.getElementById('closeDiscountBtn');
  const discountSummaryRow = document.getElementById('discountSummaryRow');
  const discountBadge = document.getElementById('discountBadge');
  const discountValEl = document.getElementById('discountVal');

  // Feature Toggle Buttons
  const toggleBankBtn = document.getElementById('toggleBankBtn');
  const bankDetailsCard = document.getElementById('bankDetailsCard');
  const toggleStampBtn = document.getElementById('toggleStampBtn');
  const corporateSeal = document.getElementById('corporateSeal');
  const toggleSignatureBtn = document.getElementById('toggleSignatureBtn');
  const digitalSignatureWrap = document.getElementById('digitalSignatureWrap');
  const toggleCustomerBoxBtn = document.getElementById('toggleCustomerBoxBtn');
  const customerAcceptanceBox = document.getElementById('customerAcceptanceBox');

  // Theme & Status Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentThemeName = document.getElementById('currentThemeName');
  const headerStatusPill = document.getElementById('headerStatusPill');
  const headerStatusText = document.getElementById('headerStatusText');
  const statusStampBtn = document.getElementById('statusStampBtn');
  const statusStampLabel = document.getElementById('statusStampLabel');
  const statusStamp = document.getElementById('statusStamp');

  // Action Buttons
  const nextInvBtn = document.getElementById('nextInvBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const importJsonInput = document.getElementById('importJsonInput');
  const resetBtn = document.getElementById('resetBtn');
  const printBtn = document.getElementById('printBtn');

  // Document Container & Table
  const invoiceDoc = document.getElementById('invoiceDoc');
  const tableBody = document.getElementById('invoiceTableBody');
  const subtotalValEl = document.getElementById('subtotalVal');
  const totalDueValEl = document.getElementById('totalDueVal');
  const amountWordsText = document.getElementById('amountWordsText');

  // Spacing & Typography Elements
  const spacingMenuBtn = document.getElementById('spacingMenuBtn');
  const spacingPopover = document.getElementById('spacingPopover');
  const closeSpacingBtn = document.getElementById('closeSpacingBtn');
  const wordSpacingSlider = document.getElementById('wordSpacingSlider');
  const lineHeightSlider = document.getElementById('lineHeightSlider');
  const letterSpacingSlider = document.getElementById('letterSpacingSlider');
  const wordGapVal = document.getElementById('wordGapVal');
  const lineHeightVal = document.getElementById('lineHeightVal');
  const letterGapVal = document.getElementById('letterGapVal');
  const textWeightVal = document.getElementById('textWeightVal');
  const currentGapLabel = document.getElementById('currentGapLabel');

  // App State - All text is ALWAYS editable
  let showEditOutlines = true;
  document.body.classList.add('is-editing');

  let currentTaxRate = 0;
  let currentTaxName = 'Non-VAT (0%)';
  let currentDiscountPercent = 0;

  const themes = [
    { id: 'theme-emerald', name: 'Emerald GLE' },
    { id: 'theme-sapphire', name: 'Corporate Navy' },
    { id: 'theme-onyx', name: 'Luxury Platinum' },
    { id: 'theme-amber', name: 'Royal Amber' }
  ];
  let currentThemeIndex = 0;

  const headerStatuses = [
    { id: 'status-paid', text: 'PAID' },
    { id: 'status-pending', text: 'PENDING' },
    { id: 'status-overdue', text: 'OVERDUE' },
    { id: 'status-partial', text: 'PARTIAL' }
  ];
  let currentHeaderStatusIndex = 0;

  const stampStatuses = ['none', 'paid', 'due', 'original'];
  let currentStampIndex = 0;

  // Catalog Presets for 1-click line item entry
  const productCatalog = [
    { name: 'Stretch Film', desc: '21m x 500mm x 300m • Virgin LLDPE', unit: 'Rolls', qty: 1, price: 1850.00 },
    { name: 'Hand Grade Stretch Film', desc: '500mm x 300m • 20 MCM • 1.9 kg with core', unit: 'Rolls', qty: 5, price: 1650.00 },
    { name: 'Machine Grade Stretch Film', desc: '500mm x 1500m • 23 MCM Cast Film High Elongation', unit: 'Rolls', qty: 2, price: 7450.00 },
    { name: 'PP Strapping Band (12mm)', desc: '12mm x 1000m • Virgin Quality (Brilliant White)', unit: 'Rolls', qty: 3, price: 3200.00 },
    { name: 'PP Strapping Band (15mm)', desc: '15mm x 1000m • Heavy Duty Export Quality Band', unit: 'Rolls', qty: 2, price: 3600.00 },
    { name: 'BOPP Packaging Tape', desc: '48mm x 100m • High Adhesion Brown / Transparent', unit: 'Boxes', qty: 36, price: 320.00 },
    { name: 'Manual Strapping Tool Set', desc: 'Heavy Duty Tensioner & Sealer Combination Kit', unit: 'Sets', qty: 1, price: 14500.00 },
    { name: 'Angle Edge Protectors', desc: '50mm x 50mm x 1m • 3mm Compressed Board', unit: 'Bundles', qty: 100, price: 180.00 }
  ];

  // Client Catalog for 1-click customer details
  const clientCatalog = [
    {
      company: 'Dilmin Enterprise',
      attn: 'Attn. Mr Chaminda Pathirana',
      addr1: 'Katupotha Rd.',
      addr2: 'Moonamaldeniya, Sri Lanka',
      contact: 'Contact: 077 412 8930'
    },
    {
      company: 'Spectra Logistics (Pvt) Ltd',
      attn: 'Attn. Purchasing Manager',
      addr1: 'Muthurajawela Industrial Zone',
      addr2: 'Wattala, Sri Lanka',
      contact: 'Contact: 011 498 7200'
    },
    {
      company: 'Lanka Industrial Packaging Ltd',
      attn: 'Attn. Mr Sanjeewa Perera',
      addr1: 'Biyagama Free Trade Zone',
      addr2: 'Biyagama, Sri Lanka',
      contact: 'Contact: 071 289 4432'
    },
    {
      company: 'Ceylon Fresh Exports (Pvt) Ltd',
      attn: 'Attn. Logistics Department',
      addr1: 'Ekala Industrial Estate',
      addr2: 'Ja-Ela, Sri Lanka',
      contact: 'Contact: 011 223 8901'
    },
    {
      company: 'Brandix Essentials (Pvt) Ltd',
      attn: 'Attn. Stores & Procurement Officer',
      addr1: 'Seethawaka Industrial Park',
      addr2: 'Avissawella, Sri Lanka',
      contact: 'Contact: 036 427 9100'
    }
  ];

  // ==========================================================================
  // Number Formatting & Amount-to-Words Helpers
  // ==========================================================================
  function parseAmount(val) {
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    if (!val) return 0;
    const cleaned = val.toString().replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  function formatCurrency(num) {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function numberToWordsLKR(amount) {
    const num = Math.floor(amount);
    const cents = Math.round((amount - num) * 100);
    if (num === 0) return 'Zero Rupees Only';

    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
               'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function inWords(n) {
      if (n === 0) return '';
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + inWords(n % 100) : '');
      if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + inWords(n % 1000) : '');
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + inWords(n % 100000) : '');
      return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + inWords(n % 10000000) : '');
    }

    let words = 'Sri Lankan Rupees ' + inWords(num);
    if (cents > 0) {
      words += ' and ' + inWords(cents) + ' Cents';
    }
    return words + ' Only';
  }

  // ==========================================================================
  // Table Recalculation Engine
  // ==========================================================================
  function recalculateTotals() {
    const rows = tableBody.querySelectorAll('tr.invoice-row');
    let subtotal = 0;

    rows.forEach((row, idx) => {
      // Row sequence index
      const numCell = row.querySelector('.col-num');
      if (numCell) numCell.textContent = (idx + 1).toString();

      // Qty & Price
      const qtyCell = row.querySelector('.cell-qty');
      const priceCell = row.querySelector('.cell-price');
      const amountCell = row.querySelector('.cell-amount');

      const qty = parseAmount(qtyCell ? qtyCell.innerText : 1);
      const price = parseAmount(priceCell ? priceCell.innerText : 0);
      const amount = qty * price;

      if (amountCell) {
        amountCell.textContent = formatCurrency(amount);
      }

      subtotal += amount;
    });

    if (subtotalValEl) {
      subtotalValEl.textContent = `Rs. ${formatCurrency(subtotal)}`;
    }

    // Discount Calculation
    let discountAmount = 0;
    if (currentDiscountPercent > 0) {
      discountAmount = (subtotal * currentDiscountPercent) / 100;
      if (discountSummaryRow) discountSummaryRow.style.display = 'flex';
      if (discountBadge) discountBadge.textContent = `${currentDiscountPercent}%`;
      if (discountValEl) discountValEl.textContent = `- Rs. ${formatCurrency(discountAmount)}`;
    } else {
      if (discountSummaryRow) discountSummaryRow.style.display = 'none';
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);

    // Tax / VAT Calculation
    let taxAmount = 0;
    if (currentTaxRate > 0) {
      taxAmount = (discountedSubtotal * currentTaxRate) / 100;
      if (taxSummaryRow) taxSummaryRow.style.display = 'flex';
      if (taxTypeTitle) taxTypeTitle.textContent = currentTaxRate === 18 ? 'VAT (18%)' : 'SSCL (2.5%)';
      if (taxRateBadge) taxRateBadge.textContent = `${currentTaxRate}%`;
      if (taxValEl) taxValEl.textContent = `+ Rs. ${formatCurrency(taxAmount)}`;
    } else {
      if (taxSummaryRow) taxSummaryRow.style.display = 'none';
    }

    // Final Grand Total Due
    const totalDue = discountedSubtotal + taxAmount;

    if (totalDueValEl) {
      totalDueValEl.textContent = `Rs. ${formatCurrency(totalDue)}`;
    }

    if (amountWordsText) {
      amountWordsText.textContent = numberToWordsLKR(totalDue);
    }

    saveInvoiceState();
  }

  // ==========================================================================
  // Row Creation, Movement & Deletion
  // ==========================================================================
  function createRowElement(data = { name: 'Stretch Film', desc: '21m x 500mm x 300m', unit: 'Rolls', qty: 1, price: 1850.00 }) {
    const tr = document.createElement('tr');
    tr.className = 'invoice-row';
    const amount = Number(data.qty) * Number(data.price);

    tr.innerHTML = `
      <td class="col-num" contenteditable="true" spellcheck="false">1</td>
      <td class="col-item cell-item" contenteditable="true" spellcheck="false">${escapeHtml(data.name)}</td>
      <td class="col-desc cell-desc" contenteditable="true" spellcheck="false">${escapeHtml(data.desc)}</td>
      <td class="col-unit cell-unit"><span class="unit-pill" contenteditable="true" spellcheck="false">${escapeHtml(data.unit || 'Rolls')}</span></td>
      <td class="col-qty cell-qty" contenteditable="true" spellcheck="false">${data.qty}</td>
      <td class="col-price cell-price" contenteditable="true" spellcheck="false">${formatCurrency(data.price)}</td>
      <td class="col-amount cell-amount" contenteditable="true" spellcheck="false">${formatCurrency(amount)}</td>
      <td class="col-actions no-print">
        <div class="row-actions-group">
          <button type="button" class="row-move-btn move-up" title="Move Up">▲</button>
          <button type="button" class="row-move-btn move-down" title="Move Down">▼</button>
          <button type="button" class="row-delete-btn" title="Delete item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </td>
    `;

    // Hook input events for live recalculation
    const editableCells = tr.querySelectorAll('[contenteditable]');
    editableCells.forEach(cell => {
      cell.addEventListener('input', () => {
        recalculateTotals();
      });
      cell.addEventListener('blur', () => {
        if (cell.classList.contains('cell-price')) {
          const val = parseAmount(cell.innerText);
          cell.textContent = formatCurrency(val);
        }
        recalculateTotals();
      });
    });

    // Move up
    tr.querySelector('.move-up').addEventListener('click', () => {
      const prev = tr.previousElementSibling;
      if (prev) {
        tableBody.insertBefore(tr, prev);
        recalculateTotals();
      }
    });

    // Move down
    tr.querySelector('.move-down').addEventListener('click', () => {
      const next = tr.nextElementSibling;
      if (next) {
        tableBody.insertBefore(next, tr);
        recalculateTotals();
      }
    });

    // Delete event
    const delBtn = tr.querySelector('.row-delete-btn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        tr.remove();
        recalculateTotals();
      });
    }

    return tr;
  }

  function addRow(data) {
    const newTr = createRowElement(data);
    tableBody.appendChild(newTr);
    recalculateTotals();
    return newTr;
  }

  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      const tr = addRow({
        name: 'New Packaging Product',
        desc: 'Product dimensions & specifications',
        unit: 'Rolls',
        qty: 1,
        price: 1500.00
      });
      const itemCell = tr.querySelector('.cell-item');
      if (itemCell) itemCell.focus();
    });
  }

  if (clearRowsBtn) {
    clearRowsBtn.addEventListener('click', () => {
      if (confirm('Clear all line items from this invoice?')) {
        tableBody.innerHTML = '';
        recalculateTotals();
      }
    });
  }

  // ==========================================================================
  // Document Type Selector Logic
  // ==========================================================================
  if (docTypeMenuBtn && docTypePopover) {
    docTypeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      docTypePopover.classList.toggle('is-open');
    });

    if (closeDocTypeBtn) {
      closeDocTypeBtn.addEventListener('click', () => {
        docTypePopover.classList.remove('is-open');
      });
    }

    docTypePopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const docTitle = btn.getAttribute('data-doctype');
        const prefix = btn.getAttribute('data-prefix');
        
        if (docTypeHeading) docTypeHeading.textContent = docTitle;
        if (docTypeLabel) docTypeLabel.textContent = docTitle;
        
        // Update Invoice Number Prefix
        const invNoEl = document.querySelector('[data-key="invoiceNo"]');
        if (invNoEl && prefix) {
          const currentNo = invNoEl.innerText;
          const numPart = currentNo.replace(/^[^0-9]+/, '') || '2026-001';
          invNoEl.innerText = `${prefix}${numPart}`;
        }

        docTypePopover.classList.remove('is-open');
        saveInvoiceState();
      });
    });
  }

  // ==========================================================================
  // Quick Products Catalog Dropdown
  // ==========================================================================
  if (quickItemsPopover) {
    quickItemsPopover.innerHTML = `
      <div class="popover-header">
        <h4>GLE Product Catalog</h4>
        <button type="button" class="popover-close-btn" id="closeQuickItemsBtn">&times;</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px; max-height: 380px; overflow-y: auto;">
        ${productCatalog.map((prod, idx) => `
          <button type="button" class="quick-item-btn" data-catalog-idx="${idx}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="item-name">${escapeHtml(prod.name)}</span>
              <span style="font-size: 0.65rem; background: rgba(5,106,66,0.25); color: #34d399; padding: 1px 5px; border-radius: 3px;">${escapeHtml(prod.unit)}</span>
            </div>
            <span class="item-desc">${escapeHtml(prod.desc)}</span>
            <span class="item-rate">Rs. ${formatCurrency(prod.price)} / ${escapeHtml(prod.unit)} (Qty: ${prod.qty})</span>
          </button>
        `).join('')}
      </div>
    `;

    const closeBtn = document.getElementById('closeQuickItemsBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        quickItemsPopover.classList.remove('is-open');
      });
    }

    if (quickItemsBtn) {
      quickItemsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        quickItemsPopover.classList.toggle('is-open');
        if (clientsPopover) clientsPopover.classList.remove('is-open');
        if (docTypePopover) docTypePopover.classList.remove('is-open');
      });
    }

    quickItemsPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-catalog-idx'), 10);
        const item = productCatalog[idx];
        if (item) {
          addRow({
            name: item.name,
            desc: item.desc,
            unit: item.unit,
            qty: item.qty,
            price: item.price
          });
        }
        quickItemsPopover.classList.remove('is-open');
      });
    });
  }

  // ==========================================================================
  // Quick Clients Dropdown
  // ==========================================================================
  if (clientsPopover) {
    clientsPopover.innerHTML = `
      <div class="popover-header">
        <h4>Saved Corporate Clients</h4>
        <button type="button" class="popover-close-btn" id="closeClientsBtn">&times;</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px; max-height: 380px; overflow-y: auto;">
        ${clientCatalog.map((c, idx) => `
          <button type="button" class="quick-item-btn" data-client-idx="${idx}">
            <span class="item-name">${escapeHtml(c.company)}</span>
            <span class="item-desc">${escapeHtml(c.attn)} • ${escapeHtml(c.addr1)}, ${escapeHtml(c.addr2)}</span>
            <span class="item-rate">${escapeHtml(c.contact)}</span>
          </button>
        `).join('')}
      </div>
    `;

    const closeBtn = document.getElementById('closeClientsBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        clientsPopover.classList.remove('is-open');
      });
    }

    if (clientsMenuBtn) {
      clientsMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clientsPopover.classList.toggle('is-open');
        if (quickItemsPopover) quickItemsPopover.classList.remove('is-open');
        if (docTypePopover) docTypePopover.classList.remove('is-open');
      });
    }

    clientsPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-client-idx'), 10);
        const client = clientCatalog[idx];
        if (client) {
          const compEl = document.querySelector('[data-key="clientCompany"]');
          const attnEl = document.querySelector('[data-key="clientAttn"]');
          const a1El = document.querySelector('[data-key="clientAddress1"]');
          const a2El = document.querySelector('[data-key="clientAddress2"]');
          const conEl = document.querySelector('[data-key="clientContact"]');

          if (compEl) compEl.innerText = client.company;
          if (attnEl) attnEl.innerText = client.attn;
          if (a1El) a1El.innerText = client.addr1;
          if (a2El) a2El.innerText = client.addr2;
          if (conEl) conEl.innerText = client.contact;

          saveInvoiceState();
        }
        clientsPopover.classList.remove('is-open');
      });
    });
  }

  // ==========================================================================
  // Tax / VAT Dropdown
  // ==========================================================================
  if (taxMenuBtn && taxPopover) {
    taxMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      taxPopover.classList.toggle('is-open');
    });

    if (closeTaxBtn) {
      closeTaxBtn.addEventListener('click', () => {
        taxPopover.classList.remove('is-open');
      });
    }

    taxPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTaxRate = parseFloat(btn.getAttribute('data-tax')) || 0;
        currentTaxName = btn.getAttribute('data-tax-label') || 'Non-VAT (0%)';
        if (taxRateLabel) taxRateLabel.textContent = currentTaxName;
        taxPopover.classList.remove('is-open');
        recalculateTotals();
      });
    });
  }

  // ==========================================================================
  // Discount Dropdown
  // ==========================================================================
  if (discountMenuBtn && discountPopover) {
    discountMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      discountPopover.classList.toggle('is-open');
    });

    if (closeDiscountBtn) {
      closeDiscountBtn.addEventListener('click', () => {
        discountPopover.classList.remove('is-open');
      });
    }

    discountPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentDiscountPercent = parseFloat(btn.getAttribute('data-discount')) || 0;
        if (currentDiscountLabel) currentDiscountLabel.textContent = `${currentDiscountPercent}%`;
        discountPopover.classList.remove('is-open');
        recalculateTotals();
      });
    });
  }

  // ==========================================================================
  // In-Place Edit Mode Outlines Toggle
  // ==========================================================================
  if (toggleEditBtn) {
    toggleEditBtn.addEventListener('click', () => {
      showEditOutlines = !showEditOutlines;
      document.body.classList.toggle('is-editing', showEditOutlines);
      toggleEditBtn.classList.toggle('active', showEditOutlines);

      if (editBtnText) {
        editBtnText.textContent = showEditOutlines ? 'All Text Editable' : 'Hide Guides';
      }
    });
  }

  // Universal Live Input & Auto-Save for ALL editable elements
  if (invoiceDoc) {
    invoiceDoc.addEventListener('input', (e) => {
      const target = e.target;
      if (target.classList.contains('cell-qty') || target.classList.contains('cell-price')) {
        recalculateTotals();
      } else {
        saveInvoiceState();
      }
    });

    invoiceDoc.addEventListener('blur', (e) => {
      const target = e.target;
      if (target.classList.contains('cell-price')) {
        const val = parseAmount(target.innerText);
        target.textContent = formatCurrency(val);
        recalculateTotals();
      }
      saveInvoiceState();
    }, true);
  }

  // Bullet Notes: Enter key creates a new bullet easily
  const notesList = document.querySelector('.notes-list');
  if (notesList) {
    notesList.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const newLi = document.createElement('li');
        newLi.setAttribute('contenteditable', 'true');
        newLi.setAttribute('spellcheck', 'false');
        newLi.textContent = 'New commercial clause or delivery note.';
        if (e.target && e.target.tagName === 'LI') {
          e.target.after(newLi);
        } else {
          notesList.appendChild(newLi);
        }
        newLi.focus();
        saveInvoiceState();
      }
    });
  }

  // ==========================================================================
  // Feature Toggles (Bank, Seal, Signature, Customer Acceptance Box)
  // ==========================================================================
  if (toggleBankBtn && bankDetailsCard) {
    toggleBankBtn.addEventListener('click', () => {
      const isVisible = bankDetailsCard.style.display !== 'none';
      bankDetailsCard.style.display = isVisible ? 'none' : 'block';
      toggleBankBtn.classList.toggle('active', !isVisible);
      saveInvoiceState();
    });
  }

  if (toggleStampBtn && corporateSeal) {
    toggleStampBtn.addEventListener('click', () => {
      const isVisible = corporateSeal.style.display !== 'none';
      corporateSeal.style.display = isVisible ? 'none' : 'flex';
      toggleStampBtn.classList.toggle('active', !isVisible);
      saveInvoiceState();
    });
  }

  if (toggleSignatureBtn && digitalSignatureWrap) {
    toggleSignatureBtn.addEventListener('click', () => {
      const isVisible = digitalSignatureWrap.style.display !== 'none';
      digitalSignatureWrap.style.display = isVisible ? 'none' : 'flex';
      toggleSignatureBtn.classList.toggle('active', !isVisible);
      saveInvoiceState();
    });
  }

  if (toggleCustomerBoxBtn && customerAcceptanceBox) {
    toggleCustomerBoxBtn.addEventListener('click', () => {
      const isVisible = customerAcceptanceBox.style.display !== 'none';
      customerAcceptanceBox.style.display = isVisible ? 'none' : 'block';
      toggleCustomerBoxBtn.classList.toggle('active', !isVisible);
      saveInvoiceState();
    });
  }

  // ==========================================================================
  // Status Pill & Watermark Stamp
  // ==========================================================================
  if (headerStatusPill) {
    headerStatusPill.addEventListener('click', () => {
      currentHeaderStatusIndex = (currentHeaderStatusIndex + 1) % headerStatuses.length;
      const status = headerStatuses[currentHeaderStatusIndex];
      
      headerStatusPill.className = `invoice-status-pill ${status.id}`;
      if (headerStatusText) headerStatusText.textContent = status.text;

      // Also sync watermark stamp
      if (status.id === 'status-paid') {
        currentStampIndex = 1; // paid
      } else if (status.id === 'status-overdue' || status.id === 'status-pending') {
        currentStampIndex = 2; // due
      }
      applyStampIndex();
      saveInvoiceState();
    });
  }

  function applyStampIndex() {
    const stampType = stampStatuses[currentStampIndex];
    if (statusStamp) {
      statusStamp.className = 'invoice-status-stamp';
      if (stampType === 'paid') {
        statusStamp.classList.add('status-paid');
        statusStamp.textContent = 'PAID';
      } else if (stampType === 'due') {
        statusStamp.classList.add('status-due');
        statusStamp.textContent = 'DUE';
      } else if (stampType === 'original') {
        statusStamp.classList.add('status-original');
        statusStamp.textContent = 'ORIGINAL';
      }
    }
    if (statusStampLabel) {
      statusStampLabel.textContent = stampType.toUpperCase();
    }
  }

  if (statusStampBtn) {
    statusStampBtn.addEventListener('click', () => {
      currentStampIndex = (currentStampIndex + 1) % stampStatuses.length;
      applyStampIndex();
      saveInvoiceState();
    });
  }

  // ==========================================================================
  // Theme Toggle
  // ==========================================================================
  if (themeToggleBtn && invoiceDoc) {
    themeToggleBtn.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const th = themes[currentThemeIndex];
      
      invoiceDoc.className = `a4-sheet ${th.id}`;
      if (currentThemeName) currentThemeName.textContent = th.name;
      saveInvoiceState();
    });
  }

  // ==========================================================================
  // Spacing & Typography Controls
  // ==========================================================================
  if (spacingMenuBtn && spacingPopover) {
    spacingMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      spacingPopover.classList.toggle('is-open');
    });

    if (closeSpacingBtn) {
      closeSpacingBtn.addEventListener('click', () => {
        spacingPopover.classList.remove('is-open');
      });
    }

    if (wordSpacingSlider) {
      wordSpacingSlider.addEventListener('input', (e) => {
        const val = `${e.target.value}em`;
        document.documentElement.style.setProperty('--text-word-spacing', val);
        if (wordGapVal) wordGapVal.textContent = val;
      });
    }

    if (lineHeightSlider) {
      lineHeightSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        document.documentElement.style.setProperty('--text-line-height', val);
        if (lineHeightVal) lineHeightVal.textContent = val;
      });
    }

    if (letterSpacingSlider) {
      letterSpacingSlider.addEventListener('input', (e) => {
        const val = `${e.target.value}em`;
        document.documentElement.style.setProperty('--text-letter-spacing', val);
        if (letterGapVal) letterGapVal.textContent = val;
      });
    }

    spacingPopover.querySelectorAll('.weight-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        spacingPopover.querySelectorAll('.weight-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const weight = btn.getAttribute('data-weight');
        const weightMap = { normal: '400', medium: '500', semibold: '600', bold: '700' };
        const numWeight = weightMap[weight] || '400';
        document.documentElement.style.setProperty('--text-font-weight', numWeight);
        if (textWeightVal) textWeightVal.textContent = btn.textContent;
      });
    });

    spacingPopover.querySelectorAll('.preset-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        spacingPopover.querySelectorAll('.preset-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const preset = btn.getAttribute('data-preset');
        if (currentGapLabel) currentGapLabel.textContent = btn.textContent;

        if (preset === 'compact') {
          if (wordSpacingSlider) wordSpacingSlider.value = 0.01;
          if (lineHeightSlider) lineHeightSlider.value = 1.35;
          if (letterSpacingSlider) letterSpacingSlider.value = -0.01;
        } else if (preset === 'normal') {
          if (wordSpacingSlider) wordSpacingSlider.value = 0.03;
          if (lineHeightSlider) lineHeightSlider.value = 1.46;
          if (letterSpacingSlider) letterSpacingSlider.value = 0.00;
        } else if (preset === 'spacious') {
          if (wordSpacingSlider) wordSpacingSlider.value = 0.08;
          if (lineHeightSlider) lineHeightSlider.value = 1.68;
          if (letterSpacingSlider) letterSpacingSlider.value = 0.02;
        } else if (preset === 'wide') {
          if (wordSpacingSlider) wordSpacingSlider.value = 0.12;
          if (lineHeightSlider) lineHeightSlider.value = 1.85;
          if (letterSpacingSlider) letterSpacingSlider.value = 0.04;
        }

        if (wordSpacingSlider) wordSpacingSlider.dispatchEvent(new Event('input'));
        if (lineHeightSlider) lineHeightSlider.dispatchEvent(new Event('input'));
        if (letterSpacingSlider) letterSpacingSlider.dispatchEvent(new Event('input'));
      });
    });
  }

  // Close open popovers when clicking outside
  document.addEventListener('click', (e) => {
    if (quickItemsPopover && !quickItemsPopover.contains(e.target) && e.target !== quickItemsBtn) {
      quickItemsPopover.classList.remove('is-open');
    }
    if (clientsPopover && !clientsPopover.contains(e.target) && e.target !== clientsMenuBtn) {
      clientsPopover.classList.remove('is-open');
    }
    if (docTypePopover && !docTypePopover.contains(e.target) && e.target !== docTypeMenuBtn) {
      docTypePopover.classList.remove('is-open');
    }
    if (taxPopover && !taxPopover.contains(e.target) && e.target !== taxMenuBtn) {
      taxPopover.classList.remove('is-open');
    }
    if (discountPopover && !discountPopover.contains(e.target) && e.target !== discountMenuBtn) {
      discountPopover.classList.remove('is-open');
    }
    if (spacingPopover && !spacingPopover.contains(e.target) && e.target !== spacingMenuBtn) {
      spacingPopover.classList.remove('is-open');
    }
  });

  // ==========================================================================
  // Increment Next Invoice Number
  // ==========================================================================
  if (nextInvBtn) {
    nextInvBtn.addEventListener('click', () => {
      const invNoEl = document.querySelector('[data-key="invoiceNo"]');
      if (invNoEl) {
        const text = invNoEl.innerText.trim();
        const match = text.match(/^(.*?)(\d+)$/);
        if (match) {
          const prefix = match[1];
          const num = parseInt(match[2], 10) + 1;
          const paddedNum = num.toString().padStart(match[2].length, '0');
          invNoEl.innerText = `${prefix}${paddedNum}`;
        } else {
          invNoEl.innerText = 'INV-2026-002';
        }
        saveInvoiceState();
      }
    });
  }

  // ==========================================================================
  // Export & Import JSON
  // ==========================================================================
  function gatherInvoiceData() {
    const fields = {};
    document.querySelectorAll('#invoiceDoc [data-key]').forEach(el => {
      fields[el.getAttribute('data-key')] = el.innerText.trim();
    });

    const items = [];
    tableBody.querySelectorAll('tr.invoice-row').forEach(row => {
      items.push({
        name: row.querySelector('.cell-item')?.innerText.trim() || '',
        desc: row.querySelector('.cell-desc')?.innerText.trim() || '',
        unit: row.querySelector('.unit-pill')?.innerText.trim() || 'Rolls',
        qty: parseAmount(row.querySelector('.cell-qty')?.innerText),
        price: parseAmount(row.querySelector('.cell-price')?.innerText)
      });
    });

    const notes = [];
    document.querySelectorAll('.notes-list li').forEach(li => {
      notes.push(li.innerText.trim());
    });

    return {
      docType: docTypeHeading ? docTypeHeading.innerText : 'COMMERCIAL INVOICE',
      fields,
      items,
      notes,
      theme: themes[currentThemeIndex].id,
      headerStatus: headerStatuses[currentHeaderStatusIndex].id,
      watermark: stampStatuses[currentStampIndex],
      taxRate: currentTaxRate,
      discountPercent: currentDiscountPercent,
      bankVisible: bankDetailsCard ? bankDetailsCard.style.display !== 'none' : true,
      stampVisible: corporateSeal ? corporateSeal.style.display !== 'none' : true,
      signatureVisible: digitalSignatureWrap ? digitalSignatureWrap.style.display !== 'none' : true,
      customerBoxVisible: customerAcceptanceBox ? customerAcceptanceBox.style.display !== 'none' : true,
      savedAt: new Date().toISOString()
    };
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const data = gatherInvoiceData();
      const invNo = data.fields.invoiceNo || 'INV-2026-001';
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GLE-Invoice-${invNo.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (importJsonInput) {
    importJsonInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = JSON.parse(evt.target.result);
          applyInvoiceData(data);
          alert('Invoice data successfully loaded!');
        } catch (err) {
          alert('Failed to parse invoice JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  function applyInvoiceData(data) {
    if (!data) return;

    if (data.docType && docTypeHeading) {
      docTypeHeading.textContent = data.docType;
      if (docTypeLabel) docTypeLabel.textContent = data.docType;
    }

    if (data.fields) {
      Object.keys(data.fields).forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.innerText = data.fields[key];
      });
    }

    if (Array.isArray(data.items) && data.items.length > 0) {
      tableBody.innerHTML = '';
      data.items.forEach(item => {
        addRow(item);
      });
    }

    if (Array.isArray(data.notes) && data.notes.length > 0 && notesList) {
      notesList.innerHTML = '';
      data.notes.forEach(noteText => {
        const li = document.createElement('li');
        li.setAttribute('contenteditable', 'true');
        li.setAttribute('spellcheck', 'false');
        li.textContent = noteText;
        notesList.appendChild(li);
      });
    }

    if (data.taxRate !== undefined) {
      currentTaxRate = data.taxRate;
      if (taxRateLabel) taxRateLabel.textContent = currentTaxRate === 0 ? 'Non-VAT (0%)' : `${currentTaxRate}%`;
    }

    if (data.discountPercent !== undefined) {
      currentDiscountPercent = data.discountPercent;
      if (currentDiscountLabel) currentDiscountLabel.textContent = `${currentDiscountPercent}%`;
    }

    if (data.theme) {
      const idx = themes.findIndex(t => t.id === data.theme);
      if (idx !== -1) {
        currentThemeIndex = idx;
        invoiceDoc.className = `a4-sheet ${themes[idx].id}`;
        if (currentThemeName) currentThemeName.textContent = themes[idx].name;
      }
    }

    if (data.watermark) {
      const idx = stampStatuses.indexOf(data.watermark);
      if (idx !== -1) {
        currentStampIndex = idx;
        applyStampIndex();
      }
    }

    if (bankDetailsCard && data.bankVisible !== undefined) {
      bankDetailsCard.style.display = data.bankVisible ? 'block' : 'none';
      if (toggleBankBtn) toggleBankBtn.classList.toggle('active', data.bankVisible);
    }

    if (corporateSeal && data.stampVisible !== undefined) {
      corporateSeal.style.display = data.stampVisible ? 'flex' : 'none';
      if (toggleStampBtn) toggleStampBtn.classList.toggle('active', data.stampVisible);
    }

    if (digitalSignatureWrap && data.signatureVisible !== undefined) {
      digitalSignatureWrap.style.display = data.signatureVisible ? 'flex' : 'none';
      if (toggleSignatureBtn) toggleSignatureBtn.classList.toggle('active', data.signatureVisible);
    }

    if (customerAcceptanceBox && data.customerBoxVisible !== undefined) {
      customerAcceptanceBox.style.display = data.customerBoxVisible ? 'block' : 'none';
      if (toggleCustomerBoxBtn) toggleCustomerBoxBtn.classList.toggle('active', data.customerBoxVisible);
    }

    recalculateTotals();
  }

  // ==========================================================================
  // LocalStorage Persistence
  // ==========================================================================
  const STORAGE_KEY = 'gle_pro_invoice_data_2026';

  function saveInvoiceState() {
    try {
      const data = gatherInvoiceData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // LocalStorage quota or access denied
    }
  }

  function loadInvoiceState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        applyInvoiceData(data);
      }
    } catch (e) {
      // Fail gracefully
    }
  }

  // ==========================================================================
  // Reset
  // ==========================================================================
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset invoice back to official default template?')) {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      }
    });
  }

  // ==========================================================================
  // Print / PDF Button
  // ==========================================================================
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Utility HTML Escape
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize
  recalculateTotals();
  loadInvoiceState();
});
