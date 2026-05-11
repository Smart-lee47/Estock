// ============================================================
//  STOCKISH — script.js
//  Handles all JavaScript logic for every page.
// ============================================================


// -- localStorage Keys --
const COMPANIES_KEY       = 'stockish_companies';
const CURRENT_COMPANY_KEY = 'stockish_current_company';
const PRODUCTS_KEY        = 'stockish_products';
const ADMIN_SESSION_KEY   = 'stockish_admin_logged_in';
const COMPANY_SESSION_KEY = 'stockish_company_logged_in';

// -- Admin Credentials --
const ADMIN_EMAIL    = 'admin@stockish.com';
const ADMIN_PASSWORD = '123456789'; // Must be at least 9 characters for validation

// -- Regex Patterns --
// Email must have @, a domain name, and end with .com / .net / .org / .rw
const EMAIL_REGEX    = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|rw|co\.rw)$/i;
// Password must be at least 16 characters
const PASSWORD_REGEX = /^.{9,}$/;


// -- Validation Helpers --
function validateEmail(email)       { return EMAIL_REGEX.test(email); }
function validatePassword(password) { return PASSWORD_REGEX.test(password); }

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) { el.textContent = message; el.style.display = 'block'; }
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}


// -- Page Detection: auto-run correct function on page load --
const currentPage = window.location.pathname.split('/').pop();

if (currentPage === 'dashboard.html') {
  // Redirect to company login if company session doesn't exist
  if (localStorage.getItem(COMPANY_SESSION_KEY) !== 'true') {
    window.location.href = 'company-login.html';
  } else {
    loadDashboard();
  }
}

if (currentPage === 'Admin.html') {
  // Redirect to login if admin session doesn't exist
  if (localStorage.getItem(ADMIN_SESSION_KEY) !== 'true') {
    window.location.href = 'admin-login.html';
  } else {
    loadAdmin();
  }
}


// -- Admin Login --
function adminLogin() {
  const email    = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;

  clearError('adminEmailError');
  clearError('adminPasswordError');
  document.getElementById('loginError').style.display = 'none';

  let valid = true;

  if (!email || !validateEmail(email)) {
    showError('adminEmailError', 'Invalid email. Must include @, a domain, and end with .com / .net / .org / .rw');
    valid = false;
  }

  if (!password || !validatePassword(password)) {
    showError('adminPasswordError', 'Password must be at least 9 characters.');
    valid = false;
  }

  if (!valid) return;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    window.location.href = 'Admin.html';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}


// -- Admin Logout --
function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = 'admin-login.html';
}

// -- Company Login --
function companyLogin() {
  const email    = document.getElementById('companyEmail').value.trim();
  const password = document.getElementById('companyPassword').value;

  clearError('companyEmailError');
  clearError('companyPasswordError');
  document.getElementById('companyLoginError').style.display = 'none';

  let valid = true;

  if (!email || !validateEmail(email)) {
    showError('companyEmailError', 'Invalid email. Must include @, a domain, and end with .com / .net / .org / .rw');
    valid = false;
  }

  if (!password || !validatePassword(password)) {
    showError('companyPasswordError', 'Password must be at least 9 characters.');
    valid = false;
  }

  if (!valid) return;

  // Check if company with this email and password exists
  const companies = JSON.parse(localStorage.getItem(COMPANIES_KEY) || '[]');
  const company = companies.find(c => c.contactEmail === email && c.password === password);

  if (company) {
    localStorage.setItem(CURRENT_COMPANY_KEY, JSON.stringify(company));
    localStorage.setItem(COMPANY_SESSION_KEY, 'true');
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('companyLoginError').style.display = 'block';
  }
}

// -- Company Logout --
function companyLogout() {
  localStorage.removeItem(COMPANY_SESSION_KEY);
  localStorage.removeItem(CURRENT_COMPANY_KEY);
  window.location.href = 'company-login.html';
}


