// Standard dropdown behavior, site-wide. Browsers won't let page CSS style a
// native <select>'s open dropdown (its border/background is OS chrome, not
// page-styleable — see the fix history in ContactSection for how this was
// discovered). Progressively enhances every
// `<div class="select-shell" data-select-shell><select>…</select></div>`
// on the page into a custom listbox we fully control. The native <select>
// stays in the DOM (hidden, not disabled) so its value still posts with the
// form, and the field still works if this script fails to run.
//
// Author a new dropdown by using that same markup shape — no per-component
// script or CSS needed; global.css's `.select-*` rules and this script pick
// it up automatically.

function enhanceSelect(shell: HTMLElement) {
  const select = shell.querySelector('select');
  if (!select) return;
  const options = Array.from(select.options);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'select-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  const triggerLabel = document.createElement('span');
  trigger.append(triggerLabel);

  const chevron = document.createElement('span');
  chevron.className = 'select-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.textContent = '⌄';
  trigger.append(chevron);

  const listbox = document.createElement('ul');
  listbox.className = 'select-listbox';
  listbox.setAttribute('role', 'listbox');
  listbox.hidden = true;
  listbox.tabIndex = -1;

  const items = options.map((opt) => {
    const li = document.createElement('li');
    li.className = 'select-option';
    li.setAttribute('role', 'option');
    li.tabIndex = -1;
    li.dataset.value = opt.value;
    li.textContent = opt.textContent;
    listbox.append(li);
    return li;
  });

  function syncFromSelect() {
    triggerLabel.textContent = options[select!.selectedIndex]?.textContent ?? '';
    for (const li of items) {
      li.setAttribute('aria-selected', String(li.dataset.value === select!.value));
    }
  }

  function close() {
    listbox.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  function open() {
    listbox.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    (items.find((li) => li.dataset.value === select!.value) ?? items[0])?.focus();
  }

  trigger.addEventListener('click', (e) => {
    // Without this, clicking anywhere inside the <label> that isn't the
    // labeled control (an option, in our case) makes the browser
    // synthesize a second click on the control right after — reopening
    // the list the instant an option click had just closed it.
    e.preventDefault();
    listbox.hidden ? open() : close();
  });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });

  items.forEach((li, index) => {
    li.addEventListener('click', (e) => {
      e.preventDefault();
      select!.value = li.dataset.value!;
      select!.dispatchEvent(new Event('change', { bubbles: true }));
      syncFromSelect();
      close();
      trigger.focus();
    });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        (items[index + 1] ?? items[0]).focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        (items[index - 1] ?? items[items.length - 1]).focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        li.click();
      } else if (e.key === 'Escape') {
        close();
        trigger.focus();
      } else if (e.key === 'Tab') {
        close();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!shell.contains(e.target as Node)) close();
  });

  // Lets other scripts drive this field (e.g. a "Reserve a Spot" link
  // preselecting Interest) by setting select.value and dispatching
  // 'change' — the custom UI stays in sync without knowing who called it.
  select.addEventListener('change', syncFromSelect);

  select.hidden = true;
  select.tabIndex = -1;
  shell.prepend(listbox);
  shell.prepend(trigger);
  syncFromSelect();
}

document.querySelectorAll<HTMLElement>('[data-select-shell]').forEach(enhanceSelect);
