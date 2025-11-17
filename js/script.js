// Data ringkasan (dummy)
const summary = {
  totalProducts: 120,
  totalSales: 85,
  totalRevenue: 12500000
};

// Data produk (dummy)
let products = [
  { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
  { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
  { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

// Format mata uang (IDR)
function formatRupiah(val){
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);
}

// Logika halaman login
(function initLogin(){
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return; // bukan di halaman login

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const errorMsg = document.getElementById('errorMsg');
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', ()=>{
    errorMsg.textContent = '';
    
    const emailTrimmed = email.value.trim();
    const passwordTrimmed = password.value.trim();
    
    if (!emailTrimmed || !passwordTrimmed){
      errorMsg.textContent = 'Email dan password tidak boleh kosong.';
      return;
    }

    alert('Login berhasil');
    window.location.href = 'dashboard.html';
  });
})();

// Logika dashboard
(function initDashboard(){
  const tp = document.getElementById('totalProducts');
  if (!tp) return; // bukan di halaman dashboard

  document.getElementById('totalProducts').textContent = summary.totalProducts;
  document.getElementById('totalSales').textContent = summary.totalSales;
  document.getElementById('totalRevenue').textContent = formatRupiah(summary.totalRevenue);

  const toProducts = document.getElementById('toProducts');
  toProducts.addEventListener('click', ()=>{
    window.location.href = 'products.html';
  });
})();

// Logika halaman produk
(function initProducts(){
  const tableBody = document.querySelector('#productsTable tbody');
  if (!tableBody) return; // bukan di halaman produk

  function render(){
    tableBody.innerHTML = '';
    products.forEach((p, idx)=>{
      const tr = document.createElement('tr');
      tr.dataset.id = p.id;

      tr.innerHTML = `
        <td>${idx+1}</td>
        <td>${p.name}</td>
        <td>${formatRupiah(p.price)}</td>
        <td>${p.stock} <img src="assets/pencil.png" alt="Edit" class="action-icon" data-action="edit" style="width:16px;height:16px;cursor:pointer;
        margin-left:12px;vertical-align:middle"> <img src="assets/trash-bin.png" alt="Delete" class="action-icon" data-action="delete" 
        style="width:16px;height:16px;cursor:pointer;margin-left:8px;vertical-align:middle"></td>
      `;

      tableBody.appendChild(tr);
    });
  }

  // Delegasi event untuk edit/hapus
  tableBody.addEventListener('click', (e)=>{
    const img = e.target.closest('.action-icon');
    if (!img) return;
    const action = img.dataset.action;
    const tr = img.closest('tr');
    const id = Number(tr.dataset.id);
    const prod = products.find(x=>x.id===id);

    if (action === 'edit'){
      alert('Edit produk: ' + prod.name);
      return;
    }

    if (action === 'delete'){
      if (confirm('Yakin hapus produk ini?')){
        // hapus dari array
        products = products.filter(x=>x.id !== id);
        // remove row via render
        render();
      }
    }
  });

  // render awal
  render();
})();