// -- Register Company (signup.html) --
function registerCompany() {
  const companyName     = document.getElementById('companyName').value.trim();
  const companyType     = document.getElementById('companyType').value.trim();
  const contactPerson   = document.getElementById('contactPerson').value.trim();
  const contactEmail    = document.getElementById('contactEmail').value.trim();
  const contactPhone    = document.getElementById('contactPhone').value.trim();
  const warehouseChoice = document.getElementById('warehouseChoice').value;
  const serviceChoice   = document.getElementById('serviceChoice').value;
  const slotsNeeded     = document.getElementById('slotsNeeded').value.trim();
  const password        = document.getElementById('signupPassword').value;
  const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

  clearError('emailError');
  clearError('passwordError');
  clearError('passwordConfirmError');

  if (!companyName || !companyType || !contactPerson ||
      !contactPhone || !warehouseChoice || !serviceChoice || !slotsNeeded) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  let valid = true;

  if (!contactEmail || !validateEmail(contactEmail)) {
    showError('emailError', 'Invalid email. Must include @, a domain, and end with .com / .net / .org / .rw');
    valid = false;
  }

  if (!password || !validatePassword(password)) {
    showError('passwordError', 'Password must be at least 16 characters.');
    valid = false;
  }

  if (password && passwordConfirm !== password) {
    showError('passwordConfirmError', 'Passwords do not match.');
    valid = false;
  }

  if (!valid) return;

  const company = {
    id: Date.now(),
    companyName, companyType, contactPerson,
    contactEmail, contactPhone, warehouseChoice,
    serviceChoice, slotsNeeded, password,
    registeredOn: new Date().toLocaleDateString()
  };

  const existing = JSON.parse(localStorage.getItem(COMPANIES_KEY) || '[]');
  existing.push(company);
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(existing));
  localStorage.setItem(CURRENT_COMPANY_KEY, JSON.stringify(company));
  localStorage.setItem(COMPANY_SESSION_KEY, 'true');

  const msg = document.getElementById('successMsg');
  msg.style.display = 'block';
  msg.scrollIntoView({ behavior: 'smooth' });
  
  // Redirect to dashboard after 2 seconds
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 2000);
}


// -- Load Dashboard (dashboard.html) --
function loadDashboard() {
  const company = JSON.parse(localStorage.getItem(CURRENT_COMPANY_KEY));

  if (!company) {
    document.getElementById('dashboardTitle').textContent = 'No Company Registered';
    document.getElementById('companyInfo').textContent = 'Please register your company on the signup page first.';
    return;
  }

  document.getElementById('dashboardTitle').textContent = company.companyName + ' — Dashboard';
  document.getElementById('companyInfo').textContent    = 'Contact: ' + company.contactPerson + '  |  Email: ' + company.contactEmail;
  document.getElementById('warehouseCard').textContent  = company.warehouseChoice;
  document.getElementById('serviceCard').textContent    = company.serviceChoice;

  renderTable();
  updateStats();
}


// -- Add Product (dashboard.html) --
function addProduct() {
  const name     = document.getElementById('productName').value.trim();
  const qty      = parseInt(document.getElementById('productQty').value);
  const category = document.getElementById('productCategory').value.trim();
  const company  = JSON.parse(localStorage.getItem(CURRENT_COMPANY_KEY));

  if (!name || isNaN(qty) || qty < 1) {
    alert('Please enter a valid product name and quantity.');
    return;
  }

  if (!company) {
    alert('No company registered. Please sign up first.');
    return;
  }

  const product = {
    id: Date.now(),
    companyId   : company.id,
    companyName : company.companyName,
    name, qty,
    category  : category || 'General',
    dateAdded : new Date().toLocaleDateString()
  };

  const existing = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  existing.push(product);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(existing));

  document.getElementById('productName').value     = '';
  document.getElementById('productQty').value      = '';
  document.getElementById('productCategory').value = '';

  renderTable();
  updateStats();
}16


// -- Delete Product (dashboard.html) --
function deleteProduct(productId) {
  let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  products = products.filter(p => p.id != productId);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  renderTable();
  updateStats();
}

// -- Stock In Product (dashboard.html) --
function stockIn(productId) {
  const qty = parseInt(prompt('Enter quantity to add to stock:'));
  if (isNaN(qty) || qty <= 0) {
    alert('Please enter a valid positive number.');
    return;
  }

  let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  const product = products.find(p => p.id == productId);
  if (product) {
    product.qty += qty;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    renderTable();
    updateStats();
  }
}

// -- Stock Out Product (dashboard.html) --
function stockOut(productId) {
  const qty = parseInt(prompt('Enter quantity to remove from stock:'));
  if (isNaN(qty) || qty <= 0) {
    alert('Please enter a valid positive number.');
    return;
  }

  let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  const product = products.find(p => p.id == productId);
  if (product) {
    if (product.qty < qty) {
      alert('Cannot remove more than available stock.');
      return;
    }
    product.qty -= qty;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    renderTable();
    updateStats();
  }
}


// -- Render Inventory Table (dashboard.html) --
function renderTable() {
  const company    = JSON.parse(localStorage.getItem(CURRENT_COMPANY_KEY));
  const products   = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  const myProducts = products.filter(p => p.companyId === company.id);
  const tbody      = document.getElementById('productList');

  if (myProducts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;opacity:0.5;padding:30px;">No products yet. Use the form above to add your first product.</td></tr>`;
    return;
  }

  tbody.innerHTML = myProducts.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.qty}</td>
      <td>${p.dateAdded}</td>
      <td>
        <button class="action-btn stock-in" onclick="stockIn(${p.id})">Stock In</button>
        <button class="action-btn stock-out" onclick="stockOut(${p.id})">Stock Out</button>
        <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}


// -- Update Stat Cards (dashboard.html) --
function updateStats() {
  const company    = JSON.parse(localStorage.getItem(CURRENT_COMPANY_KEY));
  const products   = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  const myProducts = products.filter(p => p.companyId === company.id);

  document.getElementById('totalProducts').textContent = myProducts.length;
  document.getElementById('totalStock').textContent    = myProducts.reduce((sum, p) => sum + p.qty, 0);
}


// -- Load Admin Panel (admin.html) --
function loadAdmin() {
  const companies = JSON.parse(localStorage.getItem(COMPANIES_KEY) || '[]');
  const products  = JSON.parse(localStorage.getItem(PRODUCTS_KEY)  || '[]');

  document.getElementById('adminTotalCompanies').textContent = companies.length;
  document.getElementById('adminTotalProducts').textContent  = products.length;
  document.getElementById('adminTotalStock').textContent     = products.reduce((sum, p) => sum + p.qty, 0);

  const companiesTbody = document.getElementById('adminCompaniesList');
  companiesTbody.innerHTML = companies.length === 0
    ? `<tr><td colspan="10" style="text-align:center;opacity:0.5;padding:30px;">No companies registered yet.</td></tr>`
    : companies.map((c, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${c.companyName}</td>
          <td>${c.companyType}</td>
          <td>${c.contactPerson}</td>
          <td>${c.contactEmail}</td>
          <td>${c.warehouseChoice}</td>
          <td>${c.serviceChoice}</td>
          <td>${c.slotsNeeded}</td>
          <td>${c.registeredOn}</td>
          <td><button class="delete-btn" onclick="deleteCompany(${c.id})">Remove</button></td>
        </tr>`).join('');

  const productsTbody = document.getElementById('adminProductsList');
  productsTbody.innerHTML = products.length === 0
    ? `<tr><td colspan="6" style="text-align:center;opacity:0.5;padding:30px;">No products in storage yet.</td></tr>`
    : products.map((p, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${p.companyName}</td>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.qty}</td>
          <td>${p.dateAdded}</td>
        </tr>`).join('');
}


// -- Delete Company (admin.html) --
function deleteCompany(companyId) {
  if (!confirm('Remove this company and all their products permanently?')) return;

  let companies = JSON.parse(localStorage.getItem(COMPANIES_KEY) || '[]');
  companies = companies.filter(c => c.id != companyId);
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));

  let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  products = products.filter(p => p.companyId != companyId);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

  loadAdmin();
}